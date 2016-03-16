var New = require("../models/newRelease.js");

function getNews (req, res) {
	if(req.params.newID) {
		New.findOne({_id : req.params.newID}, function(err, doc) {
			res.send(doc)
		})
	} else {
		New.find({}, function(err, doc) {
			res.send(doc)
		})
	}
};

module.exports = {
	getNews : getNews,
}