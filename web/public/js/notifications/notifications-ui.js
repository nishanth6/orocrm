/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {

    // Get all campaigns
    get_allcampaigns();

    $("#btnSave").on("click", function() {
        var formId = $('#notification_form');
        $('#is_deleted').val(0);
        formId.trigger('submit');
    });

    $("#btnReset").on("click", function() {
        //var formId = $('#notification_form'); 
        $('#notification_form')[0].reset();
        $('.imageuploadify-container').css('display', 'none');
    });

    $("#btnUpdate").on("click", function() {
        var formId = $('#notification_form');
        $('#is_deleted').val(0);
        formId.trigger('submit');
    });

    $("#btnSaveDraft").on("click", function() {
        var formId = $('#notification_form');
        $('#is_deleted').val(3);
        formId.trigger('submit');
    });

    $("#btnCancel").on("click", function() {
        document.location.href = list_notification_url;
    });


    // Save FORM data :
    $("#notification_form").submit(function(event) {
        var formdata = new FormData(this);
        var html = '';
        $.ajax({
            url: saveNotificationData,
            data: formdata,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            dataType: 'json',
            async: true,
            success: function(data) {
                //   console.log(data);
                $('.message').text(' ');
                if (data.status == 'success') {
                    $('.message').removeClass('alert alert-danger')
                    $('.message').addClass('alert alert-success');
                    html = "<strong>Success ! </strong>" + data.message;
                    $('.message').html(html);
                } else if (data.status == 'failure') {
                    html = "<strong>Failure ! </strong>" + data.message;
                    $('.message').removeClass('alert alert-success')
                    $('.message').addClass('alert alert-danger');
                    $('.message').html(html);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // var errorMsg = 'Ajax request failed: ' + xhr.responseText;
                // $('#campaigns').html(errorMsg);
            }
        });
        event.preventDefault();
    });
    //END Save Form Data

    $('#toggle-weekdayrepeat').change(function() {
        //$('#console-event').html('Toggle: ' + $(this).prop('checked')); 
        if ($(this).prop('checked') == false) {
            $('.showweekday').hide();
        } else {
            $("table tbody").empty();
            $('.showweekday').show();
        }
    });




    // Navigation Tabs
    $('.next-tab').click(function(e) {
        if ($('#tabs > .active').next('li').hasClass('next-tab')) {
            $('#tabs > li').first('li').find('a').trigger('click');
        } else {
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
        }
        e.preventDefault();
    });
    $('.prev-tab').click(function(e) {
        if ($('#tabs > .active').prev('li').hasClass('prev-tab')) {
            $('#tabs > li').first('li').find('a').trigger('click');
        } else {
            $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        }
        e.preventDefault();
    });
    // End Navigation Tabs

    $("#notification_start_date").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#notification_end_date").datepicker({ dateFormat: 'yy-mm-dd' });
    $('#timepicker').timepicker({});



    // ImageUplodify
    $('input[type="file"]').imageuploadify();

    // AUTOCOMPLETE FUNCTIONS CALL 
    $("#users_auto").autocomplete({
        source: getAutocompleteUsers,
        minLength: 1,
        select: function(event, ui) {
            $('.users_auto_hidden').val(ui.item.name);
        }
    });
    $("#merchants_auto").autocomplete({
        source: getAutocompleteMerchants,
        minLength: 1,
        select: function(event, ui) {

            $('.merchants_auto_hidden').val(ui.item.name);
        }
    });
    $("#dist_merchants_auto").autocomplete({

        source: getAutocompleteMerchants,
        minLength: 1,
        select: function(event, ui) {

            $('.dist_merchants_auto_hidden').val(ui.item.name);
        }
    });
    //END AUTOCOMPLETE FUNCTIONS CALL

    //PICK BY MODAL DIV

    $('.pickMerchant').click(function(e) {
        $('#pickMerchant').modal('show');
        get_all_merchants();
    });
    $('.merchants_list').on('change', function() {
        var merchanttext = $('.merchants_list option:selected').text();
        var merchantval = $('.merchants_list option:selected').val();
        if (this.value != 0) {
            $('.merchants_auto_hidden').val(merchantval);
            $(".moment_merchant").val(merchanttext);
            $("#pickMerchant .close").click()
        }
    });


    $('.pickSmiledUser').click(function(e) {
        $('#pickSmiledUser').modal('show');
        get_all_smiledusers();
    });

    $('.smiledusers_list').on('change', function() {
        var usertext = $('.smiledusers_list option:selected').text();
        var uservalue = $('.smiledusers_list option:selected').val();
        if (this.value != 0) {
            $('.users_auto_hidden').val(uservalue);
            $(".moment_smileduser").val(usertext);
            $("#pickSmiledUser .close").click()
        }
    });


    $('.pickDistanceMerchant').click(function(e) {
        $('#pickDistanceMerchant').modal('show');
        get_all_Merchants_inDistance();
    });

    $('.dist_merchants_list').on('change', function() {
        var mtext = $('.dist_merchants_list option:selected').text();
        var mtextval = $('.dist_merchants_list option:selected').val();
        if (this.value != 0) {
            $(".dist_merchants_auto_hidden").val(mtextval);
            $(".dist_merchants").val(mtext);
            $("#pickDistanceMerchant .close").click()
        }
    });
    //END PICK BY MODAL DIV

    $("#name").keyup(function(event) {
        var name_val = this.value;
        if (name_val.length < 20) {

            $('.notifyname').empty();

            $('.notifyname').html(name_val);
        } else if (name_val.length < 22) {
            $('.notifyname').append('...');
        }
    });

    $('#short_description').keyup(function(event) {
        var short_desc = this.value;
        if (short_desc.length < 90) {
            $('.short_desc').empty();
            $('.short_desc').html(short_desc);
        } else if (short_desc.length < 93) {
            $('.short_desc').append('...');
            exit;
        }
    });

    //EDIT DATA
    if ($('#toggle-weekdayrepeat').prop('checked') == true) {
        $('.showweekday').show();
    } else {
        $('.showweekday').hide();
    }


    //  $('.notificationpreviewImage').find('img').attr("src", image[0].src);
    // $('.momentspreviewImage').find('img').attr("src", image[0].src);

    //Edit Data
    var values = $('#weekdaytime').val();
    if (values != '') {
        var spl = values.split(",");
        console.log(spl);
        for (var i = 0; i < spl.length; i++) {
            var daynumber = spl[i].split("-");
            weekdayVals.push(daynumber[0]);
        }
        weekdaytime.push(spl);
    }

});
$('tbody').css('border-bottom', '150px solid white');
var weekdaytime = [];
var weekdayVals = [];

