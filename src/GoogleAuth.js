import React, { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

function GoogleAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleSignIn = async (auth) => {
    setIsSignedIn(true);
    const user = await auth.userinfo.get();
    setUser(user);
  };

  const handleSignOut = (auth) => {
    setIsSignedIn(false);
    setUser(null);
    auth.signOut();
  };

  return (
    <div>
      {!isSignedIn ? (
        <GoogleOAuthProvider
          clientId="<your_client_id>"
          redirectUri="<your_redirect_uri>"
          onSignIn={handleSignIn}
        >
          <button>Sign in with Google</button>
        </GoogleOAuthProvider>
      ) : (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={() => handleSignOut(auth)}>Sign out</button>
        </div>
      )}
    </div>
  );
}

export default GoogleAuth;
