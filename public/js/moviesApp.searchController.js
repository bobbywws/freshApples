angular.module("MoviesApp")
	.controller("SearchResultsController", ["$scope", "$http", "$location", function SearchResultsController($scope, $http, $location){

		console.log("search controller", $location.search())

		$scope.search = {search : ""}

        // $scope.searchQuery = function(string){
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
        //     window.location.href="/searchResults"  
        // }
        var extendSearchResults = function(returnedMovies) {
            returnedMovies.forEach(function(movie) {
                if ($scope.searchResults.indexOf(movie) === -1) {
                    $scope.searchResults.push(movie)
                }
            })
        }

}]);