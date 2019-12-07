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
            drawImageOnCanvas(canvas, img);
        }
        
    }
}

function drawImageOnCanvas(canvas,img) {
    var context = canvas.getContext('2d');
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


// AJAX + jQuery part 
var host = "http://10.0.0.50:8000";
var userName = "alexis";

$(function () {
   $("#upload").click(function () {
        // get the ip from textbox
        var ip = document.getElementById("serverIp").value;
        //console.log("ip:",ip);
        if (ip != "")
            host = "http://"+ip+":8000";
        console.log("host:", host);

        // alert(host);
        // get the user name
        var name = document.getElementById("userName").value;
        if (name != "")
            userName = name;

        // get the image object
        var img = document.getElementById("cameraInput").files[0]; 
        if (typeof (img) == "undefined" || img.size <= 0) {
            alert("Please select photo!");
            return;
        }

        // get the image name
        var image_name = "test.png"
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function(e){
            var image_base64 = e.target.result;
            
            var data = {
                "name": image_name,
                "image_base64": image_base64,
                "user": userName,
                "label": recordLabels
            };

            console.log(data);
            $.ajax({
                url: host+"/upload",
                data: JSON.stringify(data),
                type: "Post",
                dataType: "json",
                cache: false,
                processData: false,
                async: true,
                contentType: "application/json", 
                success: function (result) {
                    alert("upload success!");
                    console.log(result)
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("upload failed!");
                    alert(XMLHttpRequest.status);
                    //alert(textStatus);
               }
            })
        }
        //console.log(image_base64);
        
        // alert("sometest");
   })

   $("#download").click(function () {
        var ip = document.getElementById("serverIp").value;
        if (ip != "")
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
            crossDomain: true,
            success: function (data, textStatus) {
                alert("download success!");
                console.log("textStatus:", textStatus);
                //console.log(data.image_base64);
                
                //decode the image and show it on canvas
                var img = new Image();
                img.src = "data:image;base64," + data.image_base64;
                // console.log(img);
                img.onload = function() {
                    drawImageOnCanvas(canvas, img);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("download failed!");
                console.log("textStatus:", textStatus);
           }
       })
   })

})
