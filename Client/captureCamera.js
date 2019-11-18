function getUserMedia(constraints, success, error) {
  	if (navigator.mediaDevices.getUserMedia) {
	//最新的标准API
	navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
	} else if (navigator.webkitGetUserMedia) {
	//webkit核心浏览器
	navigator.webkitGetUserMedia(constraints,success, error)
	} else if (navigator.mozGetUserMedia) {
	//firfox浏览器
	navigator.mozGetUserMedia(constraints, success, error);
	} else if (navigator.getUserMedia) {
	//旧版API
	navigator.getUserMedia(constraints, success, error);
	}
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function success(stream) {
	//兼容webkit核心浏览器
	let CompatibleURL = window.URL || window.webkitURL;
	//将视频流设置为video元素的源
	console.log(stream);

	//video.src = CompatibleURL.createObjectURL(stream);
	video.srcObject = stream;
	video.play();
}

function error(error) {
	console.log(`Failed to call the user media ${error.name}, ${error.message}`);
}

if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	getUserMedia({video : {facingMode: {exact : 'environment'}}}, success, error);
} 
else {
	alert('Unsupport User!');
}

document.getElementById('capture').addEventListener('click', function () {
	context.drawImage(video, 0, 0, 480, 320);      
})