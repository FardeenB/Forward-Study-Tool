document.querySelector('#sign-out').addEventListener('click', function() { //function that does something when the sign-out id is clicked
    chrome.runtime.sendMessage({
        message: 'logout'
    }, function(response) { //"I want to logout"
        if (response === 'Success') window.close(); //Logged out, so close the window to stop showing this popup
    });
});