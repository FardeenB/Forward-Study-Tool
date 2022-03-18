document.querySelector('#sign-in').addEventListener('click', function() { //function that does something when the sign- id is clicked
    chrome.runtime.sendMessage({
        message: 'login'
    }, function(response) { //"I want to login"
        if (response === 'Success') window.close(); //Logged in, so close the window to stop showing this popup
    });
});