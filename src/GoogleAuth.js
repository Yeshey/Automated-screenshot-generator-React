import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleOneTapLogin } from '@react-oauth/google';

const CLIENT_ID = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const API_KEY = "AIzaSyCEDoKs0VmaiLNWbG0B6aFIiKcBOak90Is"

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

  return (
    <>
      <GoogleOAuthProvider clientId="191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com">
        {isLoggedIn ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        )}
      </GoogleOAuthProvider>
    </>
  );
}


export default GoogleAuth;
