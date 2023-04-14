import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleOneTapLogin } from '@react-oauth/google';
import LoginButton from "./components/login"
import LogoutButton from "./components/logout"
import { gapi } from 'gapi-script';
import { GoogleLogout } from "react-google-login";

// following this video https://www.youtube.com/watch?v=0KoZSVnTnkA

const CLIENT_ID = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const API_KEY = "AIzaSyCEDoKs0VmaiLNWbG0B6aFIiKcBOak90Is"
const SCOPES = "https://www.googleapis.com/auth/drive"

function GoogleAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    googleLogout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };

    gapi.load('client:auth2', start);
  })

  return (
    <div id="App">
      <span>Helloooooo</span>
      <LoginButton/>
      <LogoutButton/>
    </div>
  );
}


export default GoogleAuth;