function addRow() {
    if ($('#toggle-weekdayrepeat').prop('checked') == true) {



        var w = $('#weekday');
        var WeekDay = $('option:selected', w).attr('data-text'); //$("#weekday").val();
        var weekDayVal = $("#weekday").val();
        var Time = $(".time").val();

        var markup = "<tr><td>" + WeekDay + "</td><td class='setTd'>" + Time + "</td></tr>";
        if (jQuery.inArray(weekDayVal, weekdayVals) !== -1) {
            console.log("is in array");
            $('.existval').empty();
            $('.existval').html('Sorry its already Exist');
            $('.existval').css('color', 'red');
            return false;
        } else {
            $('.existval').empty();
            weekdaytime.push(weekDayVal + '-' + Time);
            weekdayVals.push(weekDayVal);
            //$('#weekdaytime').val(JSON.stringify(weekdaytime));
            $('#weekdaytime').val(weekdaytime);
            var markup = "<tr><td>" + WeekDay + "</td><td class='setTd'>" + Time + "</td></tr>";
            $("table tbody").append(markup);
            $('tbody').css('border-bottom', '0px solid white');
            $('tbody').css('border-bottom', '30px solid white');
        }
    } else {
        return false;
    }
}



function initializeAutocomplete() {
    var input = document.getElementById('locality');
    // var options = {
    // types: ['(regions)'],
    // componentRestrictions: {country: "IN"}
    // };
    var options = {}

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var placeId = place.place_id;
        // to set city name, using the locality param
        var componentForm = {
            locality: 'short_name',
        };
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                $("#city").val(val);
            }
        }
        $('#latitude').val(lat);
        $('#longitude').val(lng);

    });
}

function get_allcampaigns() {
    $.ajax({
        url: getCampaigns,
        type: 'get',
        success: function(data) {
            html = "<option value=0>" + '[ SELECT CAMPAIGN ]' + "</option>";
            $.each(data, function(index) {
                html += "<option value=" + data[index].id + ">" + data[index].campaign_name + "</option>"
            });
            $('.campaigns_list').append(html);
            if ($('#sc_campaign_id').val()) {
                $('#campaigns').val($('#sc_campaign_id').val());
            }
        },

        error: function(xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#campaigns').html(errorMsg);
        }
    });
}

function get_all_merchants() {
    $.ajax({
        url: getMerchants,
        type: 'get',
        success: function(data) {
            var arr = [];
            html = "<option value=0>" + '[ SELECT MERCHANTS ]' + "</option>";
            $.each(data, function(index) {
                html += "<option value=" + data[index].id + ">" + data[index].name + "</option>"
            });
            $('.merchants_list').append(html);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#merchants').html(errorMsg);
        }
    });
}

function get_all_smiledusers() {
    $.ajax({
        url: getSmiledUsers,
        type: 'get',
        success: function(data) {
            $('.smiledusers_list').empty();
            html = "<option value=0>" + '[ SELECT USERS ]' + "</option>";
            $.each(data, function(index) {
                html += "<option value=" + data[index].userid + ">" + data[index].username + "</option>"
            });
            $('.smiledusers_list').append(html);


        },
        error: function(xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#smiledusers').html(errorMsg);
        }
    });
}

function get_all_Merchants_inDistance() {
    $.ajax({
        url: getMerchants,
        type: 'get',
        success: function(data) {

            $('.dist_merchants_list').empty();
            var arr = [];
            html = "<option value=0>" + '[ SELECT MERCHANTS ]' + "</option>";
            $.each(data, function(index) {
                html += "<option value=" + data[index].id + ">" + data[index].name + "</option>"
            });
            $('.dist_merchants_list').append(html);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('.dist_merchants_list').html(errorMsg);
        }
    });
}


// EDIT DATA