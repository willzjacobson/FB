var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
var chalk = require('chalk');
var private = require('../private');

app.listen(3001, function() {
	console.log(chalk.magenta('estamos oyendo en el puerto 3001'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

app.use(session({
	secret: private.sessionSecret
}));

app.use('/', express.static('./node_modules'));
app.use('/', express.static('./browser'));
app.use('/', express.static('./browser/public'));
app.use('/', express.static('./server'));

require('./db');

app.use('/', require('./routes'));

app.use('/', function(req, res, next) {
	console.log('session is:', req.session);
	next();
});

app.use('/', function(err, req, res, next) {
	if (err) console.error(err);
	res.status(err.status || 500).send(err.message || "Internal Server Error");
});

module.exports = app;