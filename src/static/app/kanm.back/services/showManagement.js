angular.module("kanmApp.back.services")
	.factory("showManagement", function($http) {

		this.renameShow = function(id, name) {
			return $http({
				method: "PUT",
				url: "/index.php/shows/name/" + id,
				data: {
					name: name
				}
			});
		};

		this.removeShow = function(id) {
			return $http({
				method: "PUT",
				url: "/index.php/calendar/" + id
			});
		};

		this.removeDjFromShow = function(showId, djId) {
			return $http({
				method: "DELETE",
				url: "/index.php/showHost/" + showId + "/" + djId
			});
		};

		this.addDjToShow = function(showId, djId) {
			return $http({
				method: "POST",
				url: "/index.php/showHost/" + showId + "/" + djId
			});

		};

		this.updateTime = function(showId, timeslot) {
			return $http({
				method: "PUT",
				url: "/index.php/calendar/reschedule/" + showId,
				data: {
					time: timeslot
				}
			});
		};

		return this;
	});


