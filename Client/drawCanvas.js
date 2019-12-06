// handle draw events on canvas
// mouse events
canvas.addEventListener("mousedown",doMouseDown,false);
canvas.addEventListener('mouseup', doMouseUp, false);
// touch events
canvas.addEventListener('touchstart', doTouchStart, false);
//canvas.addEventListener('touchend', doTouchEnd, false);

var clicked = false, isStart = false;
var x = 0, y = 0;
var start, end;
var strokeType = "line";

function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height)
			};
}

function drawLine(context, start, end, type = "solid") {
	context.beginPath();
	context.moveTo(start.x,start.y);
	context.lineTo(end.x,end.y);

	switch(type)
	{
		case "solid":
			context.lineWidth = 2;
			context.strokeStyle = "red";
			// record this label
			recordLabels.push({type:"reflection", startPos: start, endPos: end});
			break;
	}
	context.stroke();

	
}

function drawShape(context, loc, type = "circle") {
	switch(type)
	{
		case "circle":
			var radius = 3;
			context.beginPath();
			context.arc(loc.x,loc.y, radius, 0, 2*Math.PI);
			context.fillStyle = "red";
			context.fill();
			// record this label
			recordLabels.push({type:"rotation", centerPos: loc, foldNum: 2});
	}
	
}

function doMouseDown(event) {
	clicked = true;
}

function doMouseUp(event) {
	if (clicked)
	{
		var x = event.pageX;
		var y = event.pageY;
		var loc = getPointOnCanvas(canvas, x, y);

		switch (strokeType)
		{
			case "line":		
				if (isStart)
				{	
					end = loc; 
					console.log("End: click at point( x:" + loc.x + ", y:" + loc.y + ")");
					drawLine(context, start, end, "solid");

					isStart = false;
				}
				else
				{
					start = loc; 
					console.log("Start: click at point( x:" + loc.x + ", y:" + loc.y + ")");
					isStart = true;
				}
				break;
			case "dot":
				drawShape(context, loc, "circle");
				console.log("Dot: click at point( x:" + loc.x + ", y:" + loc.y + ")");
				break;

		}
		clicked = false;
	}
	
}

var demoText = document.getElementById("demo").innerHTML;
function doTouchStart(event) {
	if (event.targetTouches.length == 1) {	// only one finger
		event.preventDefault();
		var touch = event.targetTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var canvas = event.target;
		var loc = getPointOnCanvas(canvas, x, y);
		//var loc = {x:x, y:y};
		switch (strokeType)
		{
			case "line":		
				if (isStart)
				{	
					end = loc; 
					console.log("End: click at point( x:" + loc.x + ", y:" + loc.y + ")");
					drawLine(context, start, end, "solid");

					isStart = false;
				}
				else
				{
					start = loc; 
					console.log("Start: click at point( x:" + loc.x + ", y:" + loc.y + ")");
					isStart = true;
				}
				break;
			case "dot":
				drawShape(context, loc, "circle");
				demoText = "Dot: click at point( x:" + loc.x + ", y:" + loc.y + ")";
				break;

		}
	}
}
