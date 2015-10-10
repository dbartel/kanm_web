kanmBack.controller("AuditDjCtrl", function($scope, $modal, $stateParams, djs) {
	$scope.djs = _.union(djs.data.general, djs.data.dj);
	$scope.auditDj = function(dj) {
		$modal.open({
			templateUrl: "static/app/kanm.back/modal/programmingDjControl/programmingDjControl.html",
			controller: "AuditDjModalCtrl",
			resolve: {
				dj: function () {return dj;}
			}
		});
	};
}).filter("djAuditFilter", function() {
	return function(djs, badOnly) {
		if (badOnly) {
			return _.filter(djs, function(dj) {
				return dj.strikes >= 2;
			});
		}
		else {
			return djs;
		}
	}
}).controller("AuditDjModalCtrl", function($scope, $modalInstance, $state, dj, programmingDirector) {
	$scope.dj = dj;

	$scope.close = function(reload) {
		$modalInstance.dismiss();
		if (reload) {
			return $state.go(".", {}, {reload: true});
		}
	};

	$scope.addStrike = function() {
		if (window.confirm("Are you sure?")) {
			programmingDirector.strikeDj(dj.pkey).then(function() {
				$scope.close(true);
			});
		}
	};

	$scope.deleteDj = function() {
		if (window.confirm("THIS CANNOT BE UNDONE! Are you sure?")) {
			programmingDirector.removeDj(dj.pkey).then(function() {
				$scope.close(true);
			});
		};
	};

	$scope.addPoints = function() {
		var amount = parseInt(window.prompt("How many points?"));
		if (amount) {
			programmingDirector.givePoints(dj.pkey, amount).then(function() {
				$scope.close(true);
			})
		}
	};

});
