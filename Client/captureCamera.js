function getUserMedia(constraints, success, error) {
  	if (navigator.mediaDevices.getUserMedia) {
  	// standard
	navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
	} else if (navigator.webkitGetUserMedia) {
	// webkit
	navigator.webkitGetUserMedia(constraints,success, error)
	} else if (navigator.mozGetUserMedia) {
	// firfox
	navigator.mozGetUserMedia(constraints, success, error);
	} else if (navigator.getUserMedia) {
	//old version API
	navigator.getUserMedia(constraints, success, error);
	}
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function success(stream) {
	let CompatibleURL = window.URL || window.webkitURL;

	console.log(stream);
	//video.src = CompatibleURL.createObjectURL(stream);
	video.srcObject = stream;
	video.play();
}

function error(error) {
	console.log(`Failed to call the user media ${error.name}, ${error.message}`);
}

if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	// to debug it on PC
	getUserMedia({video : {width: 480, height: 320}}, success, error);
	// to use it on mobile
	//getUserMedia({video : {facingMode: {exact : 'environment'}}}, success, error);
} 
else {
	alert('Unsupport User!');
}

document.getElementById('capture').addEventListener('click', function () {
	context.drawImage(video, 0, 0, 480, 320);      
})





// use a loop to refresh canvas
var lastTime = Date.now();
var deltaTime;
var recordPath = new Path2D();
function gameloop(){
    var now = Date.now(); 
    deltaTime = now - lastTime; 
    console.log('deltaTime');
    lastTime = now;
    context.drawImage(video, 0, 0, 480, 320);
    context.stroke(recordPath);
    window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);