function addToList(listId, id, name, modulename) {
    if ($("#" + listId + " #" + id).length == 0) {
        var strListItem =
                '<div class="row div-list-item" id="' + id + '">' +
                '    <div class="col-xs-11">' + name + '</div>' +
                '    <div class="col-xs-1 text-right div-list-remove">X</div>' +
                '</div>';
        $("#" + listId).append(strListItem);
    } else {
        createNotification('', 'danger', modulename + " already added!");
    }
}
function addToListWithDaysType(listId, id, type, value, data, isValidate) {
    if (isValidate == 0) {
        var strListItem =
                '<div class="row div-list-item" id="' + id + '" data-datavalue="' + type + '" data-fromvalue="' + value + '" data-tovalue="' + data + '">' +
                '    <div class="col-xs-2">' + type + '</div>' +
                '    <div class="col-xs-2">:</div>' +
                '    <div class="col-xs-2">' + value + '</div>' +
                '    <div class="col-xs-2">:</div>' +
                '    <div class="col-xs-2">' + data + '</div>' +
                '    <div class="col-xs-2  text-right div-list-remove" data-datavalue="' + type + '">X</div>' +
                '</div>';
        $("#" + listId).append(strListItem);
    } else {
        createNotification('', 'danger', "Overlapping time slot");
    }
}
function addToListWithType(listId, id, type, value, modulename) {
    if ($("#" + listId + " #" + id).length == 0) {
        var strListItem =
                '<div class="row div-list-item" id="' + id + '" data-datavalue="' + type + '" data-value="' + value + '">' +
                '    <div class="col-xs-1">' + type + '</div>' +
                '    <div class="col-xs-1 text-center">:</div>' +
                '    <div class="col-xs-9">' + value + '</div>' +
                '    <div class="col-xs-1  text-right div-list-remove" data-datavalue="' + type + '">X</div>' +
                '</div>';
        $("#" + listId).append(strListItem);
    } else {
        createNotification('', 'danger', modulename + " already added!");
    }
}
function addToListWithUpdateButton(listId, id, type, value, modulename) {
    if ($('div[data-value="' + value + '"]').length == 0) {
        var strListItem =
                '<div class="row div-list-item" id="' + id + '" data-datavalue="' + type + '" data-value="' + value + '">' +
                '    <div id="' + id + '-type" class="col-xs-4">' + type + '</div>' +
                '    <div class="col-xs-1 text-center">:</div>' +
                '    <div id="' + id + '-value" class="col-xs-5">' + value + '</div>' +
                '    <div class="col-xs-1 text-right div-list-update glyphicon glyphicon-pencil" id="' + id + '-edit" data-idvalue="' + id + '" data-datavalue="' + type + '" data-value="' + value + '"></div>' +
                '    <div class="col-xs-1 text-right div-list-remove">X</div>' +
                '</div>';
        $("#" + listId).append(strListItem);
    } else {
        createNotification('', 'danger', modulename + " already added!");
    }
}
function addToListWithTypeAndCallback(listId, id, value, type, modulename, callbackFunName) {
    var strListItem =
            '<div class="row div-list-item" id="' + id + '" data-value="' + value + '" data-datavalue="' + type + '">' +
            '    <div class="col-xs-4">' + value + '</div>' +
            '    <div class="col-xs-1 text-center">:</div>' +
            '    <div class="col-xs-6">' + type + '</div>' +
            '    <div class="col-xs-1 text-right div-list-remove"  onclick="' + callbackFunName + '(\'' + id + '\')" >X</div>' +
            '</div>';
    $("#" + listId).append(strListItem);
}
function addToListWithTypeAndRadio(listId, id, type, value, radioName, radioClass, isChecked) {
    if ($("#" + listId + " #" + id).length == 0) {
        isChecked = isChecked || "";
        var radioCtrl = '<input type="radio" name="' + radioName + '" value="' + id + '" class ="' + radioClass + '" ' + isChecked + ' >';
        var strListItem =
                '<div class="row div-list-item" id="' + id + '" data-datavalue="' + type + '" data-value="' + value + '">' +
                '    <div class="col-xs-1">' + radioCtrl + '</div>' +
                '    <div class="col-xs-4">' + type + '</div>' +
                '    <div class="col-xs-1 text-center">:</div>' +
                '    <div class="col-xs-5">' + value + '</div>' +
                '    <div class="col-xs-1 text-right div-list-remove">X</div>' +
                '</div>';
        $("#" + listId).append(strListItem);
    } else {
        createNotification('', 'danger', "currency already added !!!");
    }
}
