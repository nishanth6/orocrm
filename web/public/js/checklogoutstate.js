var countDownDate = new Date().getTime();
var BasecountDownExpireTime = 1200; //In seconds 1200 = 20min
var BasecountDownExpireShowConfirmationTime = 120; //In seconds 120 = 2min
var countDownExpireTime = BasecountDownExpireTime;
var countDownExpireShowConfirmationTime = BasecountDownExpireShowConfirmationTime;

var isTimeOutConfirmationShown = false; //DO NOT Change this value 
var isTimeOutWindow; //DO NOT Change this value 

var oldlandingPageURL = "";
$(document).ready(function () {
    checkIsLoggedIn();
    setInterval(function () {
        //getSessionState();
        checkIsLoggedIn();
    }, 2000);
});

function checkIsLoggedIn() {
    if (localStorage && sessionStorage) {
        var isloggedIn = localStorage.getItem('isloggedIn');
        var landingPageURL = localStorage.getItem('landingPageURL');
        var landingPageFU = localStorage.getItem('landingPageFU');
        var slandingPageFU = sessionStorage.getItem('landingPageFU');
        var oldlandingPageURL = sessionStorage.getItem('oldlandingPageURL');
        if (isloggedIn == "null" || isloggedIn == null || isloggedIn == "") {
            waitingDialog.show('Please wait...', {dialogSize: 'sm'});
            document.location.href = logoutURL;
        } else if ((landingPageURL != "null" && landingPageURL != null && landingPageURL != oldlandingPageURL) || landingPageFU != slandingPageFU) {
            if ((window.location.pathname == "/dashboardadmin" && landingPageURL != "/dashboard/adminindex") ||
                    (window.location.pathname == "/dashboardmultimerchant" && landingPageURL != "/dashboard/multimerchantindex") ||
                    window.location.pathname != "/dashboardadmin" || window.location.pathname != "/dashboardmultimerchant" || landingPageFU != slandingPageFU) {
                addupdateladdingPageLocalStorage(landingPageURL);
                document.location.href = landingPageURL;
            }
        } else {
            addupdateLocalStorageTime();
        }
    }
}

function showTimeOutConfirm(type, callbackFunction) {
    columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
    switch (type) {
        case "timeout" :
            content = 'Your session has timed out and you will be redirected to login. All your unsaved changes will be lost';
            callbackFunction = logout;
            timeOutWindow = $.alert({
                theme: 'supervan',
                title: 'Session Time Out!',
                columnClass: columnClass,
                //escapeKey: 'buttonescape',
                //backgroundDismiss: true,
                closeIcon: false,
                content: content,
                buttons: {
                    ok: {
                        text: 'ok',
                        btnClass: 'btn-green',
                        keys: ['enter', 'esc', 'space'],
                        action: function () {
                            if (callbackFunction) {
                                waitingDialog.show('Please wait...', {dialogSize: 'sm'});
                                callbackFunction();
                            }
                        }
                    }
                }
            });
            break;
        case "timeoutConfirm" :
            content = 'Your session will timeout in <span id="timeoutcount">' + countDownExpireTime + '</span> seconds and all your unsaved changes will be lost. Click OK to extend your session.';
            timeOutWindow = $.confirm({
                theme: 'supervan',
                title: 'Session Time Out!',
                content: content,
                columnClass: columnClass,
                //escapeKey: true,
                //backgroundDismiss: true,
                closeIcon: false,
                buttons: {
                    ok: {
                        text: 'ok',
                        btnClass: 'btn-green',
                        keys: ['enter'],
                        action: function () {
                            extendSession();
                        }
                    },
                    cancel: {
                        text: 'logout',
                        action: function () {
                            waitingDialog.show('Please wait...', {dialogSize: 'sm'});
                            logout();
                        }
                    }
                }
            });
            break;
        default:
            columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
            break
    }


}
function extendSession() {
    getSessionState();
}
function startSessionTimer() {
    // Update the count down every 1 second
    var x = setInterval(function () {
        countDownExpireTime--;

        // If the count down is over, write some text 
        if (countDownExpireTime == countDownExpireShowConfirmationTime) {
            showTimeOutConfirm('timeoutConfirm');
            isTimeOutConfirmationShown = true;
        }
        if (isTimeOutConfirmationShown) {
            $('#timeoutcount').text(countDownExpireTime);
        }

        if (countDownExpireTime <= 0) {
            clearInterval(x);
            timeOutWindow.close();
            logout();
        }
    }, 1000);
}
startSessionTimer();