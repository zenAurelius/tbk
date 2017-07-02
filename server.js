var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var dbProvider = require('./server/db/dbProvider');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

var router = require('./server/routes/apiRoutes');
app.use('/api', router);


dbProvider.initialize(function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	
	var server = app.listen(process.env.PORT || 3000, function () {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});
