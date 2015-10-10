angular.module("kanmApp.back")
	.controller("AuditShowDetailCtrl", function($scope, $stateParams, $state, showAudit, programmingDirector) {
		$scope.show = showAudit;

		$scope.specialtyStatus = ($scope.show.specialty == 1)
			? "Remove specialty status"
			: "Add specialty status";
			


		$scope.sets = _.map($scope.show.sets, function(set) {
			var ts = set[0].TS;
			var ts = ts.substr(5,2) + "-" + ts.substr(8,2) + "-" + ts.substr(0,4);
			
			var sum = {
				stationId: 0,
				virgin: 0
			};

			_.forEach(set, function(s) {
				if (parseInt(s.StatId)) sum.stationId += 1;
				if (s.VirginId) sum.virginId += 1;
			});

			return {
				ts: ts,
				playlist: set,
				totals: sum,
				collapse: true
			};
		});
	
		$scope.strikeShow = function() {
			if (window.confirm("Are you sure?")) {
				return programmingDirector.strikeShow($stateParams.id);
			}
		};

		$scope.toggleSpecialty = function() {
			return programmingDirector.toggleSpecialty($stateParams.id)
				.then(function(result) {
					console.log(result);
					return $state.go(".", {}, {reload: true});
				});
		};


	});

