var Movie = require("../models/data.js");

function search (req, res) {
    console.log(req.body.search)
    var searchQuery = new RegExp(req.body.search + '+', 'i')
    
    Movie.find({ Title : {$regex : searchQuery}}, function (err, docs) {
        res.send(docs)
        console.log(docs, err)
    }
    )
};

module.exports = {
	search : search,
};