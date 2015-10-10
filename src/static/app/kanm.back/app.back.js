var kanmBack = angular.module("kanmApp.back", 
			      ["ui.router", "ui.bootstrap", "kanmApp.back.filters", "kanmApp.back.services", "kanmAppConstants", "kanmApp.back.directive", "ui.select", "ngSanitize"]);

kanmBack.config(function($stateProvider, auth, uiSelectConfig) {


	// Searchable select list theme
	uiSelectConfig.theme = "bootstrap";


	var buildTUrl = function(f) {
		return "static/app/kanm.back/view/" + f + "/view.htm"
	};

	$stateProvider
		.state("kanm.back", {
			url: "dashboard",
			abstract: true,
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			views: {
				"content": {
					templateUrl: buildTUrl("menu"),
					controller: "MenuCtrl",
				}
			},
			resolve: {
				virginList: function(virgins) {
					return virgins.get();
				},
				userInfo: function($http, user) {
					return $http({
						method: "GET",
						url: "/index.php/djs",
						params: {
							netid: user.netid
						}
					});
				},
				showInfo: function(shows, user) {
					return shows.getShows(user.showid)
						.then(function(result) {
							return result.data.show;
						});
				}
			}
		})
		.state("kanm.back.dashboard", {
			url: "",
			templateUrl: buildTUrl("home"),
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			controller: "HomeBackCtrl"
		})
		.state("kanm.back.playlist", {
			url: "/playlist",
			templateUrl: buildTUrl("playlist"),
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			controller: "PlaylistCtrl",
			resolve: {
				set: function(playlistManagement, user) {
					return playlistManagement.getSetlist(user.showid);
				}
			}
		})

		.state("kanm.back.showDetails", {
			url: "/showDetails",
			templateUrl: buildTUrl("showDetails"),
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			controller: "ShowDetailsCtrl",
			resolve: {

			}
		})

		.state("kanm.back.virgins", {
			url: "/virgins",
			templateUrl: buildTUrl("virgins"),
			authenticate: [
				auth.CAS,
				auth.DJ
			],			
			controller: "VirginCtrl"
		})
		.state("kanm.back.programming", {
			url: "/programming",
			abstract: true,
			templateUrl: buildTUrl("programming"),
			authenticate: [
				auth.CAS,
				auth.OFFICER,
			],			
			controller: "ProgrammingCtrl",
			resolve: {

				showAudits: function($q, shows, programmingDirector) {
					return shows.getShows()
							.then(function(result) {
								var promises = [];
								_.forEach(result.data, function(show) {
									promises.push(programmingDirector.auditShow(show.pkey));
								});
								return $q.all(promises);
							});
				},
				djs: function($http) {
					return $http({
						method: "GET",
						url: "/index.php/members"
					});
				}
			}
		})
		.state("kanm.back.programming.show", {
			url: "/show",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],			
			views: {
				"auditShow": {
					templateUrl: buildTUrl("auditShow"),
					controller: "AuditShowCtrl"
				}
			}
		})
		.state("kanm.back.programming.showDetail", {
			url: "/show/:id",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],
			resolve: {
				showAudit: function(showAudits, $stateParams) {
					return _.find(showAudits, { showId: $stateParams.id });
				}
			},
			views: {
				"auditShow": {
					templateUrl: buildTUrl("auditShowDetail"),
					controller: "AuditShowDetailCtrl"
				}
			}
		})
		.state("kanm.back.programming.dj", {
			url: "/dj",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],			
			views: {
				"auditDj": {
					templateUrl: buildTUrl("auditDj"),
					controller: "AuditDjCtrl"
				}
			}
		})
		.state("kanm.back.apps", {
			url: "/apps",
			abstract: true,
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],		
			template: "<ui-view></ui-view>",
			resolve: {
				apps: function(appManagement) {
					return appManagement.fetchApps();
				}
			}
		})
		.state("kanm.back.frequency", {
			url: "/frequency",
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			templateUrl: buildTUrl("frequency")
		})
		.state("kanm.back.shows", {
			url: "/shows",
			template: "<ui-view></ui-view>",
			resolve: {
				showList: function(shows) {
							  return shows.getShows();
				}
			}
		})
		.state("kanm.back.shows.schedule", {
			url: "/schedule",
			templateUrl: buildTUrl("scheduleManagement"),
			controller: "ScheduleManagementCtrl",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],			
			resolve: {
				showList: function(shows) {
					return shows.getShows();
				}
			}
		})
		.state("kanm.back.shows.detail", {
			url: "/:id",
			templateUrl: buildTUrl("showManagement"),
			controller: "ShowManagementCtrl",
			resolve: {
				show: function($stateParams, shows) {
					  return shows.getShows($stateParams.id);
			  	},
				djs: function($http) {
						 return $http({
							 method: "GET",
						 	 url: "/index.php/djs"
						 });
				}
			}
		})
		.state("kanm.back.apps.list", {
			url: "",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],
			templateUrl: buildTUrl("appList"),
			controller: "AppListCtrl",
		})
		.state("kanm.back.apps.detail", {
			url: "/:id",
			authenticate: [
				auth.CAS,
				auth.OFFICER
			],		
			templateUrl: buildTUrl("appDetail"),
			controller: "AppDetailCtrl",
			resolve: {
				app: function(apps, $stateParams) {
					return _.find(apps, function(a) {
						return a.id === $stateParams.id;
					});
				}
			}
		})
		.state("kanm.back.officers", {
			url: "/officer",
			authenticate: [
				auth.CAS,
				auth.DJ
			],
			templateUrl: buildTUrl("officers"),
			controller: "OfficersCtrl",
		})
});
