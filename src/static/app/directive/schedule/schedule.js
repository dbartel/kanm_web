angular.module("kanmApp").controller("ScheduleCtrl", function($scope, timeutils) {
	$scope.schedule = [];

	function initTimeSlots() {
		var timeSlots = [];
		for (var i = 0; i < 7; i++) {
			timeSlots.push({
				name: "",
				id: "",
				time: "",
				used: false
			});
		}
		return timeSlots;
	}

	function initSchedule() {
		var timeSlots = _.fill(Array(7), { id: "", time: "", scheduled: false, name: ""}, 0, 7);
		$scope.schedule.push({
			time: "12am",
			id: "00",
			shows: timeSlots
		});

		var id = "00";
		for (var i = 1; i < 12; i++) {
			if (i > 9) {
				id = "" + i;
			}
			else {
				id = "0" + i;
			}

			$scope.schedule.push({
				time: i + "am",
				id: id,
				shows: _.cloneDeep(timeSlots)
			});
		}

		$scope.schedule.push({
			time: "12pm",
			id: "12",
			shows: _.cloneDeep(timeSlots)
		});

		for (var i = 1; i < 12; i++) {
			id = "" + (i + 12);

			$scope.schedule.push({
				time: i + "pm",
				id: id,
				shows: _.cloneDeep(timeSlots)
			});
		}
	}
	initSchedule();

	$scope.addToSchedule = function(show) {
		var day = parseInt(show.timeslot[0]);
		var length = timeutils.getDuration(show.timeslot);
		var startTime = parseInt(show.timeslot[1] + show.timeslot[2]);
		var scheduleBlock = {
			name: show.ShowName,
			id: show.pkey,
			time: timeutils.codeToString(show.timeslot),
			scheduled: true
		};

		// mark beginning of show
		$scope.schedule[startTime].shows[day] = scheduleBlock;

		// if two hour show, mark end block
		if (length > 1) {
			$scope.schedule[startTime + 1].shows[day] = {
				name: "",
				id: show.pkey,
				time: timeutils.codeToString(show.timeslot),
				scheduled: true,
				hour: true
			};
		}
	};

	_.forEach($scope.shows, function(show) {
		$scope.addToSchedule(show);
	});

	$scope.cb = function(show) {
		if (show.scheduled) {
			return $scope.callback({show: show});
		}		
	}


}).directive("schedule", function() {
	return {
		restrict: "E",
		templateUrl: "static/app/directive/schedule/schedule.htm",
		controller: "ScheduleCtrl",
		scope: {
			shows: "=",
			callback: "&"
		}
	}
});