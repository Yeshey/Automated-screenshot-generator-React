import React, { useState, useEffect } from "react";
import DataForScreenshot from "./DataForScreenshot";
import './App.css';

const CLIENT_ID = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"
const SCOPES = "https://www.googleapis.com/auth/drive";

const img_dimension = "1920x1080";
const img_format = "JPG";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [links, setLinks] = useState([]);

  const handleAddLink = (link) => {
    setLinks([...links, link]);
  };

  const renderLinks = () => {
    if (links.length === 0) {
      return null;
    }

    return (
      <div>
        <h2>Links:</h2>
        <ul>
          {links.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    );
  };

  function takeScreenshot() {
    const url = document.getElementById("link-input").value;
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }
  
    const key = apiKey;
    const apiUrl = `https://api.screenshotmachine.com?key=${key}&url=${url}&dimension=${img_dimension}&format=${img_format}`;
    setImageUrl(apiUrl);
    setSiteUrl(url);
  }

  function handleApiKeyChange(event) {
    setApiKey(event.target.value);
  }

  const [tokenClient, setTokenClient] = useState({});

  function createDriveFile() {
    // Check if imageUrl state variable is empty
    if (!imageUrl) {
      alert("No screenshot taken yet");
      return;
    }
    tokenClient.requestAccessToken();
  }

  function uploadImage(accessToken, folderId) {
    console.log(siteUrl)
    const url = new URL(siteUrl);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const filename = `${id}_${url.hostname.replace(/\./g, "_")}.jpg`;
  
    // Fetch the image data
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Upload the image to the specified folder
        const formData = new FormData();
        formData.append("metadata", new Blob(
          [
            JSON.stringify({
              "name": filename,
              "parents": [folderId]
            })
          ],
          { type: "application/json" }
        ));
        formData.append("file", imageBlob, filename);
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id%2CwebViewLink", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Image uploaded with ID:", data.id);
            console.log("Shareable link:", data.webViewLink);
            handleAddLink(data.webViewLink);
          })
          .catch((error) => console.error("Error uploading image:", error));
      })
      .catch((error) => console.error("Error fetching image:", error));
  }
  

  

  useEffect(() => {
    /* global google */
    // const google = window.google; 
    
    // Access Tokens
    // Upload to a specific users google drive

    // tokenClient
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          // We now have access to a live token to use for ANY google API
          if (tokenResponse && tokenResponse.access_token) {
            // Check if the target folder exists
            fetch(`https://www.googleapis.com/drive/v3/files?q=name='Automated-screenshot-generator'&mimeType='application/vnd.google-apps.folder'&access_token=${tokenResponse.access_token}`)
              .then((response) => response.json())
              .then((data) => {
                let folderId = null;
                if (data.files.length === 0) {
                  // Folder does not exist, so create it first
                  fetch("https://www.googleapis.com/drive/v3/files", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${tokenResponse.access_token}`
                    },
                    body: JSON.stringify({
                      "name": "Automated-screenshot-generator",
                      "mimeType": "application/vnd.google-apps.folder"
                    })
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      folderId = data.id;
                      console.log("Folder created with ID:", folderId);
                      // Upload the image to the newly created folder
                      uploadImage(tokenResponse.access_token, folderId);
                    })
                    .catch((error) => console.error("Error creating folder:", error));
                } else {
                  // Folder exists, so use its ID to upload the image
                  folderId = data.files[0].id;
                  console.log("Folder exists with ID:", folderId);
                  uploadImage(tokenResponse.access_token, folderId);
                }
              })
              .catch((error) => console.error("Error searching for folder:", error));
          }
        }
      })
    );

  }, []);

  return (
    <div>
      <h1>Automated Screenshot Generator</h1>
      <DataForScreenshot onApiKeyChange={handleApiKeyChange} />
      <form>
        <label htmlFor="link-input">Enter website URL:</label>
        <input type="text" id="link-input" name="link-input" /><br />
        <button type="button" onClick={takeScreenshot}>Take Screenshot</button>
        <button type="button" onClick={createDriveFile}>Upload to Google Drive and Share</button>
      </form>
      {renderLinks()}
      {imageUrl && <img className="screenshot-image" src={imageUrl} alt="Screenshot" />}
    </div>
  );
}

export default App;
