var mongoose = require('mongoose');

var moviesSchema = mongoose.Schema({
	Title    : String,
	Year     : Number,
	Rated    : String,
	Released : String,
	Runtime  : String,
	Genre    : String,
	Director : String,
	Actors   : String,
	Plot     : String,
});

module.exports = mongoose.model('Movie', moviesSchema);