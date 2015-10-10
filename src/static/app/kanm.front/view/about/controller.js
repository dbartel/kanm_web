angular.module("kanmApp.front").controller("AboutCtrl",['$scope','$http','$modal', "officers", function($scope,$http,$modal, officers) {
    $scope.nopic = "/server/_assets/img/officerpics/nopic.png";
    $scope.officers = officers.data;
}]);


