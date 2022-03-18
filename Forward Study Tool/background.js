// Start off with user not being signed in
let user_signed_in = false;


//Intializing constants needed to connect to this extension
const CLIENT_ID = encodeURIComponent('CLIENT_ID FROM GOOGLE CLOUD PLATFORM.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://INSERT_EXTENSION_ID.chromiumapp.org')
const SCOPE = encodeURIComponent('openid');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
const PROMPT = encodeURIComponent('consent');

//Confirms that user is signed in when ran
function is_user_signed_in() {
    return user_signed_in;
}


//Create an random authorization endpoint
function create_auth_endpoint() {

    //Encoding the endpoint URI for security
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));


    //Obtaining the user's information (global constants) to connect with the extension 
    let openId_endpoint_url =
        `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&scope=${SCOPE}
&state=${STATE}
&nonce=${nonce}
&prompt=${PROMPT}`;


    //Finally return the open id endpoint url after finding it
    return openId_endpoint_url;
}


//Logic behind user clicking 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') { //Check if user is signed in
        if (user_signed_in) {
            console.log("Signed in.");
        } else {
            chrome.identity.launchWebAuthFlow({ //Else, lauch and create a authorization endpoint that user can interact with
                'url': create_auth_endpoint(),
                'interactive': true
            }, function(redirect_url) { //Run redirect url function
                if (chrome.runtime.lastError) {
                    // If there's a problem signing in...
                } else {
                    let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9); //Encode the id token for security
                    id_token = id_token.substring(0, id_token.indexOf('&'));
                    const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1])); //Encode user info (with id token) for security

                    if ((user_info.iss === 'https://accounts.google.com' || user_info.iss === 'accounts.google.com') &&
                        user_info.aud === CLIENT_ID) { //Check if Google account/user info matches client id
                        console.log("Signed in.");
                        user_signed_in = true; //The user is now signed in
                        chrome.browserAction.setPopup({ //Click on the extension again to open website.html
                            popup: 'features/website/website.html'
                        }, () => {
                            sendResponse('Success');
                        });
                    } else { //Otherwise, user is not signed in because of invalid credentials
                        console.log("Invalid credentials.");
                    }
                }
            });
            return true;
        }
    } else if (request.message === 'logout') { //Otherwise, clicking the signout button signs the user out
        user_signed_in = false;
        chrome.browserAction.setPopup({
            popup: 'popup/popup.html' //Click on the extension again to open website.html
        }, () => {
            sendResponse('Success');
        });

        return true;
    } else if (request.message === 'isUserSignedIn') {
        sendResponse(is_user_signed_in());
    }
});