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

	}]);