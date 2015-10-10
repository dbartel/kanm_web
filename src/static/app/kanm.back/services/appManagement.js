angular.module("kanmApp.back.services").factory("appManagement", function($http) {
	this.fetchApps = function() {
		return $http({
			url: "/index.php/application"
		}).then(function(result) {
			var apps = _.groupBy(result.data, "appid");

			apps = _.map(apps, function(app) {
				var cohosts = _.map(app, function(a) {
					return {
						name: a.firstname + " " + a.lastname,
					};
				});

				var show = {
					name: app[0].name,
					bands: _.without([app[0].band1, app[0].band2,app[0].band3,app[0].band4, app[0].band5], ""),
					times: _.without([app[0].time1, app[0].time2, app[0].time3, app[0].time4, app[0].time5, app[0].time6, app[0].time7, app[0].time8], ""),
					description: app[0].description,
					genres: _.uniq(app[0].genre.split(","))
				};
				app = {
					show: show,
					cohosts: cohosts,
					id: app[0].appid,
					status: app[0].status,
					appType: app[0].memberType
				}
				return app;
			});

			return apps;
		});
	};

	this.addShow = function(id, time) {
		return $http({
			method: "POST",
			url: "/index.php/shows/fromApp",
			data: {
				appId: id,
				time: time
			}
		});
	};

	this.deleteAll = function() {
		return $http({
			method: "DELETE",
			url: "/index.php/application/all"
		});
	};

	this.addGeneral = function(id) {
		return $http({
			method: "POST",
			url: "/index.php/generalMembers/fromApp",
			data: {
				appId: id
			}
		});
	}

	return this;
});