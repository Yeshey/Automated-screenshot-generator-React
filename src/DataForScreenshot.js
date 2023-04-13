import React from "react";
import QuestionMark from "./QuestionMark"; // import the Overlay component
import "./DataForScreenshot.css";

function DataForScreenshot() {
  return (
    <div className="data-for-screenshot">
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="api-key">
              <span>API key:</span>
              <QuestionMark text="Please enter your API from screenshotmachine.com" />
            </label>
            <input className="input-api-key" type="text" id="api-key" name="api-key" />
          </div>
          <div className="input-group">
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
