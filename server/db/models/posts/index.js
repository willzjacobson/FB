var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	posted: {
		type: Date,
		default: Date.now
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: mongoose.model('User')
	},
	from: {
		type: Schema.Types.ObjectId,
		ref: mongoose.model('User')
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
