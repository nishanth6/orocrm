// Data should atleast have id and name attributes
var checkSent = false;
var appStartDate = "10/1/2016";

$.ajaxSetup({
    global: true,
    beforeSend: function (jqXHR, settings) {
        if (BASE_APPSERVER_URL != "" && !checkSent) {
            checkSent = true;
            getSessionState();
        }
    }
});
jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});
$(document).on('keypress', 'input,select', function (e) {
    if ($(this)[0].id != "txtSearch" && $(this)[0].id != "txtSearchURE" && $(this)[0].id != "txtUserNameFP" && (e.which == 13 || e.which == 9)) {
        e.preventDefault();
        // Get all focusable elements on the page
        var canfocus = $(':focusable');
        var index = canfocus.index(document.activeElement) + 1;
        if (index >= canfocus.length)
            index = 0;
        canfocus.eq(index).focus();
    } else if ($(this)[0].id == "txtSearch" && e.keyCode == 13) {
        $("#btnSearch").click();
    } else if ($(this)[0].id == "txtUserNameFP" && e.keyCode == 13) {
        $("#btnResetPassword").click();
    } else if ($(this)[0].id == "txtSearchURE" && e.keyCode == 13) {
        $("#btnSearchURE").click();
    }
});
$(document).keyup(function (e) {
    if ((e.keyCode == 27 || e.keyCode == 32) && $(".jconfirm").length > 0) {
        // $('.jconfirm').remove();
    }
});

