'use strict';

var c = document.getElementById('whiteboard');
var ctx = c.getContext('2d');
var socket = io();
var shape = 'circle';

c.addEventListener('click', function (e) {
	var params = {
		shape: shape,
		initialCoord: {
			x: 55,
			y: 55
		},
		finalCoord: {
			x: 66,
			y: 66
		}
	};
	
	socket.emit('draw', params);
});

document.getElementById('circleButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = 'clicked';
	document.getElementById('lineButton').className = '';
	document.getElementById('squareButton').className = '';
	shape = 'circle';
	// console.log('Clicked circle button');
});

document.getElementById('lineButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = '';
	document.getElementById('lineButton').className = 'clicked';
	document.getElementById('squareButton').className = '';
	shape = 'line';
	// console.log('Clicked line button');
});

document.getElementById('squareButton').addEventListener('click', function (e) {
	document.getElementById('circleButton').className = '';
	document.getElementById('lineButton').className = '';
	document.getElementById('squareButton').className = 'clicked';
	shape ='square';
	// console.log('Clicked square button');
});

document.getElementById('clear').addEventListener('click', function (e) {
	console.log('Clear Canvas');
});

socket.on('draw', function (params) {
	console.log(params);
});