function fomatDateDDMMYYY(date) {
    dateday = date.getDate();
    dateMonth = date.getMonth() + 1;
    return (dateday < 10 ? '0' + dateday : dateday) + '/' + (dateMonth < 10 ? "0" + dateMonth : dateMonth) + '/' + date.getFullYear();
}
function fomatDateMMDDYYY(date) {
    dateday = date.getDate();
    dateMonth = date.getMonth() + 1;
    return  (dateMonth < 10 ? "0" + dateMonth : dateMonth) + '/' + (dateday < 10 ? '0' + dateday : dateday) + '/' + date.getFullYear();
}
function fomatDatefromDDMMYYYYtoMMDDYYYstring(dateString) {
    if ($.trim(dateString) != "") {
        var dateformat = dateString.split("/");
        return dateformat[1] + '/' + dateformat[0] + '/' + dateformat[2];
    } else {
        return "";
    }
}
function getOfsetTime() {
    var offset = new Date().getTimezoneOffset();
    offset = ((offset < 0 ? '+' : '-') + // Note the reversed sign!
            pad(parseInt(Math.abs(offset / 60)), 2) +
            pad(Math.abs(offset % 60), 2));
    return offset.slice(0, 3) + ":" + offset.slice(3);
}
function convertTimeToDate(time) {
    var today = new Date();
    var hours = new Date(today).getHours();
    time = time || '00:00';
    var day = new Date(today).getDate();
    var month = new Date(today).getMonth() + 1;
    var year = new Date(today).getFullYear();

    var timearray = time.split(":");
    var resutDate = new Date(new Date(year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)));
    resutDate = resutDate.setHours(timearray[0], timearray[1].toLowerCase().replace(/am/g, "").replace(/pm/g, "").replace(/ /g, ""), 0, 0);
    return resutDate;
}
function convertToDateTime(date) {
    date = ($.trim(date) == "" ? new Date() : date) || new date();
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    var resutDate = new Date(new Date(year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)));
    resutDate = resutDate.setHours(hours, minutes, 0, 0);
    return new Date(resutDate);
}
function convertToDate(date) {
    date = ($.trim(date) == "" ? new Date() : date) || new date();
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    var resutDate = new Date(new Date(year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)).setHours(0));
    return new Date(resutDate.setMinutes(0));
}
function convertDateTommddyyyy(date) {
    date = ($.trim(date) == "" ? new Date() : date) || new date();
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    return isNaN(day) ? '' : (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;
}

function convertDateTommddyyyyhhmm(date) {
    date = ($.trim(date) == "" ? new Date() : date) || new date();
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();
    return isNaN(day) ? '' : (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}
function convertDateTimeToLocal(date, adddays, showThisTime) {
    var dbDate = date.split(" ");
    var dbDateChanged = dbDate[0].replace(/-/g, "/");
    var dateToLocal = (date != '' ? new Date(dbDateChanged + ' ' + dbDate[1]) : new Date());
    if (adddays) {
        dateToLocal.setDate(dateToLocal.getDate() + adddays);
    }

    var hours = dateToLocal.getHours();
    var minutes = dateToLocal.getMinutes();
    var day = dateToLocal.getDate();
    var month = dateToLocal.getMonth() + 1;
    var year = dateToLocal.getFullYear();

    if (showThisTime) {
        return (isNaN(day) ? '' : month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + showThisTime;
    } else {
        return (isNaN(day) ? '' : month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    }

}
function convertUTCDateToLocal(date) {
    var dbDate = date.split(" ");
    var dbDateChanged = dbDate[0].replace(/-/g, "/");
    var dateToLocal = (date != '' ? new Date(dbDateChanged + ' ' + dbDate[1] + ' UTC') : new Date());
    var day = dateToLocal.getDate();
    var month = dateToLocal.getMonth() + 1;
    var year = dateToLocal.getFullYear();
    return isNaN(day) ? '' : (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;
}
function convertUTCDateTimeToLocal(date, adddays, showThisTime) {
    var dbDate = date.split(" ");
    var dbDateChanged = dbDate[0].replace(/-/g, "/");
    var dateToLocal = (date != '' ? new Date(dbDateChanged + ' ' + dbDate[1] + ' UTC') : new Date());
    if (adddays) {
        dateToLocal.setDate(dateToLocal.getDate() + adddays);
    }

    var hours = dateToLocal.getHours();
    var minutes = dateToLocal.getMinutes();
    var day = dateToLocal.getDate();
    var month = dateToLocal.getMonth() + 1;
    var year = dateToLocal.getFullYear();

    if (showThisTime) {
        return (isNaN(day) ? '' : month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + showThisTime;
    } else {
        return (isNaN(day) ? '' : month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    }

}
function convertUTCDateTimeToLocalAMPM(date) {
    var dbDate = date.split(" ");
    var dbDateChanged = dbDate[0].replace(/-/g, "/");
    var dateToLocal = (date != '' ? new Date(dbDateChanged + ' ' + dbDate[1] + ' UTC') : new Date());
    var hours = (dateToLocal.getHours() % 12) || 12;
    var ampm = dateToLocal.toString("tt");
    var minutes = dateToLocal.getMinutes();
    var day = dateToLocal.getDate();
    var month = dateToLocal.getMonth() + 1;
    var year = dateToLocal.getFullYear();
    return (isNaN(day) ? '' : month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year + " " + +(hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
}
function getUTCDateTime() {
    var now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function convert12HoursTo24HoursDateTime(time){
    var timelocal = time.toUpperCase();
    var times = timelocal.split(":");
    var hours = parseInt($.trim(times[0]), 10);
    var minute = parseInt($.trim(times[1].replace("AM", "").replace("PM", "")), 10);
    var AMPM = timelocal.includes("AM") ? "AM" : "PM";
    if (AMPM == "PM" && hours != 12){
        hours += 12;
    } else if (AMPM == "AM" && hours == 12){
        hours -= 12;
    }
    
    var converted_time = hours + ":" + minute;
    return new Date(appStartDate + " " + converted_time);
}