'use strict';

var c = document.getElementById("whiteboard");
var ctx = c.getContext("2d");
var socket = io();

c.addEventListener('click', function (e) {
	var params = {
		1:2
	};
	
	socket.emit('draw', params);
});

socket.on('draw', function (params) {
	console.log("message: " + params);
});