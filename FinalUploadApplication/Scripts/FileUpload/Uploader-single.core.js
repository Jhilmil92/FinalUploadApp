var startTime = new Date().getTime();
function setStartTime() {
    startTime = new Date().getTime();
}
function createMode() {
    $('.CreateLink').hide();
    Init_Upload();

}
function Init_Upload() {
    $('#FormUpload input[name=UploadedFile]').change(function (evt) { singleFileSelected(evt); });
    $("#FormUpload button[id=Cancel_btn]").click(function () {
        Cancel_btn_handler()
    });
    $('#FormUpload button[id=Submit_btn]').click(function () {
        setStartTime();
        UploadFile();
    });
    $.blockUI.defaults.overlayCSS = {
        backgroundColor: '#000',
        opacity: 0.6
    };
    $.blockUI.defaults.css = {
        padding: 0,
        margin: 5,
        width: '50%',
        top: '30%',
        left: '25%',
        color: '#000',
        border: '3px solid #aaa',
        backgroundColor: '#fff'
    };
    $.blockUI({ message: $('#createView') });
}

function singleFileSelected(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    selectedFiles = evt.target.files || evt.dataTransfer.files;
}

function UploadFile() {
    // we can create form by passing the form to Constructor of formData obeject
    //or creating it manually using append function  but please note file file name should be same like the action Paramter
    //var dataString = new FormData();
    //dataString.append("UploadedFile", selectedFile);

    //var form = $('#FormUpload')[0]; -- uncomment
    // var dataString = new FormData(form); -- uncomment
    var dataString = new FormData();
    for (var i = 0; i < selectedFiles.length; i++) {
        dataString.append("uploadedFiles", selectedFiles[i]);
    }
    $.ajax({
        url: '/Uploader/Upload',  //Server script to process data
        type: 'POST',
        xhr: function () {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Check if upload property exists
                //myXhr.upload.onprogress = progressHandlingFunction
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        success: successHandler,
        error: errorHandler,
        complete: completeHandler,
        // Form data
        data: dataString,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });

}



