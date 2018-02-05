var errorAlertBox;
function clearUIErrors() {
    $(".error-sm-input").removeClass("error-sm-input");
    $(".button-error").removeClass("button-error");
    $(".error_multiselect_list").removeClass("error_multiselect_list");
    $(".error-sm-message").html("");
}
function showUIError(controllerName, message) {
    $("#" + controllerName + "-error").html(message);
    $("#" + controllerName).addClass("error-sm-input");
}
function showFormError(fields, message) {
    $("#form-error").html(message);
    $.each(fields, function (key, value) {
        $("#" + value).addClass("error-sm-input");
    });
}

function validateEmail(email) {
    var firstCharCheck = /^[a-zA-Z0-9._]{1}/;
    if (firstCharCheck.test(email)) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    return false;
}

function validatePasswordLenght(password) {
    var re = /^.{6,12}$/;
    return re.test(password);

}
function validatePasswordHasNumber(password) {
    return  password.match(/\d+/g) == null ? false : true;

}
function validateSpecialCharacters(text) {
    var re = /^[A-Za-z0-9\s~`!@#$^&*()+-=_():;'"\\{}\[\]|]*$/;
    return re.test(text);
}
function validatePhoneNumber(text) {
    var re = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    return re.test(text);
}

$(document).on("keypress keyup onblur paste cut", ".decimal", function (event) {
    if (((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 46 || event.which == undefined)) {
        if ($(this).val().indexOf('.') > 1 && event.which == 46) {
            event.preventDefault();
        }
        validateDecimal($(this)[0], '', true);
    } else {
        event.preventDefault();
    }

});
$(document).on("keypress keyup onblur paste cut", ".decimalWithNegative", function (event) {
    if (((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 46 || event.which == 45 || event.which == undefined)) {
        if ($(this).val().indexOf('.') > 1 && event.which == 46) {
            event.preventDefault();
        }
        validateDecimal($(this)[0], '', true);
    } else {
        event.preventDefault();
    }

});
function validateDecimal(item, selectedValue, callBack, hideError) {
    callBack = callBack || false;
    hideError = hideError || false;
    setTimeout(
            function () {
                if (callBack)
                    validateDecimal(item, selectedValue, false);
            }, 100);

    if (callBack)
        return;

    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var validDecimal = $(item).data("decimalplace");
    var mandatory = $(item).data("mandatory");
    var maxlengthVal = parseInt($(item).data("maxlength"), 10);
    var mimlengthVal = parseInt($(item).data("minlength"), 10) || 0;
    var minVal = parseFloat(parseFloat($(item).data('min')).toFixed(2));
    var maxVal = parseFloat(parseFloat($(item).data('max')).toFixed(2));
    var decimalVal = parseFloat(parseFloat($(item).val()).toFixed(2)) + 0;
    var decimalStringVal = $.trim($(item).val());
    var isValid = true;
    if (mandatory && decimalStringVal.match(/^\-?(\d)*(\.(\d)*)?$/g) == null) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalStringVal.indexOf(".") >= 0 && decimalStringVal.split(".")[1].length > validDecimal) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('only ' + validDecimal + ' decimal place allowed');
            $('#' + $(item)[0].id).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalStringVal.indexOf(".") >= 0 && decimalStringVal.split(".")[1].length == 0) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (mandatory && decimalStringVal == "") {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('required');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalStringVal.length > maxlengthVal) {
        if (!hideError) {
            if (mimlengthVal > 0) {
                $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' to ' + maxlengthVal + ' characters');
            } else {
                $('#' + $(item)[0].id + '-error').html('Value can not be more than ' + maxlengthVal + ' characters');
            }
            $(item).addClass("error-sm-input");
        }
        return false;
    } else if (decimalStringVal.length < mimlengthVal) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalVal < minVal || decimalVal > maxVal) {
        if (!hideError) {
            if (maxVal && minVal)
                $('#' + $(item)[0].id + '-error').html('Value must be between ' + minVal + ' and ' + maxVal);
            else if (minVal)
                $('#' + $(item)[0].id + '-error').html('Value must be greater than or equal to ' + minVal);
            else if (maxVal)
                $('#' + $(item)[0].id + '-error').html('Value must be less than or equal ' + maxVal);
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalStringVal == 'NULL') {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (decimalStringVal != "" && !$.isNumeric(decimalStringVal)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    }
    return isValid;
}

$(document).on("keypress keyup onblur paste cut", ".number", function (event) {
    if ((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 46 || event.which == undefined) {
        validateNumber($(this)[0], '', true);
    } else {
        event.preventDefault();
    }
});
$(document).on("keypress keyup onblur paste cut", ".numberWithNegative", function (event) {
    if ((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 46 || event.which == 45 || event.which == undefined) {
        validateNumber($(this)[0], '', true);
    } else {
        event.preventDefault();
    }
});
$(document).on("keypress keyup onblur paste cut", ".numberReal", function (event) {
    if ((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == undefined) {
        validateNumber($(this)[0], '', true);
    } else {
        event.preventDefault();
    }
});
function validateNumber(item, selectedValue, callBack, hideError) {
    callBack = callBack || false;
    hideError = hideError || false;
    setTimeout(
            function () {
                if (callBack)
                    validateNumber(item, selectedValue, false);
            }, 100);
    if (callBack)
        return;

    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var mandatory = $(item).data("mandatory");
    var maxlengthVal = parseInt($(item).data("maxlength"), 10);
    var mimlengthVal = parseInt($(item).data("minlength"), 10) || 0;
    var minVal = parseFloat(parseFloat($(item).data('min')).toFixed(2));
    var maxVal = parseFloat(parseFloat($(item).data('max')).toFixed(2));
    var numberVal = parseFloat(parseFloat($(item).val()).toFixed(2)) + 0;
    var numberStringVal = $.trim($(item).val());

    var isValid = true;
    if (mandatory && numberStringVal.match(/^\-?\d+$/g) == null) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('required');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (mandatory && numberStringVal == "") {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('required');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (numberStringVal.length > maxlengthVal) {
        if (!hideError) {
            if (mimlengthVal > 0) {
                $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' to ' + maxlengthVal + ' characters');
            } else {
                $('#' + $(item)[0].id + '-error').html('Value can not be more than ' + maxlengthVal + ' characters');
            }
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (numberStringVal.length < mimlengthVal) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (numberVal < minVal || numberVal > maxVal) {
        if (!hideError) {
            if (maxVal && minVal)
                $('#' + $(item)[0].id + '-error').html('Value must be between ' + minVal + ' and ' + maxVal);
            else if (minVal)
                $('#' + $(item)[0].id + '-error').html('Value must be greater than or equal to ' + minVal);
            else if (maxVal)
                $('#' + $(item)[0].id + '-error').html('Value must be less than or equal ' + maxVal);
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (numberStringVal == 'NULL') {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (numberStringVal != "" && !$.isNumeric(numberStringVal)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    }
    return isValid;
}

$(document).on("keypress keyup onblur paste cut", ".string", function (event) {
    if (event.which == 9) {
        event.preventDefault();
        return;
    }

    validateString($(this)[0], '', true);
});
function validateString(item, selectedValue, callBack, hideError) {
    callBack = callBack || false;
    setTimeout(
            function () {
                if (callBack)
                    validateString(item, selectedValue, false);
            }, 100);

    if (callBack)
        return;
    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var mandatory = $(item).data("mandatory");
    var maxlengthVal = parseInt($(item).data("maxlength"), 10);
    var mimlengthVal = parseInt($(item).data("minlength"), 10) || 0;
    var isPassword = $(item).data("password");
    var isEmail = $(item).data("email");
    var isMobile = $(item).data("mobile");
    var isNoSpecial = $(item).data("nospecial");
    var allowSpaceChar = $(item).data("allowspace");
    var valueString = (!allowSpaceChar) ? $.trim($(item).val()).replace("__/__/____ __:__", "") : $(item).val().replace("__/__/____ __:__", "");

    var isValid = true;
    if (mandatory && valueString == "") {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('required');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (selectedValue == 'NULL') {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (allowSpaceChar && $.trim(valueString) == "") {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (valueString.length > maxlengthVal) {
        if (!hideError) {
            if (mimlengthVal > 0) {
                $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' to ' + maxlengthVal + ' characters');
            } else {
                $('#' + $(item)[0].id + '-error').html('Value can not be more than ' + maxlengthVal + ' characters');
            }

            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (valueString.length < mimlengthVal) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (isPassword && !validatePasswordLenght(valueString)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Password should be minimum 6 characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (isPassword && !validatePasswordHasNumber(valueString)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Password should contain atleast one number');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (isEmail && !validateEmail(valueString)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid email');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (isNoSpecial && !validateSpecialCharacters(valueString)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid characters');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (valueString == ' NULL') {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid value');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    } else if (valueString != "" && isMobile && !validatePhoneNumber(valueString)) {
        if (!hideError) {
            $('#' + $(item)[0].id + '-error').html('Invalid phone no');
            $(item).addClass("error-sm-input");
        }
        isValid = false;
    }

    return isValid;
}

$(document).on("keypress keyup onblur paste cut", ".contactnumber", function (event) {
    if (((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 43 || event.which == 40 || event.which == 41 || event.which == 45 || event.which == undefined)) {
        validateContactNumber($(this)[0], '', true);
    } else {
        event.preventDefault();
    }
});
function validateContactNumber(item, selectedValue, callBack) {
    callBack = callBack || false;
    setTimeout(
            function () {
                if (callBack)
                    validateContactNumber(item, selectedValue, false);
            }, 100);

    if (callBack)
        return;
    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var mandatory = $(item).data("mandatory");
    var maxlengthVal = parseInt($(item).data("maxlength"), 10);
    var mimlengthVal = parseInt($(item).data("minlength"), 10) || 0;
    var isPassword = $(item).data("password");
    var isEmail = $(item).data("email");
    var isNoSpecial = $(item).data("nospecial");
    var valueString = $.trim($(item).val());

    var isValid = true;
    if (mandatory && valueString == "") {
        $('#' + $(item)[0].id + '-error').html('required');
        $(item).addClass("error-sm-input");
        isValid = false;
    } else if (valueString.length > maxlengthVal) {
        if (mimlengthVal > 0) {
            $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' to ' + maxlengthVal + ' characters');
        } else {
            $('#' + $(item)[0].id + '-error').html('Value can not be more than ' + maxlengthVal + ' characters');
        }
        $(item).addClass("error-sm-input");
        isValid = false;
    } else if (valueString.length < mimlengthVal) {
        $('#' + $(item)[0].id + '-error').html('Value must be ' + mimlengthVal + ' characters');
        $(item).addClass("error-sm-input");
        isValid = false;
    } else if (valueString == 'N ULL') {
        $('#' + $(item)[0].id + '-error').html('Invalid value');
        $(item).addClass("error-sm-input");
        isValid = false;
    } else if (valueString != "" && !$.isNumeric(valueString)) {
        $('#' + $(item)[0].id + '-error').html('Invalid value');
        $(item).addClass("error-sm-input");
        isValid = false;
    }
    return isValid;
}
$(document).on("keypress keyup onblur paste cut", ".datetime", function (event) {
    if (((event.which >= 48 && event.which <= 57) || event.which == 13 || event.which == 8 || event.which == 47 || event.which == undefined)) {
        if ($(this).val().indexOf('/') > 2 && event.which == 47) {
            event.preventDefault();
        }
        validateDateTime($(this)[0], '', true);
    } else {
        event.preventDefault();
    }
});
function validateDateTime(item, selectedValue, callBack) {
    callBack = callBack || false;
    setTimeout(
            function () {
                if (callBack)
                    validateDateTime(item, selectedValue, false);
            }, 100);

    if (callBack)
        return;
    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var mandatory = $(item).data("mandatory");
    var minDateVal = $(item).data('min') ? $(item).data('min').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : undefined;
    var maxDateVal = $(item).data('max') ? $(item).data('max').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : undefined;
    var valueDateTime = $.trim($(item).val());

    var isValid = true;
    var isValidBetween = true;
    if (mandatory && valueDateTime == "") {
        $('#' + $(item)[0].id + '-error').html('required');
        $(item).addClass("error-sm-input");
        isValid = false;
    } else if (selectedValue == 'NULL') {
        $('#' + $(item)[0].id + '-error').html('Invalid value');
        $(item).addClass("error-sm-input");
        isValid = false;
    } else {
        var dateRegValid = valueDateTime.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (dateRegValid) {
            var year = parseInt(dateRegValid[3]);
            var month = parseInt(dateRegValid[1]);
            var day = parseInt(dateRegValid[2]);

            if ((year < 1900 || year > 2099) || (day < 1 || day > 31) || (month < 1 || month > 12))
                isValid = false;
            else {
                var dateVal = Date.parse(month + "/" + day + "/" + year);
                if (isNaN(dateVal)) {
                    isValid = false;
                } else if (minDateVal && maxDateVal) {
                    dateVal = new Date(month + "/" + day + "/" + year);
                    if ((+dateVal < +minDateVal) || (+dateVal > +maxDateVal)) {
                        isValid = false;
                        isValidBetween = false;
                    }
                }
            }
        } else {
            isValid = false;
        }

        if (!isValid) {
            if (isValidBetween)
                $('#' + $(item)[0].id + '-error').html('Value is not valid date');
            else
                $('#' + $(item)[0].id + '-error').html('Value must be between' + minDateVal + ' and ' + maxDateVal);
            $(item).addClass("error-sm-input");
        }
    }

    return isValid;
}

$(document).on("change", ".dropdown", function (event) {
    validateDropdown($(this)[0], '', true);
});
function validateDropdown(item, selectedValue, callBack) {
    callBack = callBack || false;
    setTimeout(
            function () {
                if (callBack)
                    validateDropdown(item, selectedValue, false);
            }, 100);

    if (callBack)
        return;
    $('#' + $(item)[0].id + '-error').html('');
    $(item).removeClass("error-sm-input");
    var mandatory = $(item).data("mandatory");

    var isValid = true;

    if (mandatory && ($(item).val() == "[-- SELECT --]" || $("#" + $(item)[0].id + " option:selected").index() == 0)) {
        $('#' + $(item)[0].id + '-error').html('required');
        $(item).addClass("error-sm-input");
        isValid = false;
    }
    return isValid;
}

function createNotification(focusOn, type, message, callbackFunction, moveToTop) { //success, warning, danger, info
    if (typeof moveToTop === "undefined" || moveToTop === null || moveToTop) {
        document.location.href = "#movetop";
    }

    columnClass = 'col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
    var iconType = 'fa fa-warning';
    var typeMesg = 'red';
    var typeTitle = 'Error';
    switch (type) {
        case "success" :
            iconType = 'fa fa-check';
            typeTitle = 'Success';
            typeMesg = 'green';
            break;
        case "warning" :
            typeTitle = 'Warning';
            typeMesg = 'orange';
            columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
            break;
        case "danger" :
            typeMesg = 'red';
            columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
            break;
        case "info" :
            typeMesg = 'blue';
            typeTitle = 'Info';
            iconType = 'fa fa-info';
            columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
            break;
    }
    if (focusOn != '')
        $("#" + focusOn).focus();

    if (errorAlertBox)
    {
        try {
            errorAlertBox.close();
        } catch (e) {
        }
    }

    errorAlertBox = $.alert({
        icon: iconType,
        title: typeTitle,
        columnClass: columnClass,
        escapeKey: false, // 'buttonescape',
        //backgroundDismiss: true,
        closeIcon: false, //true,
        type: typeMesg,
        content: message || "",
        scrollToPreviousElement: false,
        scrollToPreviousElementAnimate: false,
        buttons: {
            ok: {
                text: 'ok',
                btnClass: 'btn-' + typeMesg,
                keys: ['enter', 'esc', 'space'],
                action: function () {
                    if (callbackFunction) {
                        callbackFunction();
                    }
                }
            }
        }
    });
}
function showConfirm(type, content, callbackFunction) {
    columnClass = 'col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
    switch (type) {
        case "delete" :
            content = (content == '') ? 'Are you sure you want to delete this item?' : content;
            break;
        case "logout" :
            content = (content == '') ? 'Are you sure you want to logout' : content;
            break;
        default:
            columnClass = 'col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1';
            break
    }

    $.confirm({
        title: 'Confirm!',
        content: content,
        columnClass: columnClass,
        escapeKey:  false, //true,
        //backgroundDismiss: true,
        closeIcon: false, //true,
        scrollToPreviousElement: false,
        scrollToPreviousElementAnimate: false,
        buttons: {
            ok: {
                text: 'ok',
                btnClass: 'btn-green',
                keys: ['enter'],
                action: function () {
                    if (callbackFunction) {
                        callbackFunction();
                    }
                }
            },
            cancel: function () { }
        }
    });
}
