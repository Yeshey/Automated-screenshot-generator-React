import React, { useState } from "react";
import "./Overlay.css";

function Overlay({ showOverlay, handleButtonClick }) {
  const [apiKey, setApiKey] = useState("");

  const handleInputChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleContinueClick = () => {
    // Do some API key validation here
    handleButtonClick();
  };

  return (
    showOverlay && (
      <div className="overlay">
        <div className="overlay-content">
          <p>Welcome to the app!</p>
          <div className="input-container">
            <label htmlFor="api-key">API Key:</label>
            <input
              className="overlay-input"
              type="text"
              id="api-key"
              value={apiKey}
              onChange={handleInputChange}
            />
          </div>
          {apiKey && (
            <button onClick={handleContinueClick}>Continue</button>
          )}
        </div>
      </div>
    )
  );
}



export default Overlay;
