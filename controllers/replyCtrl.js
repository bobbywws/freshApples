var mongoose = require("mongoose");
var Comment = require("../models/comments.js");
var Movie = require("../models/data.js");
var ObjectId = require('mongoose').Types.ObjectId;
var Reply = require("../models/reply.js");

function createReply (req, res) {
	var newReply = new Reply({
		CommentID : req.body.commentID,
		User    : req.body.User,
		Reply : req.body.Reply,
		Date    : req.body.Date,
	})
		newReply.save(function(err, savedReply) {
			if (err) {
			console.log("Error!", err)
			}
			else {
			console.log("Success", savedReply)
			console.log(req.body.commentID)	
			res.send(savedReply)
    		Comment.update({_id: req.body.commentID}, {$push: {"Reply": savedReply}})
    		}
	})		
};

function getReplies (req, res) {
	if (req.params.movieID) {
		console.log(req.params)
		Comment.find({ CommentID : new ObjectId(req.params.commentID)}, function(err, doc) {
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
	createReply : createReply,
	getReplies : getReplies
};