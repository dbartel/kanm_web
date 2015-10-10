
angular.module("kanmApp.front").controller("ShowCtrl", function($scope, show){

	$scope.show = show.data;
	$scope.sets = {};
	$scope.show.sets = _.groupBy($scope.show.sets, "SetId");

	$scope.sets = _.map($scope.show.sets, function(set) {
		var ts = set[0].TS;
		var ts = ts.substr(5,2) + "-" + ts.substr(8,2) + "-" + ts.substr(0,4);
		return {
			ts: ts,
			playlist: set,
			collapse: true
		}
	});
	$scope.sets.reverse();
});


