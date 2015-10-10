
angular.module("kanmApp.front").controller("HomeCtrl", function($scope, $http, $state, announcements, frequency, todaysShows) {
	$scope.isCollapsed = true;
	$scope.announcements = announcements;
	$scope.posts = frequency.data;
	$scope.todaysShows = todaysShows;

});
