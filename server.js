var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/brian');		// Connect to the contacts database
mongoose.Promise = Promise;								// Tell mongoose to our ES6 promises

var app = express();
app.use(bodyParser());									// bodyParser will parse POST request body into req.body
app.use(express.static('./public'));					// Serve our static content

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Listening at http://localhost:'+port);
});

var Contact = require('./models/Contact');
var Category = require('./models/Category');

// function initCategories() {                            // This function first checks if data exists and adds it if it doesn't
//     return Category.count().then(function(count) {     // Count how many categories are in our database
//         if(count) return;                              // If even one exists, don't create anymore and bail out.
//
//         var categories = [                             // Define our list of categories that we want inserted
//             {name:'Family'},
//             {name:'Friends'},
// 			{name:'Business'}
//         ];
//
//         categories.forEach(function(category) {      // Loop through each element
//             category = new Category(category);       // Create a document from our model
//             return category.save();                  // Save the document
//         });
//     });
// }
// initCategories();


app.get('/contacts', function(req,res) {
	Contact.find().populate('category').sort({lastName:-1}).exec().then(function(contacts) {
		res.json(contacts);
	});
});

app.get('/categories', function(req,res) {
   Category.find().populate('category').sort({name:-1}).exec().then(function(categories) {
	   res.json(categories);
   });
});

app.post('/contacts', function(req,res) {
	var contact = req.body;
	if(contact._id) {
		Contact.findOneAndUpdate({_id:contact._id}, contact).exec().then(function() {
			res.json(true);
		});
	} else {
		var newContact = new Contact(contact);
		newContact.save().then(function() {
			res.json(true);
		});
	}
});

app.delete('/contacts/:id', function(req,res) {
	var id = req.params.id;
	Contact.findOneAndRemove({_id:id}).exec().then(function() {
		res.json(true);
	});
});
