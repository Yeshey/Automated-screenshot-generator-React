import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"

function Logout(){
    const onSuccess = (res) => {
        console.log("Logout successful! ");
    }

    return(
        <div id="signInButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout