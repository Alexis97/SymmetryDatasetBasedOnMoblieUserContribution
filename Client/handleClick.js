document.getElementById('capture').addEventListener('click', handleCapture);
document.getElementById('change').addEventListener('click', handleChange);
document.getElementById('clear').addEventListener('click', handleClear);
//document.getElementById('upload').addEventListener('click', handleUpload);

var imgfile;
var recordLabels = new Array();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function changePic () {
    imgfile = document.getElementById("cameraInput").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imgfile);
    reader.onload = function(e){
        var img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            // console.log(img.width, img.height);
            // resize img
            var new_w = img.width, new_h = img.height;
            if (img.width > canvas.width)
            {
                new_w = canvas.width;
                new_h = img.height/img.width *new_w;
            }
            if (new_h > canvas.height)
            {
                new_h = canvas.height;
                new_w = img.width/img.height *new_h;
            }
            // console.log(new_w, new_h);
            // clear the canvas
            context.clearRect(0,0,canvas.width, canvas.height)
            context.drawImage(img, 0,0, new_w,new_h);
        }
        
    }
}


function handleCapture () {
	console.log("capture!");
	document.getElementById('cameraInput').click();
    
}

function handleChange () {
	
	switch (strokeType)
    {
        case "line":
            strokeType = "dot";
            console.log("change to:", strokeType);
            break;
        case "dot":
            strokeType = "line";
            console.log("change to:", strokeType);
            break;
    }
}

function handleClear () {
	console.log("clear!");
	changePic();
    recordLabels = new Array();
}

var host = "http://10.0.0.50:8000"

$(function () {
   $("#upload").click(function () {
        // get the ip from textbox
        var ip = document.getElementById("serverIp").value;
        host = "http://"+ip+":8000";
        console.log("host:", host);

        var imgObj = document.getElementById("cameraInput").files[0]; 
        if (typeof (imgObj) == "undefined" || imgObj.size <= 0) {
            alert("Please select photo!");
            return;
        }
        var formFile = new FormData();
        formFile.append("action", "UploadVMKImagePath");  
        formFile.append("file", imgObj); 
        formFile.append()

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

        // also post the label
        console.log(recordLabels);
   })

   $("#download").click(function () {
        var ip = document.getElementById("serverIp").value;
        host = "http://"+ip+":8000";
        console.log("host:", host);

        $.ajax({
            url: host+"/show",
            type: "Get",
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false, 
            async: true,
            headers: {
                "cache-control": "no-cache"
            },
            crossDomain: true,
            success: function (data, textStatus) {
                alert("download success!");
                console.log(textStatus);
                console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("download failed!");
                //alert("XMLHttpRequest.status:", XMLHttpRequest.status);
                //alert(textStatus);
           }
       })
   })
})
