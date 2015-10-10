angular.module("kanmApp.front").controller("SchedCtrl", function($scope, $http, $state, timeutils, showList) {
	$scope.shows = showList.data;
	$scope.goToShow = function(show) {
		$state.go("kanm.front.shows.detail", {id: show.id});
	};

});


