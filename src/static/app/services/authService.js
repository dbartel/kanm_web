/**
 * @class kanmApp.services.auth
 * Provides methods for authorizing a user
 */
angular.module("kanmApp.services").factory("authService", function($http) {


	// checks local authorizeation
	// returns object that shows the authorization + if the user has authenticated with CAS
	var checkAuth = function(authTypes) {
		return $http({
			method: "GET",
			url: "/index.php/auth/status"
		})
			.then(function(result) {
				if (result.status === 401) {

					return {
						stateAuthorized: false,
						CASAuthorized: false
					};
				}
				else {
					var isAuthorized = true;
					var authLevels = result.data;
					if (authLevels["OFFICER"]) {
						return {
							stateAuthorized: true,
							CASAuthorized: true
						}
					}

					_.forEach(authTypes, function(authType) {
						if (!authLevels[authType]) isAuthorized = false;
					});
					return {
						stateAuthorized: isAuthorized,
						CASAuthorized: authLevels.CAS
					};
				}
			}, function(result) {
				return false;
			});
	};

	var getUserInfo = function() {
		return $http({
			method: "GET",
			url: "/index.php/auth/user"
		})
			.then(function(result) {
				return _.assign(result.data, {
					showid: result.data.shows[0]
				});
			}, function(result) {
				return false;
			});
	};

	var changeShowContext = function(showId) {
			return $http({
				method: "PUT",
				url: "/index.php/auth/show",
				data: {
						showId: showId
				}
			});
	};

	return {
		checkAuth: checkAuth,
		getUserInfo: getUserInfo,
		changeShowContext: changeShowContext

	};

});
