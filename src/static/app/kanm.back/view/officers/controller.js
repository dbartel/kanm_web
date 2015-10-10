angular.module("kanmApp.back")
	.controller("OfficersCtrl", function($scope, $filter, officers) {
		$scope.officers = officers;


		$scope.disableAdd = function() {
			return (!$scope.daySelect || !$scope.startTime || !$scope.endTime)
				|| $scope.endTime <= $scope.startTime;
		};

		$scope.addTime = function() {
			var time = $scope.daySelect + " " + $scope.startTime + " - " + $scope.endTime + ";";
		};

	});