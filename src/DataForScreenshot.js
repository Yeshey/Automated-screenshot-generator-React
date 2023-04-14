import React from "react";
import QuestionMark from "./QuestionMark"; // import the Overlay component
import GoogleAuth from "./GoogleAuth"; // import the Overlay component
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
            <input className="input-api-key" type="text" id="api-key" name="api-key" placeholder="7e4650" />
          </div>
          <GoogleAuth />
        </div>
    </div>
  );
}

export default DataForScreenshot;
