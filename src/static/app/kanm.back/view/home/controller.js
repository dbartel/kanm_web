kanmBack.controller("HomeBackCtrl", function($scope, $state, $modal, $q, userInfo, showInfo, officers, user) {
	$scope.user = userInfo.data;
	$scope.officers = officers;
	$scope.activeShow = showInfo.ShowName;
	$scope.shows = user.shows;



	$scope.changeShow = function() {
		var activeShowId = showInfo.pkey;
		$modal.open({
				animation: true,
				templateUrl: "static/app/kanm.back/modal/changeShow/changeShow.htm",
				controller: "changeShowModal",
				size: "sm",
				resolve: {
					activeShow: function() {
							return activeShowId;
					},
					availableShows: function(shows) {
						var promises = [];
						_.forEach($scope.shows, function(s) {
							promises.push(shows.getShows(s));
						});

						return $q.all(promises)
								.then(function(result) {
									return _.map(result, function(res) {
											return {
												name: res.data.show.ShowName,
										   		pkey: res.data.show.pkey
											};
									});
									return result;
								});
					}

				}
		});
	};

});

kanmBack
	.controller("changeShowModal", function($scope, $http, $modalInstance, $state, activeShow, availableShows) {

		$scope.showList = availableShows;
		$scope.active = activeShow;
		$scope.selectShow = function(id) {
			if (id !== $scope.active) {
				return $http({
						method: "PUT",
						url: "/index.php/auth/show/" + id,
				})
					.then(function() {
						return $state.go(".", {}, {reload: true})
							.then(function() {
								return $scope.close();
							})

					});
			}
		};

		$scope.close = function() {
			return $modalInstance.dismiss();
		}

	});



