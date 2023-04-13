import React, { useState } from "react";
import Overlay from "./Overlay"; // import the Overlay component
import './App.css';

function App() {
  // Declare a state variable called `showOverlay` and a function to update it called `setShowOverlay` 
  // Initialize `showOverlay` to `true`.
  const [showOverlay, setShowOverlay] = useState(true);

  // Declare a function called `handleButtonClick`, it sets the value of `showOverlay` to `false` with the setShowOverlay func
  const handleButtonClick = () => {
    setShowOverlay(false);
  };

  return (
    <div>

      {/* Add the overlay */}
      <Overlay showOverlay={showOverlay} handleButtonClick={handleButtonClick} />

      <h1>Automated Screenshot Generator</h1>
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
