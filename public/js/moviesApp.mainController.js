angular.module("MoviesApp")
	.controller("mainController", ["$scope", "$http", function($scope, $http){

		$scope.greeting = "Fresh Apples... Groovy, Man";

		$scope.createMovie = function(){
            console.log("Posting createMovie")
			$http.post("/api/movies/createMovie", $scope.newMovie)
				.then(function(returnData) {
                    console.log("returnData", returnData)
					$scope.movies = $scope.movies || []
					$scope.movies.push(returnData.data)
					$scope.newMovie = {}
				})	
		};

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

        $scope.search = {search : ""}

        $scope.searchQuery = function(){
            $http.post("api/movies", $scope.search)                
                .then(function(returnData, err){
                    $scope.searchResults = returnData.data
                })      
            // $http.post("api/actors", $scope.search) 
            //     .then(function(returnData, err){
            //         $scope.searchResults = returnData.data
            //     })      
            // $http.post("api/directors", $scope.search)
            //     .then(function(returnData, err){
            //         $scope.searchResults = returnData.data
            //     })     
            $scope.search = {}    
        }  

        var movieID = window.location.pathname.split("/").pop();

        $http.get("/api/movies/" + movieID)
            .then(function(serverResponse) {
                $scope.movie = serverResponse.data
        })
            
        $http.get("/api/movies")
            .then(function(returnData) {
                console.log("Get : ", returnData)
                $scope.movies = returnData.data
            })         
	}]);