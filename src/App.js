import React, { useState } from "react";
import DataForScreenshot from "./DataForScreenshot";
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

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
    const dimension = "1920x1080";
    const format = "JPG";
    const apiUrl = `https://api.screenshotmachine.com?key=${key}&url=${url}&dimension=${dimension}&format=${format}`;
    setImageUrl(apiUrl);
  }

  function handleApiKeyChange(event) {
    setApiKey(event.target.value);
  }

  return (
    <div>
      <h1>Automated Screenshot Generator</h1>
      <DataForScreenshot onApiKeyChange={handleApiKeyChange} />
      <form>
        <label htmlFor="link-input">Enter website URL:</label>
        <input type="text" id="link-input" name="link-input" /><br />
        <button type="button" onClick={takeScreenshot}>Take Screenshot</button>
      </form>
      {imageUrl && <img className="screenshot-image" src={imageUrl} alt="Screenshot" />}
    </div>
  );
}

export default App;
