document.getElementById('capture').addEventListener('click', handleCapture);
document.getElementById('change').addEventListener('click', handleChange);
document.getElementById('clear').addEventListener('click', handleClear);
document.getElementById('upload').addEventListener('click', handleUpload);

function handleCapture () {
	console.log("capture!");
	document.getElementById('cameraInput').click();
}

function handleChange () {
	console.log("change!");
	
}

function handleClear () {
	console.log("clear!");
	recordPath = new Path2D();
}

function handleUpload () {
	console.log("upload!");
	var canvas = document.getElementById("canvas");
	var base64Data = canvas.toDataURL("image/jpeg", 1.0);
	var blob = dataURItoBlob(base64Data);
	var formData = new FormData();
    formData.append("fileData", blob);
    formData.append("fileName", "test");
    //console.log(base64Data)

    var xmlHttp = new XMLHttpRequest();
    var url = "comp-ic-0014.aci.ics.psu.edu/test.jpg";
    xmlHttp.open("POST", url);
    xmlHttp.setRequestHeader("content-type", "multipart/form-data");
    xmlHttp.send(base64Data);
    //ajax 
    xmlHttp.onreadystatechange = () => {
        //todo  your code...
        if (this.readyState == 4){
        	console.log("upload success!");
    	};
    }

}

function dataURItoBlob (base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
    else
        byteString = unescape(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
};
