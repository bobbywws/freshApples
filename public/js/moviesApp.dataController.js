angular.module('MoviesApp')
	.controller('dataController', ['$scope', "$http", function($scope, $http){
			
		$http.get("/api/movies")
			.then(function(returnData) {
				console.log("Get : ", returnData)
				$scope.movies = returnData.data
			})	
	}]);