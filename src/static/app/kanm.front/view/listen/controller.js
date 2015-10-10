angular.module("kanmApp.front")
	.controller("NowPlayingCtrl", function($scope, $http, $interval, nowPlaying, playlist) {
		$scope.playlist = nowPlaying;
		var updatePlaylist = function() {
			playlist.getCurrentPlaylist()
				.then(function(result) {
					$scope.playlist = result;
				});
		};
		$interval(updatePlaylist,5000);
});






