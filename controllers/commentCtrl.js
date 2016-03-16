var mongoose = require("mongoose");
var Comment = require("../models/comments.js");
var Movie = require("../models/data.js");
var ObjectId = require('mongoose').Types.ObjectId; 
var Reply = require("../models/reply.js");

function createComment (req, res) {
	var newComment = new Comment({
		MovieID : req.body.movieID,
		User    : req.body.User,
		Comment : req.body.Comment,
		Rating  : req.body.Rating,
		Date    : req.body.Date,
	})
    	// newComment.created = Date.now()
		newComment.save(function(err, savedComment) {
			if (err) {
			console.log("Error!", err)
			}
			else {
			console.log("Success", savedComment)
			console.log(req.body.movieID)	
			res.send(savedComment)
    		Movie.update({_id: req.body.movieID}, {$push: {"Comments": savedComment}})
    		}
	})		
};

function getComments (req, res) {
	if (req.params.movieID) {
		console.log(req.params)
		Comment.find({ MovieID : new ObjectId(req.params.movieID)}, function(err, doc) {
			res.send(doc)
		})
	}
	else {
		Comment.find({}, function(err, doc) {
			console.log("Params not working")
			res.send(doc)
		})
	}
};


module.exports = {
	createComment : createComment,
	getComments : getComments
};