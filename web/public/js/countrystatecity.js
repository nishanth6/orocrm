var selectedCountry = null;
var selectedState = null;
var selectedCity = null;

function initCountryStateCity() {
    $("#txtCountry").typeahead({
        onSelect: function (item) {
            item.name = item.text;
            selectedCountry = item;
            $("#txtState").val("");
            $("#txtCity").val("");
            selectedState = null;
            selectedCity = null;
        },
        ajax: {
            url: getCountryURL,
            timeout: 500,
            displayField: "name",
            triggerLength: 1,
            method: "post",
            loadingClass: "loading-circle",
            preDispatch: function (query) {
                return {
                    data: JSON.stringify({search: query.replace(/'/g, "''")})
                }
            },
            preProcess: function (data) {
                if (data.success === false && data.tokenInvalid) {
                    createNotification('', 'danger', data.errorMsg, logout);
                    return false;
                } else if (data.success === false) {
                    return false;
                }
                return data.data;
            }
        }
    });
    $("#btnShowCountry").on("click", function () {
        bindCountry();
    });
    $("#btnSelectCountry").on("click", function () {
        if ($("#cmbCountry").val() != "") {
            selectedCountry = {};
            selectedCountry.value = $("#cmbCountry").val();
            selectedCountry.name = $("#cmbCountry option:selected").text();
            selectedCountry.text = $("#cmbCountry option:selected").text();
            $("#txtCountry").val(selectedCountry.name);
            $("#country-modal").modal("hide");
            validateString($("#txtCountry"), selectedCountry);
        } else {
            selectedReportManager = null;
            $("#country-modal").modal("hide");
        }
        $("#txtState").val("");
        $("#txtCity").val("");
        selectedState = null;
        selectedCity = null;

    });
    $("#btnClearCountry").on("click", function () {
        selectedCountry = null;
        $("#txtCountry").val("");
        $("#txtState").val("");
        $("#txtCity").val("");
        selectedState = null;
        selectedCity = null;
    });

    $("#txtState").typeahead({
        onSelect: function (item) {
            item.name = item.text;
            selectedState = item;
            $("#txtCity").val("");
            selectedCity = null;
        },
        ajax: {
            url: getStateURL,
            timeout: 500,
            displayField: "name",
            triggerLength: 1,
            method: "post",
            loadingClass: "loading-circle",
            preDispatch: function (query) {
                return {
                    data: JSON.stringify({search: query.replace(/'/g, "''")})
                }
            },
            preProcess: function (data) {
                if (data.success === false && data.tokenInvalid) {
                    createNotification('', 'danger', data.errorMsg, logout);
                    return false;
                } else if (data.success === false) {
                    return false;
                }
                return data.data;
            }
        }
    });
    $("#btnShowState").on("click", function () {
        bindState();
    });
    $("#btnSelectState").on("click", function () {
        if ($("#cmbState").val() != "") {
            selectedState = {};
            selectedState.value = $("#cmbState").val();
            selectedState.name = $("#cmbState option:selected").text();
            selectedState.text = $("#cmbState option:selected").text();
            $("#txtState").val(selectedState.name);
            $("#state-modal").modal("hide");
            validateString($("#txtState"), selectedState);
        } else {
            selectedReportManager = null;
            $("#state-modal").modal("hide");
        }
        $("#txtCity").val("");
        selectedCity = null;
    });
    $("#btnClearState").on("click", function () {
        selectedState = null;
        $("#txtState").val("");
        $("#txtCity").val("");
        selectedCity = null;
    });

    $("#txtCity").typeahead({
        onSelect: function (item) {
            item.name = item.text;
            selectedCity = item;
        },
        ajax: {
            url: getCityURL,
            timeout: 500,
            displayField: "name",
            triggerLength: 1,
            method: "post",
            loadingClass: "loading-circle",
            preDispatch: function (query) {
                return {
                    data: JSON.stringify({search: query.replace(/'/g, "''")})
                }
            },
            preProcess: function (data) {
                if (data.success === false && data.tokenInvalid) {
                    createNotification('', 'danger', data.errorMsg, logout);
                    return false;
                } else if (data.success === false) {
                    return false;
                }
                return data.data;
            }
        }
    });
    $("#btnShowCity").on("click", function () {
        bindCity();
    });
    $("#btnSelectCity").on("click", function () {
        if ($("#cmbCity").val() != "") {
            selectedCity = {};
            selectedCity.value = $("#cmbCity").val();
            selectedCity.name = $("#cmbCity option:selected").text();
            selectedCity.text = $("#cmbCity option:selected").text();
            $("#txtCity").val(selectedCity.name);
            $("#city-modal").modal("hide");
            validateString($("#txtCity"), selectedCity);
        } else {
            selectedReportManager = null;
            $("#city-modal").modal("hide");
        }
    });
    $("#btnClearCity").on("click", function () {
        selectedCity = null;
        $("#txtCity").val("");
    });
}

function bindCountry() {
    $("#cmbCountry").find("option:gt(0)").remove();
    $.ajax({
        url: getCountryURL,
        type: "POST",
        dataType: "json",
        data: {data: JSON.stringify({}),typeheaderPick: true},
        success: function (data) {
            $("#cmbCountry").find("option:gt(0)").remove();
            if (data.success) {
                $.each(data.data, function (key, value) {
                    $("#cmbCountry").append($("<option></option>").val(value.id).html(value.name));
                });
            } else {
                createNotification('', 'danger', data.errorMsg);
            }
            $("#country-modal").modal("show");
        },
        error: function (data) {
            var errorCallBack = (data && data.responseJSON && data.responseJSON.tokenInvalid) ? logout : null;
            createNotification('', 'danger', (data && data.responseJSON && data.responseJSON.errorMsg && $.trim(data.responseJSON.errorMsg) != '') ? data.responseJSON.errorMsg : "Error occurred while fetching the country list !!!", errorCallBack);
        }
    });
}
function bindState() {
    $("#cmbState").find("option:gt(0)").remove();
    $.ajax({
        url: getStateURL,
        type: "POST",
        dataType: "json",
        data: {data: JSON.stringify({country_id: (selectedCountry != null) ? selectedCountry.value : '-1'}), typeheaderPick: true},
        success: function (data) {
            $("#cmbState").find("option:gt(0)").remove();
            if (data.success) {
                $.each(data.data, function (key, value) {
                    $("#cmbState").append($("<option></option>").val(value.id).html(value.name));
                });
            } else {
                createNotification('', 'danger', data.errorMsg);
            }
            $("#state-modal").modal("show");
        },
        error: function (data) {
            var errorCallBack = (data && data.responseJSON && data.responseJSON.tokenInvalid) ? logout : null;
            createNotification('', 'danger', (data && data.responseJSON && data.responseJSON.errorMsg && $.trim(data.responseJSON.errorMsg) != '') ? data.responseJSON.errorMsg : "Error occurred while fetching the state list !!!", errorCallBack);
        }
    });
}
function bindCity() {
    $("#cmbCity").find("option:gt(0)").remove();
    $.ajax({
        url: getCityURL,
        type: "POST",
        dataType: "json",
        data: {data: JSON.stringify({state_id: (selectedState != null) ? selectedState.value : '-1'}), typeheaderPick: true},
        success: function (data) {
            $("#cmbCity").find("option:gt(0)").remove();
            if (data.success) {
                $.each(data.data, function (key, value) {
                    $("#cmbCity").append($("<option></option>").val(value.id).html(value.name));
                });
            } else {
                createNotification('', 'danger', data.errorMsg);
            }
            $("#city-modal").modal("show");
        },
        error: function (data) {
            var errorCallBack = (data && data.responseJSON && data.responseJSON.tokenInvalid) ? logout : null;
            createNotification('', 'danger', (data && data.responseJSON && data.responseJSON.errorMsg && $.trim(data.responseJSON.errorMsg) != '') ? data.responseJSON.errorMsg : "Error occurred while fetching the city list !!!", errorCallBack);
        }
    });
}