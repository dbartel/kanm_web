/**
 * @class kanmApp.services.shows
 * Provides methods for accessing shows
 */
services.service("shows", function($http, $q, timeutils) {
	/**
	 * @method getShows
	 * Fetches the list of shows, filterable by Id
	 * @param {Number} id The PKey of the show
	 * @returns {Array} A list of shows
	 */
	this.getShows = function(id) {

		var url = id
	? "/index.php/shows/" + id
	: "/index.php/shows";

return $http({
	method: "GET",
	   url: url,
});
};

this.updateDescription = function(id, description) {
	return $http({
		method: "PUT",
		   url: "/index.php/shows/description/" + id,
		   data: {
			   description: description
		   }
	});
};

// Groups show hosts and maps them to the correct show
var mapShowHosts = function(shows) {
	shows = _.groupBy(shows, "timeslot");
	return _.map(shows, function(show) {
		var showName = show[0].ShowName;
		var showid = show[0].showid;
		var description = show[0].ShowDescription;
		var picture = show[0].ShowPicture;
		var hosts = _.map(show, function(s) { return { firstName: s.firstname, lastName: s.lastname }});
		var timeslot = show[0].timeslot;
		return {
			showName: showName,
			hosts: hosts,
			showid: showid,
			timeslot: timeslot,
		   	picture: picture,
			description: description
		};
	});
};
this.getDailySchedule = function() {
	var promises = {};
	_.forEach(timeutils.days, function(day, index) {
		promises[day] = $http({
			method: "GET",
			url: "/index.php/shows/day/" + index
		})
		.then(function(result) {
			return mapShowHosts(result.data);
		});

	});
	return $q.all(promises);
};

this.getShowsByDay = function(day) {
	return $http({
		method: "GET",
		   url: "/index.php/shows/day/" + day
	})
	.then(function(result) {
		return mapShowHosts(result.data);
	});
}

return this;
});
