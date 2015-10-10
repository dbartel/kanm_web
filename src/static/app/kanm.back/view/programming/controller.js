kanmBack.controller("ProgrammingCtrl", function($scope, $state) {
	$scope.isActive = function(state) {
		if (!state.length) return state == $state.current.name;
		var active = false;
		_.forEach(state, function(s) {
			if ($state.current.name === s) active = true;
		});
		return active;
	};
});
