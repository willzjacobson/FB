var Schema = require('mongoose').Schema;

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
		enum: ['male', 'femail', 'other'],
		required: true
	},
	friends: [{
		type: Schema.Types.ObjectId,
		ref: User
	}],
	hobbies: [String]
});

schema.virtuals('full').get(function() {
	return this.first + " " + this.last;
});

schema.set('toJSON', { virtuals: true });
mongoose.model('User', schema);
