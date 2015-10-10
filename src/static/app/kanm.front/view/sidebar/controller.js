angular.module("kanmApp.front")
	.controller("SidebarCtrl", function($scope, $interval, playlist, nowPlaying) {
		$scope.audioIcon = "glyphicon-play";
		if (nowPlaying.length) {
			$scope.artist = nowPlaying[0].Artist;
			$scope.track = nowPlaying[0].Track;
		}
		var audio = document.getElementById("stream");

		$scope.toggleAudio = function() {
			if (audio.paused) {
				audio.play();
				$scope.audioIcon = "glyphicon-stop";
			}
			else {
				audio.pause();
				$scope.audioIcon = "glyphicon-play";
			}
		};

		$scope.changeVolume = function() {
			audio.volume = $scope.volume / 100;
		};
		//initial volume setting
		$scope.volume = 75;
		$scope.changeVolume();


		var updatePlaylist = function() {
			playlist.getCurrentPlaylist()
				.then(function(result) {
					if (result.length) {
						$scope.artist = result[0].Artist;
						$scope.track = result[0].Track;

					}
					else {
						$scope.artist = null;
						$scope.track = null;
					}
				});			
		};
		$interval(updatePlaylist,300000);

	});
	
