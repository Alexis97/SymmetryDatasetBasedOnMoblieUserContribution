document.getElementById('capture').addEventListener('click', handleCapture);
document.getElementById('change').addEventListener('click', handleChange);
document.getElementById('clear').addEventListener('click', handleClear);
//document.getElementById('upload').addEventListener('click', handleUpload);

var imgfile;

function handleCapture () {
	console.log("capture!");
	document.getElementById('cameraInput').click();
    imgfile = document.getElementById('cameraInput').files[0];
}

function handleChange () {
	console.log("change!");
	switch (strokeType)
    {
        case "line":
            strokeType = "dot";
            break;
        case "dot":
            strokeType = "line";
            break;
    }
}

function handleClear () {
	console.log("clear!");
	recordPath = new Path2D();
    context.stroke(recordPath);
}

var host = "http://10.0.0.50:8000"

$(function () {
   $("#upload").click(function () {
       var fileObj = document.getElementById("cameraInput").files[0]; 
       if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
           alert("Please select photo!");
           return;
       }
       var formFile = new FormData();
       formFile.append("action", "UploadVMKImagePath");  
       formFile.append("file", fileObj); 


       var data = formFile;
       $.ajax({
           url: host+"/upload",
           data: data,
           type: "Post",
           dataType: "json",
           cache: false,
           processData: false,
           contentType: false, 
           success: function (result) {
                alert("upload success!");
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("upload failed!");
                alert("XMLHttpRequest.status:", XMLHttpRequest.status);
                alert(textStatus);
           }
       })
   })

   $("#download").click(function () {
       $.ajax({
           url: host +"/show",
           type: "Get",
           dataType: "json",
           cache: false,
           processData: false,
           contentType: false, 
           success: function (data, textStatus) {
                alert("download success!");
                console.log(textStatus);
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("download failed!");
                alert("XMLHttpRequest.status:", XMLHttpRequest.status);
                alert(textStatus);
           }
       })
   })
})
