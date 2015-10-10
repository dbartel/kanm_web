angular.module("kanmApp.front").controller("FrequencyCtrl", function($scope, posts){
    $scope.posts = posts.data;

    $scope.currentPage = 1;
    $scope.itemsPerPage = 8;


    $scope.$watch("currentPage + itemsPerPage", function() {
    	var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    	var end = begin + $scope.itemsPerPage;

    	$scope.paginatedPosts = $scope.posts.slice(begin, end);
    });


});

		


