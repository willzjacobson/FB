var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	userName: {
		type: String,
		unique: true
	},
	password: String,
	salt: String,
	first: {
		type: String,
		required: true
	},
	last: {
		type: String,
		required: true
	},
	semiPrivateInfo: String,
	privateInfo: String,
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
