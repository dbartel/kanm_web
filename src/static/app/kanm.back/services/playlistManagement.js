angular.module("kanmApp.back.services").service("playlistManagement", function($http) {
	
	/**
	 * @method submitTrack
	 * Adds a song to the current playlist
	 * @param data {Object} the song to submit
	 * @returns {Promise} promise that resolves when the song is completed
	 */ 
	this.submitTrack = function(data) {
		return $http({
			method: "POST",
			url: "/index.php/playlist/track",
			data: data
		});
	};

	this.getSetlist = function(showId) {
		return $http({
			method: "GET",
			url: "/index.php/playlist/current/" + showId
		});
	};


	/**
	 * @method submitPSA
	 * Submits a PSA to the playlist
	 * @returns {Promise} promise that resolves when the PSA is submitted
	 */
	this.submitPSA = function(data) {
		return $http({
			method: "POST",
			url: "/index.php/playlist/psa",
			data: data
		});
	};

	/**
	 * @method submitStatId
	 * Submits a Station ID to the playlist
	 * @returns {Promise} promise that resolves when the Station Id is submitted
	 */
	this.submitStatId = function(data) {
		return $http({
			method: "POST",
			url: "/index.php/playlist/statid",
			data: data
		});
	};

	/**
	 * @method deleteSong
	 * Deletes a song from the playlist
	 * @returns {Promise} promise that resolves when the operation is complete
	 */
	this.deleteSong = function(id) {
		if (window.confirm("Delete Song?")) {
			return $http({
				method: "DELETE",
				url: "/index.php/playlist/" + id
			});
		}
	};

	return this;
});