var Movie = require("../models/data.js");

function createMovie (req, res) {
	var movie = new Movie({
		Title    : req.body.Title,
		Year     : +req.body.Year,
		Rated    : req.body.Rated,
		Released : req.body.Released,
		Runtime  : req.body.Runtime,
		Genre    : req.body.Genre,
		Director : req.body.Director,
		Actors   : req.body.Actors,
		Plot     : req.body.Plot,
		Poster   : req.body.Poster,
	})
		movie.save(function(err, savedMovie) {
			if (err) {
			console.log("Error!", err) }
			else {
			console.log("Success", savedMovie)	
			res.send(savedMovie)}
	})
};

function getMovies (req, res) {
	if(req.params.movieID) {
		Movie.findOne({_id : req.params.movieID}, function(err, doc) {
			res.send(doc)
		})
	} else {
		Movie.find({}, function(err, doc) {
			res.send(doc)
		})
	}
};

module.exports = {
	createMovie : createMovie,
	getMovies : getMovies
};