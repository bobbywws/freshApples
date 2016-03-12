var Movie = require("../models/data.js");

function search (req, res) {
    console.log(req.body.search)
    Movie.find({ Title : req.body.search}, function (err, docs) {
        res.send(docs)
        console.log(docs, err)
    })
};

function searchActors (req, res) {
    console.log(req.body.search)
    Movie.find({ Actors : req.body.search}, function (err, docs) {
        res.send(docs)
        console.log(docs, err)
    })
};

function searchDirectors (req, res) {
    console.log(req.body.search)
    Movie.find({ Director : req.body.search}, function (err, docs) {
        res.send(docs)
        console.log(docs, err)
    })
};

module.exports = {
	search : search,
    searchActors : searchActors,
    searchDirectors : searchDirectors
};