// handle draw events on canvas
// mouse events
canvas.addEventListener("mousedown",doMouseDown,false);
canvas.addEventListener('mousemove', doMouseMove,false);
canvas.addEventListener('mouseup', doMouseUp, false);
// touch events
canvas.addEventListener('touchstart', doTouchStart, false);
canvas.addEventListener('touchmove', doTouchMove, false);
canvas.addEventListener('touchend', doTouchEnd, false);

var started = false;
var x = 0, y = 0;
var strokeType = "line";

function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height)
			};
}

function doMouseDown(event) {
	var x = event.pageX;
	var y = event.pageY;
	var canvas = event.target;
	var loc = getPointOnCanvas(canvas, x, y);
	console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
	if (strokeType == "line")
	{
		recordPath.moveTo(loc.x, loc.y);
	}
	started = true;
}

function doMouseMove(event) {
	var x = event.pageX;
	var y = event.pageY;
	var canvas = event.target;
	var loc = getPointOnCanvas(canvas, x, y);
	if (started) 
	{
		if (strokeType == "line")
		{
			recordPath.lineTo(loc.x, loc.y);
			context.stroke(recordPath);
		}
		//context.stroke();
	}
}

function doMouseUp(event) {
	console.log("mouse up!");
	if (started)
	{
		doMouseMove(event);

		if (strokeType == "dot")
		{
			var x = event.pageX;
			var y = event.pageY;
			var canvas = event.target;
			var loc = getPointOnCanvas(canvas, x, y);
			
			context.beginPath();
			context.arc(loc.x, loc.y, 10, 0, 2*Math.PI);
			context.stroke(recordPath);
		}

		//recordPath.closePath();
		started = false;
	}
	
}

function doTouchStart(event) {
	console.log("touch start!");
	document.getElementById("demo").innerHTML = "touch start!";
	if (event.targetTouches.length == 1) {	// only one finger
		event.preventDefault();
		var touch = event.targetTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var canvas = event.target;
		var loc = getPointOnCanvas(canvas, x, y);
		console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
		document.getElementById("demo").innerHTML = "mouse down at point( x:" + loc.x + ", y:" + loc.y + ")";
		recordPath.moveTo(loc.x, loc.y);
		started = true;
	}
}

function doTouchMove(event) {

	if (event.targetTouches.length == 1) {	// only one finger
		event.preventDefault();
		var touch = event.targetTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var canvas = event.target;
		var loc = getPointOnCanvas(canvas, x, y);
		if (started) 
		{
			recordPath.lineTo(loc.x, loc.y);
			//context.stroke();
		}
	}
}

function doTouchEnd(event) {
	console.log("touch end!");
	if (event.targetTouches.length == 1) {	// only one finger
		event.preventDefault();
		if (started)
		{
			doTouchMove(event);
			started = false;
		}
	}
	
	
}