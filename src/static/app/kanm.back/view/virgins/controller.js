kanmBack.controller("VirginCtrl", function($scope, $modal, $state, virginList, user, virgins) {
	$scope.virgins = virginList.data;

	$scope.addVirgin = function() {
		$modal.open({
			templateUrl: "static/app/kanm.back/modal/virgin/virgin.html",
			controller: "AddVirginCtrl"
		});
	};
	$scope.officerAccess = user.officerid;

	$scope.removeVirgin = function(v) {
		virgins.delete(v.pkey)
			.then(function() {
				return $state.go(".", {}, {reload: true});
			});
	};

});

kanmBack.controller("AddVirginCtrl", function($scope, $modalInstance, $state, virgins) {
	$scope.virgin = {
		artist: "",
		album: "",
		review: "",
		genre: ""
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

	$scope.submit = function() {
		virgins.post($scope.virgin).then(function() {
			$modalInstance.dismiss();
			return $state.go("kanm.back.virgins", {}, {reload: true});
		});
	};
});
