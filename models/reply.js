var mongoose = require("mongoose");
var Movie = require("../models/data.js");
var Comment = require("../models/comments.js");

var repliesSchema = mongoose.Schema ({
	CommentID : {type : mongoose.Schema.ObjectId, ref : "Comment"},
	User    : String,
	Reply : String,
	Date    : Date,
})

module.exports = mongoose.model("Reply", repliesSchema);