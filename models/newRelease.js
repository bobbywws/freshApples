var mongoose = require("mongoose");
var DB = require("../models/comments.js");

var newsSchema = mongoose.Schema({
	Title    : String,
	Year     : Number,
	Rated    : String,
	Released : String,
	Runtime  : String,
	Genre    : String,
	Director : String,
	Actors   : String,
	Plot     : String,
	Poster   : String,
	Comment  : [{type : mongoose.Schema.ObjectId, ref : "Comment"}], 
});

module.exports = mongoose.model("New", newsSchema);