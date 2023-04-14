import React, { useState } from "react";
import DataForScreenshot from "./DataForScreenshot";
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState("");

  function takeScreenshot() {
    const url = document.getElementById("link-input").value;
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }

    const key = "7e4650";
    const dimension = "1920x1080";
    const format = "JPG";
    const apiUrl = `https://api.screenshotmachine.com?key=${key}&url=${url}&dimension=${dimension}&format=${format}`;
    setImageUrl(apiUrl);
  }

  return (
    <div>
      <h1>Automated Screenshot Generator</h1>
      <DataForScreenshot />
      <form>
        <label htmlFor="link-input">Enter website URL:</label>
        <input type="text" id="link-input" name="link-input" /><br />
        <button type="button" onClick={takeScreenshot}>Take Screenshot</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Screenshot" />}
    </div>
  );
}

export default App;