function isNullOrEmpty(stringVal) {
    stringVal = $.trim(stringVal);
    return (stringVal != 'null' && stringVal != null && stringVal != "") ? false : true;
}
function ifNullOrEmptyReturnBlank(stringVal) {
    stringVal = $.trim(stringVal);
    return (stringVal != 'null' && stringVal != null && stringVal != "") ? stringVal : '';
}
function ifNullOrEmptyReturnNA(stringVal) {
    stringVal = $.trim(stringVal);
    return (stringVal != 'null' && stringVal != null && stringVal != "") ? stringVal : 'NA';
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function showTopMenu(showMenu) {
    if (!showMenu)
        $("#topMenu").html("");
}
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getSessionState() {
    countDownDate = new Date().getTime();
    var checkSession = true;
    try {
        countDownExpireTime = BasecountDownExpireTime;
        countDownExpireShowConfirmationTime = BasecountDownExpireShowConfirmationTime;
    } catch (e) {
        checkSession = false;
    }

    if (checkSession) {
        $.post(BASE_APPSERVER_URL + "sessionstate/checkSessionSate", {merchant: baseloggedInUserMerchantid, global: false, async: false}, function (data, status) {
            if (status == "success") {
                checkSent = false;
                var dataJson = jQuery.parseJSON(data);
                if (dataJson.logout) {
                    if (localStorage && sessionStorage) {
                        cearLocalStorage();
                    } else {
                        document.location.href = logoutURL;
                    }
                } else if (dataJson.landingPageURL != "") {
                    landingPageURL = "";
                    if (dataJson.landingPageURL == "dashboardAdminURL") {
                        landingPageURL = dashboardAdminURL;
                    } else if (dataJson.landingPageURL == "dashboardmultimerchantURL") {
                        landingPageURL = dashboardmultimerchantURL;
                    }

                    if (landingPageURL != "") {
                        addupdateLocalStorage('landingPageURL', landingPageURL, 1);
                        document.location.href = landingPageURL;

                    }
                }
                checkIsLoggedIn();
            }
        });
    }
}
function logout() {
    if (localStorage && sessionStorage) {
        cearLocalStorage();
    }
    document.location.href = logoutURL;
}
function addLoginLocalStorage(landingPageURL) {
    if (localStorage && sessionStorage) {
        var isloggedIn = localStorage.getItem('isloggedIn');
        if (isloggedIn == "null" || isloggedIn == null || isloggedIn == "") {
            localStorage.setItem('isloggedIn', '1');
            localStorage.setItem('landingPageURL', landingPageURL);
            localStorage.setItem('landingPageFU', '');
            sessionStorage.setItem('oldlandingPageURL', landingPageURL);
            sessionStorage.setItem('landingPageFU', '');
            addupdateLocalStorageTime();
        }
    }
}
function addupdateLocalStorage(key, value, forceUpdate) {
    forceUpdate = forceUpdate || "";
    if (forceUpdate == "1") {
        localStorageswap = localStorage.getItem('landingPageFU');
        if (localStorageswap != "") {
            localStorageswap = localStorageswap == "1" ? "0" : "1"; //sawp
            forceUpdate = localStorageswap;
        }
    }

    if (localStorage) {
        localStorage.setItem(key, value);
        localStorage.setItem('landingPageFU', forceUpdate);
    }
    if (sessionStorage && key == "landingPageURL") {
        sessionStorage.setItem(key, '');
        sessionStorage.setItem('landingPageFU', '');
    }
    addupdateLocalStorageTime();
}
function addupdateladdingPageLocalStorage(landingPageURL) {
    if (localStorage && sessionStorage) {
        localStorage.setItem('landingPageURL', landingPageURL);
        sessionStorage.setItem('oldlandingPageURL', landingPageURL);
        sessionStorage.setItem('landingPageFU', localStorage.getItem('landingPageFU'));
        addupdateLocalStorageTime();
    }
}
function addupdateLocalStorageTime() {
    if (localStorage && sessionStorage) {
        localStorage.setItem('time', new Date());
    }
}
function cearLocalStorage() {
    if (localStorage && sessionStorage) {
        var isloggedIn = localStorage.getItem('isloggedIn');
        if (isloggedIn != "null" || isloggedIn != null || isloggedIn != "") {
            localStorage.clear();
            sessionStorage.clear();
        }
    }
}

function _getTreeViewChildren(node) {
    if (node.nodes === undefined)
        return [];
    var childrenNodes = node.nodes;
    node.nodes.forEach(function (n) {
        childrenNodes = childrenNodes.concat(_getTreeViewChildren(n));
    });
    return childrenNodes;
}

function _getTreeViewCheckedChildren(node) {
    if (node.nodes === undefined)
        return [];
    var childrenNodes = [];
    node.nodes.forEach(function (n) {
        if (n.state.checked) {
            childrenNodes = childrenNodes.concat(n);
        }
    });
    return childrenNodes;
}

function printMe() {
    $('input:text').each(function () {
        $(this).attr('value', $(this).val());
    });
    var printData = $(".printable-content").html();
    printData = printData.replace("detail-section-data", "");
    $(printData).printThis({
        debug: false,
        importCSS: true,
        importStyle: true,
        printContainer: true,
        loadCSS: [
            BASE_APPSERVER_URL + "/../css/bootstrap-dialog.css",
            BASE_APPSERVER_URL + "/../css/style-checkbox-radio.css?random=" + uniqueId,
            BASE_APPSERVER_URL + "/../css/style.css?random=" + uniqueId,
            BASE_APPSERVER_URL + "/../css/bootstrap-toggle.min.css",
            BASE_APPSERVER_URL + "/../css/jquery-ui.css",
            BASE_APPSERVER_URL + "/../css/bootstrap-theme.min.css",
            BASE_APPSERVER_URL + "/../js/plugins/tree/bootstrap-treeview.min.css",
            BASE_APPSERVER_URL + "/../js/plugins/jqueryconfirm/jquery-confirm.min.css",
            BASE_APPSERVER_URL + "/../css/font-awesome/css/font-awesome.min.css",
            BASE_APPSERVER_URL + "/../js/plugins/multiselect/multiselect.css?random=" + uniqueId,
            BASE_APPSERVER_URL + "/../js/plugins/listmultiselect/listmultiselect.css?random=" + uniqueId,
            BASE_APPSERVER_URL + "/../css/bootstrap.min.css"
        ],
        pageTitle: "",
        removeInline: false,
        printDelay: 333,
        header: null,
        formValues: true
    });
}