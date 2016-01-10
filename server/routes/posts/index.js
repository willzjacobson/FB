var router = require('express').Router();
module.exports = router;
var Post  = require('mongoose').model('Post');


router.get('/user/:userId', function(req, res, next) {
	Post.find({'to': req.params.userId})
	.then(function(postsToUser) {
		res.status(200).json(postsToUser);
	})
	.then(null, next);
});

router.post('/from/:userId/to/:friendId', function(req, res, next) {
	Post.create({
		to: req.params.friendId,
		from: req.params.userId,
		text: req.body.text
	})
	.then(function(post) {
		res.status(201).json(post);
	})
	.then(null, next);
});

router.param('/:postId', function(req, res, next) {
	Post.findById(req.params.postId)
	.then(function(post) {
		if (!post) throw new Error('Post not found!');
		req.post = post;
		next();
	})
	.then(null, next);
});

router.put('/:postId', function(req, res, next) {
	req.post.text = req.body.text;
	req.post.save()
	.then(function(updatedPost) {
		res.status(200).json(updatedPost);
	})
	.then(null, next);
});

router.delete('/:postId', function(req, res, next) {
	req.post.remove()
	.then(function() {
		res.status(204).end();
	})
	.then(null, next);
});


