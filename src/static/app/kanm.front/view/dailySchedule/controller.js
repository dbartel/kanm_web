angular.module("kanmApp.front")
	.controller("DailyScheduleCtrl", function($scope, showsByDay) {
		$scope.shows = showsByDay;
		var day = new Date().getDay();
		$scope.tabs = [
			{
				heading: "Sunday",
				active: false,
				shows: showsByDay.Sunday
			},
			{
				heading: "Monday",
				active: false,
				shows: showsByDay.Monday
			},
			{
				heading: "Tuesday",
				active: false,
				shows: showsByDay.Tuesday
			},
			{
				heading: "Wednesday",
				active: false,
				shows: showsByDay.Wednesday
			},
			{
				heading: "Thursday",
				active: false,
				shows: showsByDay.Thursday
			},
			{
				heading: "Friday",
				active: false,
				shows: showsByDay.Friday
			},
			{
				heading: "Saturday",
				active: false,
				shows: showsByDay.Saturday
			}
		];
		$scope.tabs[day].active = true;
	});
