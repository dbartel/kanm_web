
// bootstrap angular app
angular.element(document).ready(function() {
	angular.bootstrap(document, ["app"]);
});

// load app module
angular.module("app", [])
	.controller("AppCtrl", function($scope, $http, $interval) {
		$scope.playlist = [];
		
		$scope.refreshPlaylist = function() {
			return $http({
				method: "GET",
				url: "/index.php/playlist/NowPlaying"
			})
				.then(function(result) {
					$scope.playlist = result.data;
				});
		};
		$scope.refreshPlaylist();

		// refresh every 3 minutes
		$interval(function() {
			$scope.refreshPlaylist();
		}, 180000);
	});

