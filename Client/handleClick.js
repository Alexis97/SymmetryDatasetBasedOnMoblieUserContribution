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
           url: "http://127.0.0.1:8000/upload",
           data: data,
           type: "Post",
           dataType: "json",
           cache: false,
           processData: false,
           contentType: false, 
           success: function (result) {
               alert("upload success!");
           },
       })
   })

   $("#download").click(function () {
       $.ajax({
           url: "http://127.0.0.1:8000/download",
           type: "Get",
           dataType: "json",
           cache: false,
           processData: false,
           contentType: false, 
           success: function (result) {
               alert("download success!");
               console.log(result);
           },
       })
   })
})
