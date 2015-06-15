'use strict';

var c = document.getElementById('whiteboard');
var ctx = c.getContext('2d');
var socket = io();
var shape = 'circle';
var isMouseDown = false;
var initialCoord = {
	x: 0,
	y: 0
}
var finalCoord = {
	x: 0,
	y: 0
}

c.addEventListener('mousemove', function (e) {
	if (isMouseDown && shape === 'marker') {

	initialCoord.x = e.x - 15;
	initialCoord.y = e.y - 15;

	var params = {
		shape: shape,
		initialCoord: initialCoord
	};

		socket.emit('draw', params);
	}
});

c.addEventListener('mousedown', function (e) {

	isMouseDown = true;
	initialCoord.x = e.x - 15;
	initialCoord.y = e.y - 15;
});

c.addEventListener('mouseup', function (e) {

	isMouseDown = false;
	finalCoord.x = e.x - 15;
	finalCoord.y = e.y - 15;

	var params = {
		shape: shape,
		initialCoord: initialCoord,
		finalCoord: finalCoord
	};
	
	socket.emit('draw', params);
});

document.getElementById('circleButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = 'clicked';
	document.getElementById('lineButton').className = '';
	document.getElementById('squareButton').className = '';
	document.getElementById('markerButton').className = '';
	shape = 'circle';
	// console.log('Clicked circle button');
});

document.getElementById('lineButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = '';
	document.getElementById('lineButton').className = 'clicked';
	document.getElementById('squareButton').className = '';
	document.getElementById('markerButton').className = '';
	shape = 'line';
	// console.log('Clicked line button');
});

document.getElementById('squareButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = '';
	document.getElementById('lineButton').className = '';
	document.getElementById('squareButton').className = 'clicked';
	document.getElementById('markerButton').className = '';
	shape = 'square';
	// console.log('Clicked square button');
});

document.getElementById('markerButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = '';
	document.getElementById('lineButton').className = '';
	document.getElementById('squareButton').className = '';
	document.getElementById('markerButton').className = 'clicked';
	shape = 'marker';

});

document.getElementById('clear').addEventListener('click', function (e) {
	console.log('Clear Canvas');
	ctx.clearRect(0, 0, c.width, c.height);
});

socket.on('draw', function (params) {
	console.log(params);

	if (params.shape === 'line') {
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.moveTo(params.initialCoord.x, params.initialCoord.y);
		ctx.lineTo(params.finalCoord.x, params.finalCoord.y);
		ctx.stroke();
	} else if (params.shape === 'square') {
		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.rect(params.initialCoord.x, params.initialCoord.y, Math.abs(params.finalCoord.x - params.initialCoord.x),
			Math.abs(params.finalCoord.y - params.initialCoord.y));
		ctx.stroke();
	} else if (params.shape === 'circle') {
		ctx.beginPath();
		ctx.strokeStyle = 'green';
		ctx.arc(params.initialCoord.x, params.initialCoord.y,
			Math.sqrt(Math.pow(params.finalCoord.x - params.initialCoord.x, 2) + Math.pow(params.finalCoord.y - params.initialCoord.y, 2)),
			0, 2 * Math.PI, false);
		ctx.stroke();
	} else if (params.shape === 'marker') {
		ctx.strokeStyle = 'green';
		ctx.beginPath();
		ctx.arc(params.initialCoord.x, params.initialCoord.y,
			5,
			0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.stroke();
	} 

});