var express = require('express');
var app = express();
var ejs = require('ejs');
var url = require('url');
var router = require("./router");
var bodyParser = require('body-parser');

function start() {
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


    app.listen(8080);
    console.log("Server start and listening on port 8080");
}

exports.start = start;