var router = require('express').Router();
module.exports = router;
var User = require('mongoose').model('User');

router.get('/', function(req, res, next) {
	User.find({})
	.then(function(users) {
		res.status(200).json(users);
	})
	.then(null, next);
});

router.post('/', function(req, res, next) {
	User.create(req.body)
	.then(function(newUser) {
		res.status(201).json(newUser);
	})
	.then(null, next);
});

router.param('userId', function(req, res, next, id) {
	User.findById(id)
	.then(function(user) {
		if (!user) throw new Error('User not found.');
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.get('/:userId', function(req, res, next) {
	res.status(200).json(req.requestedUser);
});

router.put('/:userId', function(req, res, next) {
	req.requestedUser.set(req.body);
	req.requestedUser.save()
	.then(function(updatedUser) {
		res.status(200).json(updatedUser);
	})
	.then(null, next);
});

router.delete('/:userId', function(req, res, next) {
	req.requestedUser.remove()
    .then(function(){
    	res.status(204).end();
    })
    .then(null, next);
});

router.put('/:userId/request/:friendId', function(req, res, next) {
	var id = req.requestedUser._id;
	var friendId = req.params.friendId;
	User.findById(friendId)
	.then(function(friend) {
		if (!friend) throw new Error('Friend not found');

		if (req.requestedUser.desiredFriends.indexOf(friendId) < 0 &&
			friend.friendRequests.indexOf(id) < 0) {
			req.requestedUser.desiredFriends.push(friendId);
			friend.friendRequests.push(id);
		}
		return friend.save();
	})
	.then(function() {
		return req.requestedUser.save();
	})
	.then(function(updatedUser) {
		res.status(200).json(req.requestedUser);
	})
	.then(null, next);
});

router.put('/:userId/confirm/:friendId', function(req, res, next) {
	var id = req.requestedUser._id;
	var friendId = req.params.friendId;
	User.findById(friendId)
	.then(function(friend) {
		if (!friend) throw new Error('Friend not found');

		var fIndex = friend.desiredFriends.indexOf(id);
		var index = req.requestedUser.friendRequests.indexOf(friendId);
		
		if (fIndex >= 0 && index >=0) {
			friend.desiredFriends.splice(fIndex,1);
			friend.friends.push(id);

			req.requestedUser.friendRequests.splice(index,1);
			req.requestedUser.friends.push(friendId);
		}
		return friend.save();
	})
	.then(function() {
		return req.requestedUser.save();
	})
	.then(function(updatedUser) {
		res.status(200).json(updatedUser);
	})
	.then(null, next);
});

router.put('/:userId/unfriend/:friendId', function(req, res, next) {
	var id = req.requestedUser._id;
	var friendId = req.params.friendId;
	User.findById(friendId)
	.then(function(friend) {
		if (!friend) throw new Error('Friend not found');
		var fIndex = friend.friends.indexOf(id);
		var index = req.requestedUser.friends.indexOf(friendId);
		if (fIndex >= 0 && index >= 0) {
			friend.friends.splice(fIndex, 1);
			req.requestedUser.friends.splice(index, 1);
		}
		return friend.save();
	})
	.then(function() {
		return req.requestedUser.save();
	})
	.then(function(updatedUser) {
		res.status(200).json(updatedUser);
	})
	.then(null, next);
});


