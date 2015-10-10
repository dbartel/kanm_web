angular.module("kanmApp.services")
	.factory("officer", function($http) {
		this.getOfficers = function() {
			return $http({
				method: "GET",
				url: "/index.php/officers"
			})
				.then(function(result) {
					var officers = _.groupBy(result.data, "officerid");
					return _.map(officers, function(officer) {
						return {
							officerid: officer[0].officerid,
							email: officer[0].email,
							name: officer[0].firstname + " " + officer[0].lastname,
							position: officer[0].position_title,
							picture: officer[0].picture,
							office_hours: _.map(officer, function(off) {
								return (off.day)
									? off.day + " " + off.start + "-" + off.end
									: null
							})
						};
					});
				});
		};

		return this;

	});