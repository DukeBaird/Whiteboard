var express = require('express');
var app = express();
var ejs = require('ejs');
var url = require('url');
var router = require("./router");
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);    

function start() {

    app.set('port', (process.env.PORT || 8080));

    app.engine('.ejs', ejs.__express);

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());

    app.get('/', router.route);
    app.get('/:page', router.route);
    app.get('/:page/:page2', router.route);
    app.get('/:page/:page2/:page3', router.route);
    app.get('/:page/:page2/:page3/:page4', router.route);

    app.post('/:page', router.route);
    app.post('/:page/:page2', router.route);


    http.listen(app.get('port'), function() {
      console.log('Server running on localhost:' + app.get('port'));
    });

    io.on('connection', function (socket) {
        socket.on('draw', function (params) {
            io.emit('draw', params);
        });
    });

}

exports.start = start;