import React, { useState, useEffect } from "react";

const CLIENT_ID = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"
const SCOPES = "https://www.googleapis.com/auth/drive";

function GoogleAuth() {
  const [tokenClient, setTokenClient] = useState({});

  function createDriveFile() { 
    tokenClient.requestAccessToken();
  }

  function uploadImage(accessToken, folderId) {
    // Fetch the image data
    fetch("https://api.screenshotmachine.com/?key=7e4650&url=https://ifunded.de/en/&dimension=1920x1080&format=JPG")
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Upload the image to the specified folder
        const formData = new FormData();
        formData.append("metadata", new Blob(
          [
            JSON.stringify({
              "name": "ifunded-screenshot.jpg",
              "parents": [folderId]
            })
          ],
          { type: "application/json" }
        ));
        formData.append("file", imageBlob, "ifunded-screenshot.jpg");
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Image uploaded with ID:", data.id);
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

  // If no user: show sign in button
  // If user present: show sign out button
  return (
    <>
    <div className="App">

      <div>
        <button type="button" onClick={createDriveFile}>Create File</button>
      </div>
    </div>
    </>
  );
}

export default GoogleAuth;
