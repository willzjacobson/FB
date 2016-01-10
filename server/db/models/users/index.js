var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	first: {
		type: String,
		required: true
	},
	last: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		required: true
	},
	friends: [{
		type: Schema.Types.ObjectId,
		ref: User
	}],
	desiredFriends: [{
		type: Schema.Types.ObjectId,
		ref: User
	}],
	friendRequests: [{
		type: Schema.Types.ObjectId,
		ref: User
	}],
	hobbies: [String]
});

schema.virtual('full').get(function() {
	return this.first + " " + this.last;
});

schema.set('toJSON', { virtuals: true });
var User = mongoose.model('User', schema);
// 1;: 5691d8800f0cf7203286fa16
// 2: 5691d8990dcab6253209a7c4
// 3: 5691d8a70dcab6253209a7c5