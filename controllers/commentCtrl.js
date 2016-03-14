var DB = require("../models/comments.js");

function createComment (req, res) {
	var comment = new DB.Comment(req.body)
		comment.save(function(err, savedComment) {
			if (err) {
			console.log("Error!", err) }
			else {
			console.log("Success", savedComment)	
			res.send(savedComment)}
	})
};

function getComments (req, res) {
	if(req.params.commentID) {
		DB.Comment.findOne({_id : req.params.commentID}, function(err, doc) {
			res.send(doc)
		})
	} else {
		DB.Comment.find({}, function(err, doc) {
			res.send(doc)
		})
	}
};

module.exports = {
	createComment : createComment,
	getComments : getComments
};