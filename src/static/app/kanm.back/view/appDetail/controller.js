kanmBack.controller("AppDetailCtrl", function($scope, $state, app, timeutils, appManagement) {
	$scope.app = app;
	$scope.data = {
		day: "",
		time: "",
		duration: ""
	};

	$scope.sched = {
		days: timeutils.days,
		times: timeutils.timeCodes,
		duration: [1,2]
	};

	$scope.pickedTime = "";
	$scope.updatePickedTime = function() {
		if ($scope.data.day && $scope.data.time && $scope.data.duration) {
			var endTime = $scope.data.time;

			for (var i = 0; i < $scope.data.duration; i++) {
				endTime = timeutils.addHour(endTime);
			}
			$scope.pickedTime = String($scope.data.day) + String($scope.data.time) + String(endTime);
		}
	};


	$scope.addShow = function(tm) {
		var time = tm || $scope.pickedTime;

		if (time) {
			appManagement.addShow(app.id, time)
				.then(function(result) {
					alert("Show added successfully!");
					$state.go("^.list", null, {reload: true});
				}, function(err) {
					if (err.status === 409) {
						alert("Schedule Conflict! Pick a different time");
					}
				});
		}

	};



}).filter("timecode", function(timeutils) {
	return function(code, excludeDay) {
		return timeutils.codeToString(code, excludeDay);
	};
});
