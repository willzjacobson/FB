'use strict';

var Promise = require('bluebird');
var chalk = require('chalk');
var mongoose = require('mongoose');
Promise.promisify('bluebird');

mongoose.connect('mongodb://localhost/fb');
var db = mongoose.connection;

require('./models');

var startDbPromise = new Promise(function(resolve, reject) {
	db.on('open', resolve);
	db.on('error', reject);
});

console.log(chalk.yellow('Attempting to open database...'));
startDbPromise().then(function() {
	console.log(chalk.green('Database connection opened!'));
});

module.exports = startDbPromise;