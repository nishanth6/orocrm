$("#txtMerchant").typeahead({
    onSelect: function (item) {
        item.name = item.text;
        selectedMerchant = item;
        if (typeof getMerchantSubscriptionCounts == "function") {
            getMerchantSubscriptionCounts();
        }
    },
    ajax: {
        url: getMerchantByLoggedInUserURL,
        timeout: 500,
        displayField: "merchant_name",
        triggerLength: 1,
        method: "post",
        loadingClass: "loading-circle",
        preDispatch: function (query) {
            return {
                search: query.replace(/'/g, "''")
            };
        },
        preProcess: function (data) {
            selectedMerchant = {};
            if (data.success === false && data.tokenInvalid) {
                createNotification('', 'danger', data.errorMsg, logout);
                return false;
            }else if (data.success === false) {
                return false;
            }
            return data.data;
        }
    }
});
$("#btnShowMerchant").on("click", function () {
    $('#txtMerchant-error').html('');
    $("#txtMerchant").removeClass("error-sm-input");
    bindMerchant();
});
$("#btnSelectMerchant").on("click", function () {
    if ($("#cmbMerchant").val() != "") {
        selectedMerchant = {};
        selectedMerchant.value = $("#cmbMerchant").val();
        selectedMerchant.name = $("#cmbMerchant option:selected").text();
        selectedMerchant.text = $("#cmbMerchant option:selected").text();
        $("#txtMerchant").val(selectedMerchant.name);
        $("#merchant-modal").modal("hide");
        $("#txtMerchant").trigger("onblur");

        if (typeof getMerchantSubscriptionCounts == "function") {
            getMerchantSubscriptionCounts();
        }
    } else {
        selectedMerchant = null;
        $("#merchant-modal").modal("hide");
    }
});
$("#btnClearMerchant").on("click", function () {
    selectedMerchant = null;
    $("#txtMerchant").val("");
});
function bindMerchant() {
    $("#cmbMerchant").find("option:gt(0)").remove();
    $.ajax({
        url: getMerchantByLoggedInUserURL,
        type: "POST",
        dataType: "json",
        data: {typeheaderPick: true },
        success: function (data) {
            $("#cmbMerchant").find("option:gt(0)").remove();
            if (data.success) {
                $.each(data.data, function (key, value) {
                    $("#cmbMerchant").append($("<option></option>").val(value.id).html(value.merchant_name));
                });
            }
            $("#merchant-modal").modal("show");
        },
        error: function (data) {
            var errorCallBack = (data && data.responseJSON && data.responseJSON.tokenInvalid) ? logout : null;
            createNotification('', 'danger', (data && data.responseJSON && data.responseJSON.errorMsg && $.trim(data.responseJSON.errorMsg) != '') ? data.responseJSON.errorMsg : "Error occurred while fetching the merchant list !!!", errorCallBack);
        }
    });
}