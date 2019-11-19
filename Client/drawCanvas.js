// handle draw events on canvas
// mouse events
canvas.addEventListener("mousedown",doMouseDown,false);
canvas.addEventListener('mousemove', doMouseMove,false);
canvas.addEventListener('mouseup', doMouseUp, false);


var started = false;
var x = 0, y = 0;
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
	recordPath.moveTo(loc.x, loc.y);
	started = true;
}

function doMouseMove(event) {
	var x = event.pageX;
	var y = event.pageY;
	var canvas = event.target;
	var loc = getPointOnCanvas(canvas, x, y);
	if (started) 
	{
		recordPath.lineTo(loc.x, loc.y);
		//context.stroke();
	}
}

function doMouseUp(event) {
	console.log("mouse up!");
	if (started)
	{
		doMouseMove(event);
		started = false;
	}
	
}