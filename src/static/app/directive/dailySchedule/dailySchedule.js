angular.module("kanmApp")
	.directive("dailySchedule", function() {
		return {
			templateUrl: "static/app/directive/dailySchedule/dailySchedule.htm",
			scope: {
				day: "@",
				shows: "="
			}
		};
	});
