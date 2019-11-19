document.getElementById("video").controls = false;
document.getElementById("canvas").width = window.innerWidth;
document.getElementById("canvas").height = window.innerHeight;

window.addEventListener('resize', function(){
		onResize()
	})

function onResize(){
	document.getElementById("canvas").width = window.innerWidth;
	document.getElementById("canvas").height = window.innerHeight;
}

