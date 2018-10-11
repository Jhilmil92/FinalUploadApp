function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        var percentComplete = Math.round(e.loaded * 100 / e.total);
        $("#FileProgress").css("width", percentComplete + '%').attr('aria-valuenow', percentComplete);
        var timeSpent = new Date().getTime() - startTime
        $('#FileProgress span').text(percentComplete + "% Time spent so far :" + String(timeSpent));
    }
    else {
        $('#FileProgress span').text('unable to compute');
    }
}

function completeHandler() {
    $('#createView').empty();
    $('.CreateLink').show();
    $.unblockUI();
}


function successHandler(data) {
    if (data.statusCode == 200) {
        $('#FilesList tr:last').after(data.NewRow);
        alert(data.status);
    }
    else {
        alert(data.status);
    }
}

function errorHandler(xhr, ajaxOptions, thrownError) {
    alert("There was an error attempting to upload the file. (" + thrownError + ")");
}


function Cancel_btn_handler() {
    $('#createView').empty();
    $('.CreateLink').show();
    $.unblockUI();
}