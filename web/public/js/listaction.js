var listData = [];
var currentIndex = 0;
var currentPage = 1;
var maxPages = 1;
var startFromTop = true;
var totalRecordCount = 0;
var recordCount = 0;
var scrollValue = 0;
var currentLogPage = 1;
var maxLogPages = 1;
var totalLogRecordCount = 0;

function showRecords(pageSize) {
    $("#pageNumbers").hide();
    if (totalRecordCount > 0){
        pageSize = pageSize || defaultPageSize;
        var end = (currentPage * pageSize);
        var start = (end - pageSize) + 1;
        if (currentPage == maxPages) {
            end = totalRecordCount;
        }
        $("#pageNumbers").show();
        var recoddsText = "records";
        if (totalRecordCount == 1) {
            recoddsText = "record";
        }
        $("#pageNumbers").html(start + "-" + end + " / " + totalRecordCount + " " + recoddsText);
    }
}
function showLogRecords(pagesize) {
    var end = (currentLogPage * pagesize);
    var start = (end - pagesize) + 1;
    if (currentLogPage == maxLogPages) {
        end = totalLogRecordCount;
    }
    var recoddsText = "records";
        if (totalLogRecordCount == 1) {
            recoddsText = "record";
        }
    $("#logPageNumbers").html(start + "-" + end + " / " + totalLogRecordCount + " " + recoddsText);
}

