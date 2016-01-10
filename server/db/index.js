'use strict';

var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var db = mongoose.connect('mongodb://localhost/fb').connection;

require('./models');

var startDbPromise = new Promise(function(resolve, reject) {
	db.on('open', resolve);
	db.on('error', reject);
});

console.log(chalk.yellow('Attempting to open database...'));
startDbPromise.then(function() {
	console.log(chalk.green('Database connection opened!'));
}, function(err) {
	console.log(chalk.red('database error:', err.message));
});

module.exports = startDbPromise;