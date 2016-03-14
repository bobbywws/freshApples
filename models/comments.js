var mongoose = require("mongoose");

var commentsSchema = mongoose.Schema({
	User    : {type : mongoose.Schema.ObjectId, ref : "User"},
	Body    : String,
});

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = {Comment : mongoose.model("Comment", commentsSchema), User : mongoose.model("User", userSchema)};