
kanmBack.controller("PlaylistCtrl", function($scope, playlistManagement, virginList, set, appTypes, user) {
	$scope.virgins = virginList.data;
	$scope.data = {
		artist: "",
		album: "",
		track: "",
		showId: user.showid
	};

	$scope.virgin = { selected:null };

	$scope.$watch("virgin.selected", function() {
		$scope.addVirgin();
	});

	$scope.set = set.data;

	$scope.refreshPlaylist = function() {

		$scope.data = {
			artist: "",
			album: "",
			track: "",
			showId: user.showid
		};
		
		playlistManagement.getSetlist($scope.data.showId)
			.then(function(result) {
				$scope.set = result.data;
			});
	}

	$scope.addVirgin = function(v) {
		if ($scope.virgin.selected) {
			$scope.data.artist = $scope.virgin.selected.Artist;
			$scope.data.album = $scope.virgin.selected.Album;
		}
	};

	$scope.submitTrack = function() {
		playlistManagement.submitTrack($scope.data)
			.then(function() {
				$scope.refreshPlaylist();
			});
	};


	$scope.submitStatId = function() {
		playlistManagement.submitStatId({
			showId: $scope.data.showId
		}).then(function() {
			$scope.refreshPlaylist();
		});
	};

	$scope.deleteSong = function(id) {
		playlistManagement.deleteSong(id)
			.then(function() {
				$scope.refreshPlaylist();
			});
	};

	$scope.isNonSong = function(song) {
		return (song.Artist == song.Album && song.Artist == song.Track)
		&& (song.Artist == "PSA" || song.Artist == "StationId");
	};

});
