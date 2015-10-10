angular.module("kanmApp.back")
	.controller("ShowManagementCtrl", function($scope, $state, $stateParams, show, djs, timeutils, showManagement) {

		$scope.djs = djs.data;
		$scope.show = show.data;
		$scope.newDj = "";
		$scope.djs = _.filter($scope.djs, function(dj) {
			return _.indexOf($scope.show.hosts, dj) == -1;
		});

		$scope.sched = {
			days: timeutils.days,
			times: timeutils.timeCodes,
			duration: [1,2]
		};

		$scope.updatePickedTime = function() {
			if ($scope.data.day && $scope.data.time && $scope.data.duration) {
				var endTime = $scope.data.time;
	
				for (var i = 0; i < $scope.data.duration; i++) {
					endTime = timeutils.addHour(endTime);
				}
				$scope.pickedTime = String($scope.data.day) + String($scope.data.time) + String(endTime);
			}
		};


		$scope.removeDj = function(id) {
			return showManagement.removeDjFromShow($scope.show.show.pkey, id)
				.then(function() {
					$state.go(".", {id: $stateParams.id}, {reload: true});
				});
		};

		$scope.addDj = function() {
			var id = $scope.data.newDj;
			return showManagement.addDjToShow($scope.show.show.pkey, id)
				.then(function() {
					$state.go(".", {id: $stateParams.id}, {reload: true});
				});
		};

		$scope.renameShow = function() {
			return showManagement.renameShow($scope.show.show.pkey, $scope.newShowName)
				.then(function() {
					$state.go(".", {id: $stateParams.id}, {reload: true});
				});
		};


		$scope.updateTime = function() {
			return showManagement.updateTime($stateParams.id, $scope.pickedTime)
				.then(function() {
					$state.go(".", {id: $stateParams.id}, {reload: true});
				}, function(err) {
					if (err.status === 409) {
						alert("Schedule Conflict! Pick a different time");
					}
				});
		};
		$scope.goBack = function() {
			return $state.go("^.schedule", {}, {reload: true});
		};

		$scope.removeShow = function() {
			if (window.confirm("Are you sure")) {
				return showManagement.removeShow($stateParams.id)
					.then(function() {
						return $scope.goBack();
					});
			}
		};


	});

