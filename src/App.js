import './App.css';
// import React from "react";

function App() {
  return (
    <div>
      <h1>Automated Screenshot Generator</h1>
      <form>
        <label htmlFor="link-input">Enter website URL:</label>
        <input type="text" id="link-input" name="link-input" /><br />
        <button type="button" onClick={takeScreenshot}>Take Screenshot</button>
        <button type="button" onClick={signIn}>Sign In to Google Drive</button>
      </form>
    </div>
  );
}

function takeScreenshot() {
  // Your code for taking screenshot goes here
}

function signIn() {
  // Your code for signing in to Google Drive goes here
}

export default App;
