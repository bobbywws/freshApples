// Requires \\ 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"), Schema = mongoose.Schema;
var logger = require("morgan");

// Create Express App Object \\
var app = express();

// Connect Mongo \\
mongoose.connect("mongodb://localhost/freshApples")

// Application Configuration \\
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes \\
var controller = require("./controllers/dataCtrl.js");

app.get("/", function(req, res){
	res.sendFile("home.html", {root : "./public/html"})
});

app.get("/new", function(req, res){
	res.sendFile("new.html", {root : "./public/html"})
});

app.get("/about", function(req, res){
	res.sendFile("about.html", {root : "./public/html"})
});

app.get("/add", function(req, res){
	res.sendFile("add.html", {root : "./public/html"})
});

app.get("/signIn", function(req, res){
	res.sendFile("login.html", {root : "./public/html"})
});

app.get("/register", function(req, res){
	res.sendFile("register.html", {root : "./public/html"})
});

app.get("/premium", function(req, res){
	res.sendFile("premium.html", {root : "./public/html"})
});

app.get("/contact", function(req, res){
	res.sendFile("contact.html", {root : "./public/html"})
});

app.get("/movies", function(req, res){
	res.sendFile("movies.html", {root : "./public/html"})
});

app.get("/api/movies", controller.getMovies)
app.get("/api/movies/:movieID", controller.getMovies)

app.post("/api/movies", controller.createMovie);

app.get('/movies', function(req, res){
	console.log(req.body);
	res.sendFile('movies.html', {root : './public/html'});
});

app.post('/movie', function(req, res){
	res.sendFile("html/movies.html", {root : "./public"});
	console.log(req.body);
});

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log("Server running on port " + port);
})