import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";


const CLIENT_ID = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const API_KEY = "AIzaSyCEDoKs0VmaiLNWbG0B6aFIiKcBOak90Is"

function GoogleAuth() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject)
    document.getElementById("signInDiv").hidden=true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

    // should ask as soon as site opens
    google.accounts.id.prompt()
  }, []);

  // If no user: show sign in button
  // If user present: show sign out button
  return (
    <>
    <div className="App">
      <div id="signInDiv"></div>
      {
        Object.keys(user).length != 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }

      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
    </>
  );
}


export default GoogleAuth;
