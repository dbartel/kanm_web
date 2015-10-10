angular.module("kanmApp.back").controller("ScheduleManagementCtrl", function($scope, $state, $modal, $http, showList, shows) {
	$scope.shows = showList.data;
	$scope.goToShow = function(show) {
		return $state.go("^.detail", {id: show.id});
	};
});


