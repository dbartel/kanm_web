/** Programming Director service
 * Service for handling all db actions a programming director needs
 * PD needs to: strike show, strike dj, remove a show
*/

angular.module("kanmApp.back.services").factory("programmingDirector", function($http) {

	/** @brief Strike a show based on its showid
	 * A show strike strikes all djs associated with it
	 */
	this.strikeShow = function(id) {
		return $http({
			method: "PUT",
			url: "/index.php/shows/" + id + "/strike"
		});
	};

	/** @brief Strike a dj based on id
	 */
	this.strikeDj = function(id) {
		return $http({
			method: "PUT",
			url: "/index.php/djs/" + id + "/strike"
		});
	};

	this.removeDj = function(id) {
		return $http({
			method: "DELETE",
			url: "/index.php/djs/" + id
		});
	};

	this.givePoints = function(id, amount) {
		return $http({
			method: "PUT",
			url: "/index.php/djs/" + id + "/points/" + amount
		});
	};

	this.clearPoints = function(id) {
		return $http({
			method: "PUT",
			url: "/index.php/djs/" + id + "/points/clear"
		});
	};

	this.auditShow = function(id) {
		return $http({
			method: "GET",
			url: "/index.php/shows/" + id + "/audit"
		})
		.then(function(result) {
			var audit = result.data;
			audit.sets = _.groupBy(audit.sets, "SetId");
			return audit;
		});
	};

	this.toggleSpecialty = function(id) {
		return $http({
			method: "PUT",
			url: "/index.php/shows/" + id + "/specialty"
		});
	};
	
	return this;
});
