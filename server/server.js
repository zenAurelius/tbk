var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
//var mongodb = require("mongodb");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "content-type, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});