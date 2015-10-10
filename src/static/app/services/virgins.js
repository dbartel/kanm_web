/**
 * @class kanmApp.services.virgins
 * Provides helper methods for the virgin rack
 */
services.service("virgins", function($http) {
	/**
	 * @method get
	 * Gets the list of virgins on the virgin rack
	 * @param {Number} id The pkey of a virgin
	 * @returns {Array} Current virgin rack
	 */
	this.get = function(id) {
		var params = id || null;
		return $http({
			method: "GET",
			url: "/index.php/virgins",
			params: params
		});
	};

	/**
	 * @method post
	 * Adds a new virgin to the virgin rack
	 * @param {Object} The virgin to be added
	 * @returns {Object} Promise that resolves when the virgin has been added
	 */
	this.post = function(virgin) {
		return $http({
			method: "POST",
			url: "/index.php/virgins",
			data: virgin
		});
	};

	this.delete = function(id) {
		return $http({
			method: "DELETE",
			url: "/index.php/virgins/" + id,
		});
	}

	return this;
});