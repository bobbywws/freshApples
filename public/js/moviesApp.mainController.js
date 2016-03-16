angular.module("MoviesApp")
	.controller("mainController", ["$scope", "$http", function($scope, $http){

// Greeting \\



		$scope.greeting = "Fresh Apples... Groovy, Man";



// For Searching the Database for Movies, Actors, and Directors \\



        $scope.search = {search : ""}

        $scope.searchQuery = function(string){
            $scope.searchResults = []
            $http.post("api/movies", $scope.search)                
                .then(function(returnData, err){
                   extendSearchResults(returnData.data)
                })      
            $http.post("api/actors", $scope.search) 
                .then(function(returnData, err){
                    extendSearchResults(returnData.data)
                })      
            $http.post("api/directors", $scope.search)
                .then(function(returnData, err){
                    extendSearchResults(returnData.data)
                })     
            $scope.search = {}  
        }
        var extendSearchResults = function(returnedMovies) {
            returnedMovies.forEach(function(movie) {
                if ($rootScope.searchResults.indexOf(movie) === -1) {
                    $rootScope.searchResults.push(movie)
                }
            })
        }



//Searching on the Search Results Page \\



        $scope.searchQueryForIDPage = function(string){
            $scope.searchResults = []
            $http.post("../api/movies", $scope.search)                
                .then(function(returnData, err){
                   extendSearchResults(returnData.data)
                })      
            $http.post("../api/actors", $scope.search) 
                .then(function(returnData, err){
                    extendSearchResults(returnData.data)
                })      
            $http.post("../api/directors", $scope.search)
                .then(function(returnData, err){
                    extendSearchResults(returnData.data)
                })     
            $scope.search = {}    
        }
        var extendSearchResults = function(returnedMovies) {
            returnedMovies.forEach(function(movie) {
                if ($scope.searchResults.indexOf(movie) === -1) {
                    $scope.searchResults.push(movie)
                }
            })
        }



// Get New Releases \\



        $http.get("/api/news")
        .then(function(returnData) {
            console.log("Get : ", returnData)
            $scope.news = returnData.data
        })



// Returning a Specific Search Result on It's Own Page \\   



        var movieID = window.location.pathname.split("/").pop();

        $http.get("/api/movies/" + movieID)
            .then(function(serverResponse) {
                $scope.movie = serverResponse.data
                console.log(serverResponse.data)
        })



// For Creating and Adding a New Movie to the Database \\



		$scope.createMovie = function(){
			$http.post("/api/movies/createMovie", $scope.newMovie)
				.then(function(returnData) {
                    console.log("returnData", returnData)
					$scope.movies = $scope.movies || []
					$scope.movies.push(returnData.data)
					$scope.newMovie = {}
				})	
		};



// For Creating and Getting Comments \\



        $scope.createComment = function(){
            $scope.newComment['movieID'] = movieID
            $http.post("/api/comments/createComment/" + movieID, $scope.newComment)
                .then(function(returnData) {
                    console.log("returnData", returnData)
                    $scope.comments = $scope.comments || []
                    $scope.comments.push(returnData.data)
                    $scope.newComment = {}
                })  
        };


        $http.get("/api/comments/" + movieID)
            .then(function(returnData) {
                console.log("Get : ", returnData.data)
                var ratingTotal = 0 
                $scope.comments = returnData.data
                for (var i = 0; i < returnData.data.length; i++) {
                    ratingTotal += returnData.data[i].Rating;
                    }
                $scope.ratingAverage = Math.round(ratingTotal / (returnData.data.length*5)*100);    
                console.log($scope.ratingAverage);
            }) 





// For Creating and Getting Replies to Comments \\



        $scope.createReply = function(){
            $scope.newReply["movieID"] = movieID
            $http.post("/api/comments/createReply/" + movieID, $scope.newReply)
                .then(function(returnData) {
                    console.log("returnData", returnData)
                    $scope.replies = $scope.replies || []
                    $scope.replies.push(returnData.data)
                    $scope.newReply = {}
                })  
        };

        // $http.get("/api/comments/" + movieID)
        //     .then(function(returnData) {
        //         console.log("Get : ", returnData)
        //         $scope.comments = returnData.data
        //     })             



// For Registering and Signing In \\



        $scope.register = function(){
            $http({
                method : 'POST',
                url    : '/register',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { window.location.href="/dashboard" }
                    else {
                alert("Well, this is embarrassing! That user name is already taken. Please choose another one.")
            }
            }) 
            $scope.signupForm = {}
        }

        $scope.signIn = function(){
            $http({
                method : "POST",
                url    : "/signIn",
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/dashboard" } 
                else { console.log(returnData)
                    alert("Incorrect user name and/or password. Try harder next time!")
                }
            })
            $scope.loginForm = {}
        }

        $http({
            method : "GET",
            url    : "/api/users",
        }).then(function(returnData){
            console.log(returnData)
            if ( returnData.data.user ) {
                $scope.user = returnData.data.user
            }
        }) 
                    
	}]);