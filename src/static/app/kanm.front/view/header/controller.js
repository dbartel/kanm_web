    angular.module("kanmApp.front").controller("HeaderCtrl",  function($scope,$http,$state, $interval, user){

        $scope.navCollapsed = (window.innerWidth < 768);

        $scope.loggedIn = (user);
        $scope.isActive = function(activeStates){
            var active = false;
            _.forEach(activeStates, function(st) {
                if ($state.current.name === st) active = true;
            });
            return active;
        };
    });
