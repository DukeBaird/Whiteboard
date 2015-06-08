var url = require("url");
var MongoClient = require('mongodb').MongoClient;

handle = {};

function route(req, res) {

    var pathname = url.parse(req.url).pathname;
    var path = "/" + req.params.page;

    if (typeof (handle[path]) === 'function') {
        handle[path](req, res, pathname);
    } else if (pathname === '/') {

        // console.log("testing mongodb");
        // MongoClient.connect("mongodb://localhost:27017/testdb", function(err, db) {
        //   if (!err) {
        //     console.log("connected!");

        //     var collection = db.collection('test');

        //     collection.insert({
        //       'hello': 'test'
        //     }, function(err, result) {
        //         if (err) {
        //           console.log(err);
        //         } else {
        //           console.log(result);
        //           console.log('no err');

        //           collection.find({
        //             'hello': 'test'
        //           }).toArray(function(err, item) {
        //             if (err) {
        //               console.log(err);
        //             } else {
        //               console.log(item);
        //             }
        //           });
        //         }
        //       });

        //   } else {
        //     console.log(err);
        //   }
        // });

        res.render('index', {
            pageTitle: "Home"
        });
    } else {
        res.render('404', {
            pageTitle: "404 - Page Not Found"
        });
    }
}

exports.route = route;
