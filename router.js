var url = require("url");

handle = {};

function route(req, res) {

    var pathname = url.parse(req.url).pathname;
    var path = "/" + req.params.page;

    // console.log(path);
    // console.log("Routing to " + pathname);


    if (typeof (handle[path]) === 'function') {
        handle[path](req, res, pathname);
    } else if (pathname === '/') {
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