import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleOneTapLogin } from '@react-oauth/google';

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
      <GoogleOAuthProvider clientId="191000969607-dbpi9doi2bct7asm8k2lcej10n1f1ac5.apps.googleusercontent.com">
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
