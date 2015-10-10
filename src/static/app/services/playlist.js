/**
 * @class kanmApp.services.playlist
 * Provides methods for accessing the current playlist
 */
angular.module("kanmApp.services").factory("playlist", function($http) {



	/**
	 * @method getCurrentPlaylist
	 * Gets whatever is now playing
	 * @returns {Array} An array of tracks - empty array if Billy the Auto DJ is playing
	 */
	this.getCurrentPlaylist = function(params) {
		return $http({
			method: "GET",
			url: "/index.php/playlist/NowPlaying",
			params: params,
			ignoreLoadingBar: true
		})
			.then(function(result) {
				return result.data.reverse();
			});
	}

	return this;
});