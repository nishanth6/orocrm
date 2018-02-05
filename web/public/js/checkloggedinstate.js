$(document).ready(function () {
    checkIsLoggedIn();
    setInterval(function () {
        checkIsLoggedIn();
    }, 2000);
});

function checkIsLoggedIn() {
    if (localStorage) {
        var currentTime = new Date();
        lasttime = localStorage.getItem('time');
        if (lasttime != "null" && lasttime != null && lasttime != "") {
            var lastUpdateTime = new Date(lasttime);
        }
        var landingPageURL = localStorage.getItem('landingPageURL');
        if (landingPageURL != "null" && landingPageURL != null && landingPageURL != "") {
            document.location.href = landingPageURL;
        }
    }
}