var socket;
var red,blue,green;
var longitude;
var url='192.168.1.125';
var port=8000
//var url='http//47.18.216.182';
//$(document).ready(function(){
	socket = io.connect(url+':'+port);
	socket.on('toScreen', function (data) {
		console.log(data);
		document.getElementById("buttonOutput").style.backgroundColor = "green";
		document.getElementById("distanceOutput").style.width = "data.sensor%";

		if(data.button == 1) {
    	location.reload();
  	}
		// red = data.r;
		// blue = data.g;
		// green = data.b;
		// document.body.style.backgroundColor = 'rgb(' + data.r + ',' + data.g + ',' + data.b + ')';
	});
//});
//When color button is clicked emit data to socket
// function toColor(){
// 	var rval = document.getElementById('rval').value;
// 	var gval = document.getElementById('gval').value;
// 	var bval = document.getElementById('bval').value;
// 	socket.emit('toColor', { r: rval, g: gval, b:bval });
// }

