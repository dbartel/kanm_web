kanmBack.controller("AuditShowCtrl", function($scope, $modal, $stateParams, showAudits) {
	var shows = _.map(showAudits, function(show) {
		var reason = [
			show.virgin ? "not enough virgins" : null,
			show.stationId ? "not enough station ids" : null,
			show.date ? "didn't play a show last week" : null 
		];
		return _.extend(show, {
			reason: _.compact(reason).join(" ")
		});
	});
	$scope.shows = shows;
});

