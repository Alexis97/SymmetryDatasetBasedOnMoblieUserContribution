// set the format of all devices
//document.getElementById("video").controls = false;
document.getElementById("canvas").width = window.innerWidth;
document.getElementById("canvas").height = 0.5* window.innerHeight;
//document.getElementById("upload").height = 0.5* window.innerHeight;

window.addEventListener('resize', function(){
		onResize()
	})

function onResize(){
	document.getElementById("canvas").width = window.innerWidth;
	document.getElementById("canvas").height = 0.5* window.innerHeight;
}


window.onload=function () {
	document.addEventListener('touchstart',function (event) {
	  	if(event.touches.length>1){
	    	event.preventDefault();
	  	}
	});
	var lastTouchEnd=0;
	document.addEventListener('touchend',function (event) {
	  	var now=(new Date()).getTime();
	  	if(now-lastTouchEnd<=300){
	    	event.preventDefault();
	  	}
	  	lastTouchEnd=now;
	},false);
	document.addEventListener('gesturestart', function (event) {
	  	event.preventDefault();
	});
}
