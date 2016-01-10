var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
var chalk = require('chalk');

app.listen(3001, function() {
	console.log(chalk.magenta('estamos oyendo en el puerto 3001'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('lololo');
});

app.use('/', express.static(__dirname + './node_modules'));
app.use('/', express.static(__dirname + './browser'));
app.use('/', express.static(__dirname + './server'));

require('./db');

app.use('/api', require('./routes'));

app.use('/', function(err, req, res, next) {
	if (err) console.error(err);
	res.status(err.status || 500).send(err.message || "Internal Server Error");
});

module.exports = app;