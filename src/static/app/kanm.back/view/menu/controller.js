kanmBack.controller("MenuCtrl", function($scope, $state, $http, user) {
	$scope.isActive = function(state){
		return state == $state.current.name;
	};

	$scope.isActive = function(activeStates){
		var active = false;
		_.forEach(activeStates, function(st) {
			if ($state.current.name === st) active = true;
		});
		return active;
	};	

	$scope.officerAccess = user.officerid;
});