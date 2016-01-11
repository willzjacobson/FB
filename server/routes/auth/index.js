var router = require('express').Router();
module.exports = router;
var User = require('mongoose').model('User');


router.post('/login', function(req, res, next) {
	User.findOne(req.body)
	.then(function(user) {
		if (!user) return res.status(401).send('We don\'t know you');
		req.session.userId = user._id;
		res.status(200).json(user);
	})
	.then(null, next);
});

router.post('/signup', function(req, res, next) {
	User.create(req.body)
	.then(function(newUser) {
		req.session.userId = newUser._id;
		res.status(201).json(newUser);
	})
	.then(null, next);
});

router.get('/logout', function(req, res, next) {
	delete req.session.userId;
	res.status(200).end();
});

router.get('/me', function(req, res, next) {
	User.findById(req.session.userId)
	.then(function(user) {
		res.status(200).json(user);
	})
	.then(null, next);
});




