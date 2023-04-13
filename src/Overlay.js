import React from "react";
import "./Overlay.css";

function Overlay({ showOverlay, handleButtonClick }) {
  return (
    showOverlay && (
      <div className="overlay">
        <div className="overlay-content">
          <p>Welcome to the app!</p>
          <button onClick={handleButtonClick}>Start</button>
          <button type="button" onClick={signIn}>Sign In to Google Drive</button>
        </div>
      </div>
    )
  );
}

function signIn() {
  // Your code for signing in to Google Drive goes here
}

export default Overlay;
