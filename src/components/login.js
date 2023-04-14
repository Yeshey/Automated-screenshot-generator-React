import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "191000969607-0cgqepb1p3act7mm5bnbqm8mcl0tafbg.apps.googleusercontent.com"

function Login(){
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current User: ", res.profileObj)
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
    }

    return(
        <div id="signInButton">
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}