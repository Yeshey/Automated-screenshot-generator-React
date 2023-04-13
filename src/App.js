import React from "react";
import DataForScreenshot from "./DataForScreenshot"; // import the Overlay component
import './App.css';

function App() {
  return (
    <div>

      <h1>Automated Screenshot Generator</h1>

      <DataForScreenshot />

      <form>
        <label htmlFor="link-input">Enter website URL:</label>
        <input type="text" id="link-input" name="link-input" /><br />
        <button type="button" onClick={takeScreenshot}>Take Screenshot</button>
      </form>
    </div>
  );
}

function takeScreenshot() {
  // Your code for taking screenshot goes here
}

export default App;