function redirectToList() {
    document.location.href = redirectToListURL;
}
function btnFirstPage(e, callbackFunction) {
    e.preventDefault();
    currentPage = 1;
    if (callbackFunction) {
        callbackFunction();
    }
    scrollValue = 0;
    currentIndex = 0;
}
function btnFirstLogPage(e) {
    e.preventDefault();
    currentLogPage = 1;
    scrollValue = 0;
    currentIndex = 0;
}
function btnPreviousPage(e, callbackFunction) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage -= 1;
        currentIndex = 0;
        if (callbackFunction) {
            callbackFunction();
        }
        scrollValue = 0;
    }
}
function btnPreviousLogPage(e) {
    e.preventDefault();
    if (currentLogPage > 1) {
        currentLogPage -= 1;
        currentIndex = 0;
        scrollValue = 0;
    }
}
function btnNextPage(e, callbackFunction) {
    e.preventDefault();
    if (currentPage < maxPages) {
        currentPage += 1;
        currentIndex = 0;
        if (callbackFunction) {
            callbackFunction();
        }
        scrollValue = 0;
    }
}
function btnNextLogPage(e) {
    e.preventDefault();
    if (currentLogPage < maxLogPages) {
        currentLogPage += 1;
        currentIndex = 0;
        scrollValue = 0;
    }
}
function btnLastPage(e, callbackFunction) {
    e.preventDefault();
    currentPage = maxPages;
    if (callbackFunction) {
        callbackFunction();
    }
    scrollValue = 0;
    currentIndex = 0;
}
function btnLastLogPage(e) {
    e.preventDefault();
    currentLogPage = maxLogPages;
    scrollValue = 0;
    currentIndex = 0;
}
function showPrevious(e, callbackFunction) {
    e.preventDefault();
    startFromTop = false;
    if (currentIndex > 0) {
        currentIndex -= 1;
        if ($(".list-row").length >= 0)
            $(".list-row")[currentIndex].click();
    } else {
        if (currentPage > 1) {
            currentPage -= 1;
            if (callbackFunction) {
                callbackFunction();
            }
            scrollValue = 10000000000;
        }
    }
}
function showNext(e, callbackFunction) {
    e.preventDefault();
    startFromTop = true;
    if (currentIndex < listData.length - 1) {
        currentIndex += 1;
        if ($(".list-row").length > currentIndex)
            $(".list-row")[currentIndex].click();
    } else {
        if (currentPage < maxPages) {
            currentPage += 1;
            if (callbackFunction) {
                callbackFunction();
            }
            scrollValue = 0;
        }
    }
}
function btnSearch(e, callbackFunction, checkEmptyValidation) {
    checkEmptyValidation = checkEmptyValidation || 'true';
    if ($.trim($("#txtSearch").val()) == "" && checkEmptyValidation == 'true') {
        createNotification('txtSearch', 'danger', "Enter a text to search !!!");
        return;
    }

    $("#btnshwnxtprv").show();
    $("#lblPageNumbers").show();
    currentIndex = 0;
    currentPage = 1;
    startFromTop = true;
    scrollValue = 0;
    if (callbackFunction) {
        callbackFunction();
    }
}
function btnClear(e, callbackFunction, defaultValue) {
    defaultValue = defaultValue || "*";
    $("#txtSearch").val("");
    $("#cmbSearchField").val(defaultValue);
    $("#btnshwnxtprv").show();
    $("#lblPageNumbers").show();
    currentIndex = 0;
    currentPage = 1;
    startFromTop = true;
    if (callbackFunction) {
        callbackFunction();
    }
    scrollValue = 0;
}
function bindPrintAndExport() {
    $("#btnPrint").on("click", function () {
         printMe();
    });

    $("#btnExport").on("click", function () {
        exportToExcel();
    });
}
function setListCount(dataList, pageSize) {
    pageSize = pageSize || defaultPageSize;
    totalRecordCount = dataList.totalCount;
    recordCount = dataList.count;
    listData = dataList.data;
    maxPages = Math.ceil(totalRecordCount / pageSize);
}
function setListCountForEventLog(dataLogList, pageZise) {
    totalLogRecordCount = dataLogList.totalCount;
    LogRecordCount = dataLogList.count;
    listLogData = dataLogList.data;
    maxLogPages = Math.ceil(totalLogRecordCount / pageZise);
}
function loadListCountAndEvent() {
    currentIndex = 0;
    if (startFromTop) {
        currentIndex = 0;
    } else {
        currentIndex = $(".list-row").length - 1;
    }
    $(".list-row")[currentIndex].click();
}
function setDivScroll() {
//    setTimeout(function () {
//        // $(".list-holder").animate({scrollTop: $('.row.list-row.selected').offset().top}); 
//    }, 3000);
}
function resetListOnDelete() {
    if (currentPage > 1 && recordCount < 2) {
        currentPage -= 1;
    }
}
function resetListToTop(callbackFunction) {
    currentIndex = 0;
    currentPage = 1;
    startFromTop = true;
    scrollValue = 0;
    if (callbackFunction) {
        callbackFunction();
    }
}
function enableDisablePagination(callbackFunction, pageSize) {
    pageSize = pageSize || defaultPageSize;
    if (totalRecordCount <= 1) {
        $('#btnshwnxtprv').hide();
        $('#btnfrstprelasnxt').hide();
    } else {
        $('#btnshwnxtprv').show();
        $('#btnfrstprelasnxt').show();
    }
    if (totalRecordCount <= pageSize) {
        $('#btnfrstprelasnxt').hide();
    } else {
        $("#btnfrstprelasnxt").show();
    }
    if (callbackFunction) {
        callbackFunction();
    }
}

function enableDisableLogPagination(callbackFunction, pageSize) {
    pageSize = pageSize || defaultPageSize;
    if (totalRecordCount <= 0) {
        $("#lblLogPageNumbers").hide();
    } else {
        $("#lblLogPageNumbers").show();
    }
    if (totalLogRecordCount <= 1) {
        $('#btneventlogfrstprelasnxt').hide();
    } else {
        $('#btneventlogfrstprelasnxt').show();
    }
    if (totalLogRecordCount <= pageSize) {
        $('#btneventlogfrstprelasnxt').hide();
    } else {
        $("#btneventlogfrstprelasnxt").show();
    }
    if (callbackFunction) {
        callbackFunction();
    }
}

function resetListUI() {
    $('a[href*="#info"]').removeClass('active');
    $('a[href*="#history"]').removeClass('active');
    $('a[href*="#deleted"]').removeClass('active');
    $('a[href*="#info"]').addClass('active').click();
}