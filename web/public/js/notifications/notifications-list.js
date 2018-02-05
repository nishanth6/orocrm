/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
 
    $("#btnSave").on("click", function () {
        document.location.href = create_notification_url;
    });

    $('.next-tab').click(function (e) {
        if ($('#tabs > .active').next('li').hasClass('next-tab')) {
            $('#tabs > li').first('li').find('a').trigger('click');
        } else {
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
        }
        e.preventDefault();
    });
    $('.prev-tab').click(function (e) {
        if ($('#tabs > .active').prev('li').hasClass('prev-tab')) {
            $('#tabs > li').first('li').find('a').trigger('click');
        } else {
            $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        }
        e.preventDefault();
    });
    
    $('#datetimepicker1').datetimepicker('show');

    $('#datetimepicker3').datetimepicker();


    $('input[type="file"]').imageuploadify();
    
    $('input[type="file"]').on('change',function(){
        var form = document.getElementById("imageUploadForm");
        $("#message").empty();
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile===match[0]) || (imagefile===match[1]) || (imagefile===match[2]))){
            //$('#previewing').attr('src','noimage.png');
            $("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
            return false;
        }
        else{
            $.ajax({
           url: 'http://orocrm.example.com/app_dev.php/merchants/saveimage',
           type: 'POST',
           contentType:false,
           processData:false,
           cache:false,

           dataType: 'json',
           data: new FormData(form),
           async: true,
           success: function (data) {
               debugger;
               //$("#message").html(data);
               

           },

           error: function (xhr, ajaxOptions, thrownError) {
               var errorMsg = 'Ajax request failed: ' + xhr.responseText;
               $('#message').html(errorMsg);
           }
           });
       }
    });
    
    $("#moment").on('change',function(){
         var form2 = document.getElementById("ImageUploadMoments");
            $.ajax({
            url: 'http://orocrm.example.com/app_dev.php/merchants/saveimagemovements',
            type: 'POST',
            contentType:false,
            processData:false,
            //cache:false,

            dataType: 'json',
            data: new FormData(form2),
            async: true,
            success: function (data) {
                debugger;

            },

            error: function (xhr, ajaxOptions, thrownError) {
    //            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
    //            $('#campaigns').html(errorMsg);
            }
            });
    });
  


  
  
  
  
  
  

    var i = 1;
    $('#delete_row').hide();
    $("#add_row").click(function () {

        $('#delete_row').show();
        var htmlVal = ' <div class="col-xs-2 column"><select><option value="0">Week Day</option><option value="Sunday">Sunday</option><option value="Monday">Monday</option><option value="Tuesday">Tuesday</option></select></div>';
        htmlVal += '<div class="col-xs-2 column"><div class="input-group bootstrap-timepicker timepicker setWidthTime"><input id="timepicker1" type="text" class="form-control input-small"><span class="input-group-addon">&nbsp;&nbsp;<i class="icon-time icon-large"></i></span></div></div>';
        //   htmlVal += '<div class="col-xs-2 column"   ><button type="button"  id="delete_row" class="btn btn-default btn-lg"><span  class="glyphicon glyphicon-minus"></span></button></div>';
        $('#addr' + i).html(htmlVal);

        $('#tab_logic').append('<div class="row addcol"><div class="col-xs-12 "  id="addr' + (i + 1) + '"></div></div>');
        i++;
    });
    $("#delete_row").click(function () {
        if (i > 1) {
            $("#addr" + (i - 1)).html('');
            i--;
        }
    });



    $.ajax({
        url: 'http://orocrm.example.com/app_dev.php/merchants/getcampaigns',
        type: 'get',
        success: function (data) {
            html = "<option value=0>" + '[ SELECT CAMPAIGN ]' + "</option>";
            $.each(data, function (index) {
                html += "<option value=" + data[index].id + ">" + data[index].campaign_name + "</option>"
            });
            $('.campaigns_list').append(html);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#campaigns').html(errorMsg);
        }
    });

    $.ajax({
        url: 'http://orocrm.example.com/app_dev.php/merchants/getmerchants',
        type: 'get',
        success: function (data) {
            var arr = [];
            html = "<option value=0>" + '[ SELECT MERCHANTS ]' + "</option>";
            $.each(data, function (index) {
                html += "<option value=" + data[index].id + ">" + data[index].name + "</option>"
            });


            $('.merchants_list').append(html);

            $('.dist_merchants_list').append(html);


        },

        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#merchants').html(errorMsg);
        }
    });

    $.ajax({
        url: 'http://orocrm.example.com/app_dev.php/merchants/getsmiledusers',
        type: 'get',
        success: function (data) {
            html = "<option value=0>" + '[ SELECT USERS ]' + "</option>";
            $.each(data, function (index) {
                html += "<option value=" + data[index].userid + ">" + data[index].username + "</option>"
            });
            $('.smiledusers_list').append(html);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#smiledusers').html(errorMsg);
        }
    });



    $("#users_auto").autocomplete({
        // source: '{{ path("notification_getsmiledusers") }}',
        source: "http://orocrm.example.com/app_dev.php/merchants/autocomplete/users/search",
        minLength: 1,
        select: function (event, ui) {

        }

    });



    $("#merchants_auto").autocomplete({
        // source: '{{ path("notification_getmerchants") }}',
        source: "http://orocrm.example.com/app_dev.php/merchants/autocomplete/merchant/search",
        minLength: 1,
        select: function (event, ui) {

        }

    });

    $("#dist_merchants_auto").autocomplete({
        // source: '{{ path("notification_getmerchants") }}',
        source: "http://orocrm.example.com/app_dev.php/merchants/autocomplete/merchant/search",
        minLength: 1,
        select: function (event, ui) {

        }

    });


    $('.merchants_list').on('change', function () {
        var merchanttext = $('.merchants_list option:selected').text();
        if (this.value != 0) {
            $(".moment_merchant").val(merchanttext);
            $("#pickMerchant .close").click()
        }
    });


    $('.smiledusers_list').on('change', function () {
        var usertext = $('.smiledusers_list option:selected').text();
        if (this.value != 0) {
            $(".moment_smileduser").val(usertext);
            $("#pickSmiledUser .close").click()
        }
    });

    $('.dist_merchants_list').on('change', function () {
        var mtext = $('.dist_merchants_list option:selected').text();
        if (this.value != 0) {
            $(".dist_merchants").val(mtext);
            $("#pickDistanceMerchant .close").click()
        }
    });



});

 