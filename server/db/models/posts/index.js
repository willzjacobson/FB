var Schema = require('mongoose').Schema;

var schema = new Schema({
	updated: {
		type: Date,
		default: Date.now
	},
	to: {
		type: Mongoose.Types.ObjectId,
		ref: User
	},
	from: {
		type: Mongoose.Types.ObjectId,
		ref: User
	},
	text: {
		type: String,
		maxlength: 100
	}
});

schema.pre('save', function(next) {
	this.text.replace('fuck', 'fudge');
	this.text.replace('shit', 'poop');
});

mongoose.model('Post', schema);