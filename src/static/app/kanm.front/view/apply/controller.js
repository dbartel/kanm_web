angular.module("kanmApp.front").controller("ApplyCtrl", function($scope, $http, $state, timeutils, application, app, user, appTypes, availableAppTypes) {

	var initData = function() {
		var year = new Date().getUTCFullYear();
		$scope.years = [
			year,
			year + 1,
			year + 2,
			year + 3,
			year + 4
		];
		
		$scope.shirts = [
			'S',
			'M',
			'L',
			'XL'
		];

		$scope.data = app;
		if ($scope.data.applicant && $scope.data.applicant.year) $scope.data.applicant.year = parseInt($scope.data.applicant.year);
		$scope.appTypes = availableAppTypes.data.appTypes;
		$scope.returningTime = availableAppTypes.data.timeslot;
		$scope.submitSuccess = false;
	}
	initData();
	var isCohostApp = false;

	$scope.lookupId = function() {
		// existingId
		application.fetchApp({
			appid: $scope.existingId
		})
			.then(function(result) {
				if (result.applicant.appid) {
					//look up success
					$scope.data.show = result.show;
					$scope.data.applicant.appid = result.applicant.appid;
					$scope.data.applicant.appType = result.applicant.appType;
					$scope.isCohost = true;
					$scope.cohost = {
						name: result.applicant.firstName + " " + result.applicant.lastName,
						showName: result.show.name
					};
				}
				else {
					alert("Look up failed - make sure the application Id is correct!");
				}
			});
	};

	$scope.addItem = function(item, arr, maxLength) {
		if (arr.length < maxLength) {
			arr.push(item);
		}
	};

	$scope.removeCohost = function() {
		// reset app id
		$scope.data.applicant.appid = false;
		// reset show information
		$scope.data.show = {
			genres: [],
			bands: [],
			times: [],
			name: "",
			description: "",
		};
		// remove cohost 
		$scope.cohost = null;
		$scope.existingId = null;
	};

	$scope.deleteApp = function() {

		if (window.confirm("WARNING THIS CANNOT BE UNDONE YOU WILL HAVE TO RESUBMIT AN APP")) {
			return application.removeApplication({
				appid: $scope.data.applicant.appid,
				netid: $scope.data.applicant.netid
			})
				.then(function() {
					return $state.go(".", {}, {reload: true});
				});
		}
	};

	$scope.addGenre = function () {
		if ($scope.data.show.genres.length < 3) {
			$scope.data.show.genres.push($scope.genreSelect);
		}
	};


	$scope.addBand = function() {
		if ($scope.data.show.bands.length < 5) {
			$scope.data.show.bands.push($scope.bandInput);
		}
	};

	$scope.removeItem = function(index,arr) {
		arr.splice(index,1);
	};

	$scope.addTime = function() {
		if ($scope.daySelect && $scope.timeSelect && $scope.durationSelect && $scope.data.show.times.length < 8) {
			$scope.data.show.times.push(timeutils.generateCode($scope.daySelect, $scope.timeSelect, $scope.durationSelect));
		}
	};

	$scope.submit = function() {
		if ($scope.cohost) {
			return application.addCohost($scope.data)
				.then(function() {
					$scope.appId = $scope.data.appid;
					$scope.submitSuccess = true;
				});
		}
		else if ($scope.data.applicant.appid) {
			// update
			return application.updateApp($scope.data)
				.then(function() {
					$scope.appId = $scope.data.applicant.appid;
					$scope.submitSuccess = true;
				});
		}
		else {
			return application.submitApp($scope.data)
				.then(function(appid) {
					$scope.appId = appid;
					$scope.submitSuccess = true;
				});
		}
	};

	$scope.hideCohostField = function() {
		return $scope.data.applicant.appType === appTypes.GENERAL;
	};

	$scope.$watch("data.applicant.appType", function() {
		if ($scope.data.applicant.appType === appTypes.RETURNING_SAME) {
			$scope.data.show.times = [$scope.returningTime];
		}
	});


});
