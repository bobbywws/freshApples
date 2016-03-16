var mongoose = require("mongoose");
var Movie = require("../models/data.js");
var Reply = require("../models/reply.js");

var commentsSchema = mongoose.Schema({
	MovieID : {type : mongoose.Schema.ObjectId, ref : "Movie"},
	User    : String,
	Comment : String,
	Rating  : Number,
	Date    : Date,
	Reply   : {type : mongoose.Schema.ObjectId, ref : "Reply"},
});

module.exports = mongoose.model("Comment", commentsSchema);