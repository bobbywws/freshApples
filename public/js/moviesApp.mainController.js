angular.module("MoviesApp")
	.controller("mainController", ["$scope", "$http", function($scope, $http){

		$scope.greeting = "Fresh Apples Welcomes You!";

			$scope.createMovie = function(){
			$http.post("/api/movies", $scope.newMovie)
				.then(function(returnData) {
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
                method : 'POST',
                url    : '/signIn',
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
            method : 'GET',
            url    : '/api/users',
        }).then(function(returnData){
            console.log(returnData)
            if ( returnData.data.user ) {
                $scope.user = returnData.data.user
            }
        }) 

        $scope.search = {search : ""}
            $scope.searchQuery = function(){
                console.log('change documented')
                $http({
                    method: 'POST',
                    url   : 'api/movies',
                    data  : $scope.search
                }).then(function(returnData, err){
                    $scope.searchResults = returnData.data.data
                    console.log($scope.searchResults, err)
                })
            }
        $http.get("/api/movies")
			.then(function(returnData) {
				console.log("Get : ", returnData)
				$scope.movies = returnData.data
			})    
	}]);