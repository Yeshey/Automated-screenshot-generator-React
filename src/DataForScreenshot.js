import React from "react";
import QuestionMark from "./QuestionMark"; // import the Overlay component
import "./DataForScreenshot.css";

function DataForScreenshot() {
  return (
    <div className="data-for-screenshot">
        <div className="form-group">
        <label htmlFor="api-key">
          <span style={{paddingLeft: '5px'}}>API key:</span>
          <QuestionMark text="Please enter your API from screenshotmachine.com" />
        </label>
          <div className="input-group">
            <input type="text" id="api-key" name="api-key" />
            <button type="button" onClick={signIn}>Sign In</button>
          </div>
        </div>
    </div>
  );
}

function signIn() {
  // Your code for signing in to Google Drive goes here
}

export default DataForScreenshot;
