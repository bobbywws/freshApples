// Requires \\ 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"), Schema = mongoose.Schema;
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bcrypt = require("bcryptjs");
var app = express();



// Create Express App Object \\
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.sessionMiddleware = session({
  secret: "my name",
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)



// Connect Mongo \\
mongoose.connect("mongodb://localhost/freshApples")

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var User = mongoose.model("user", userSchema);



// Connect Passport \\
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, function(error, response){
                if (response === true){
                    return done(null,user)
                }
                else {
                    return done(null, false)
                }
            })
        });
    }
));

app.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("You need to sign in first.")
    res.redirect("/");
}


app.isAuthenticatedAjax = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send({error:"Not logged in."});
}

app.isAuthenticatedName = function(req, res, next){
    if(req.isAuthenticated() && req.user.permissions.admin === true){
        return next();
    }
    res.redirect('/');
}



// Routes \\
var searchController = require("./controllers/searchCtrl.js");

app.post('/api/movies', searchController.search)


app.get("/", function(req, res){
	res.sendFile("home.html", {root : "./public/html"})
});

app.get("/dashboard", app.isAuthenticated, function(req, res){
    res.sendFile("/html/dashboard.html", {root: "./public"})
})

app.get("/api/users", app.isAuthenticatedAjax, function(req, res){
    res.send({user:req.user})
})

app.get("/new", function(req, res){
	res.sendFile("new.html", {root : "./public/html"})
});

app.get("/about", function(req, res){
	res.sendFile("about.html", {root : "./public/html"})
});

app.get("/add", function(req, res){
	res.sendFile("add.html", {root : "./public/html"})
});

app.get("/added", function(req, res){
	res.sendFile("added.html", {root : "./public/html"})
});

app.get("/signIn", function(req, res){
	res.sendFile("login.html", {root : "./public/html"})
});

app.post("/signIn", function(req, res, next){
    passport.authenticate("local", function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : "Wrong username and/or password."}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:"Success"});
        });
    })(req, res, next);
})

app.get("/register", function(req, res){
	res.sendFile("register.html", {root : "./public/html"})
});

app.post("/register", function(req, res){
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else {
                    req.login(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send({success: "Success"}) }
                    })
                }
            })

        })
    })
})

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.get("/contact", function(req, res){
	res.sendFile("contact.html", {root : "./public/html"})
});

app.get("/movies", function(req, res){
	res.sendFile("movies.html", {root : "./public/html"})
});

var controller = require("./controllers/dataCtrl.js");

app.get("/api/movies", controller.getMovies)

app.get("/api/movies/:movieID", controller.getMovies)

app.post("/api/movies", controller.createMovie);

app.get("/movies", function(req, res){
	console.log(req.body);
	res.sendFile("movies.html", {root : "./public/html"});
});

app.post("/movie", function(req, res){

	res.sendFile("html/added.html", {root : "./public"});
	console.log(req.body);
});



// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log("Server running on port " + port);
})