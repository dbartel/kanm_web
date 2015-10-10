kanmBack.controller("AppListCtrl", function($scope, $q, $state, apps, application, appTypes, appManagement) {
	$scope.apps = apps;
    $scope.sortType = "show.name";

	$scope.addReturning = function() {
		var returningApps = _.filter($scope.apps, function(app) {
			return app.appType === appTypes.RETURNING_SAME;
		});
		var promises = [];

		_.forEach(returningApps, function(app) {
			promises.push(appManagement.addShow(app.id, app.show.times[0]));
		});

		$q.all(promises)
			.then(function() {
			$state.go(".", {}, {reload: true});
		});

	};

	$scope.deleteAll = function() {
		if (window.confirm("THIS CANNOT BE UNDONE ARE YOU SURE")) {
			return appManagement.deleteAll()
				.then(function() {
					return $state.go(".", {}, {reload: true});
				});
		}
	};

	$scope.addGeneral = function() {
		var generalApps = _.filter($scope.apps, {appType: appTypes.GENERAL});
		var promises = [];

		_.forEach(generalApps, function(app) {
			promises.push(appManagement.addGeneral(app.id));
		});

		$q.all(promises)
			.then(function() {
			$state.go(".", {}, {reload: true});
		});
	};
});
