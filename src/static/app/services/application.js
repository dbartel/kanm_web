/**
 * @class kanmApp.services.application
 * Provides methods for accessing KANM applications
 */
angular.module("kanmApp.services").factory("application", function($http, appTypes) {

	/**
	 * @method generateId
	 * Generates an application id
	 * @returns {string} randomly generated 7 character string
	 */
	var generateId = function() {
		return Math.random().toString(36).substring(7);
	}

	/**
	 * @method fetchApp
	 * Retrieves an application
	 * @param  {Object}  params params to search on e.g. netid, id
	 * @returns {Promise} promise that resolves with the application
	 */
	this.fetchApp = function(params) {
		var url = "/index.php/application";
		if (params) {
			if (params.netid) {
				url += "/netid/" + params.netid;
			}
			else if (params.appid) {
				url += "/appid/" + params.appid;
			}
		}


		return $http({
			method: "GET",
			url: url
		}).then(function(result) {
			if (result.status == 204) {
				return {
					show: {
						genres: [],
						bands: [],
						times: [],
						name: "",
						description: "",

					},
					applicant: {
						firstName: "",
						lastName: "",
						email: "",
						uin: "",
						appType: appTypes.NEW,
						netid: params.netid,
						year: "",
						shirt: "",
						appid: false
					}
				};
			}
			else {
				if (result.data.length) {
					_.forEach(result.data, function(app) {
						app.show.genres = app.show.genres.split(",");
						app.show.bands = _.without(app.show.bands, "");
						app.show.times = _.without(app.show.times, "");
					});
				}
				else {
					result.data.show.genres = result.data.show.genres.split(",");
					result.data.show.bands = _.without(result.data.show.bands, "");
					result.data.show.times = _.without(result.data.show.times, "");
				}
				return result.data;
			}
		});
	};


	/**
	 * Submits an application
	 * @param {Object} app  application to submit
	 * @returns {Promise} promise that resolves when the action completes
	 * @method submitApp
	 */
	this.submitApp = function(app) {
		if (!app.applicant.appid) {
			app.applicant.appid = generateId();
		}
		var url = "/index.php/application";
		return $http({
			method: "POST",
			url: url,
			data: app
		}).then(function() {
			return app.applicant.appid;
		});
	};


	/**
	 * Updates an existing application
	 * @param {Object} application
	 * @returns {Promise} that resolves when operation completes
	 * @method updateApp
	 */
	this.updateApp = function(app) {
		return $http({
			method: "PUT",
			url: "/index.php/application",
			data: app
		});
	};

	/**
	 * Adds a cohost to an application
	 * @param {Object} app cohost's application
	 * @returns {Promise} resolves when operation completes
	 * @method addCohost
	 */
	this.addCohost = function(app) {
		return $http({
			method: "POST",
			url: "/index.php/application/cohost",
			data: app
		});
	};

	/**
	 * Removes an application
	 * @param {Object} object with the appid and netid
	 * @returns {Promise} resolves when the operation completes
	 * @method removeApplication
	 */
	this.removeApplication = function(params) {
		return $http({
			method: "DELETE",
			url: "/index.php/application",
			params: params
		});
	};


	return this;


});
