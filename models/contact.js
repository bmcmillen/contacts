var mongoose = require('mongoose');

module.exports = mongoose.model('Contact', {        // Create a model called Contact and export it
	firstName: String,
	lastName: String,
	email: String,
	created: Date,
	updated: Date,
	phone: String,
	photo: String,
	notes: String,
    category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'}   // category is an ObjectId that references the Category model
});
