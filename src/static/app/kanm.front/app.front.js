angular.module("kanmApp.front", ["ui.router", "ui.bootstrap", "kanmApp.filters", "kanmAppConstants"]);

angular.module("kanmApp.front").config(function($stateProvider, auth) {
	var buildTUrl = function(f) {
		return "static/app/kanm.front/view/" + f + "/view.htm";
	};
	$stateProvider
		.state("kanm.front", {
			url: "",
			abstract: true,
			// templateUrl: buildTUrl("header"),
			views: {
				"header": {
					templateUrl: buildTUrl("header"),
					controller: "HeaderCtrl"

				},
				"content": {
					templateUrl: buildTUrl("sidebar"),
					controller: "SidebarCtrl"
				}
			},
			// controller: "IndexCtrl",
			// abstract: true
		})
		.state("kanm.front.home", {
			url: "",
			templateUrl: buildTUrl("home"),
			controller: "HomeCtrl",
			resolve: {
				announcements: function(wordpress) {
					return wordpress.getAnnouncements();
				},
				frequency: function(wordpress) {
					return wordpress.getFrequency(3);
				},
				todaysShows: function(shows) {
					var day = new Date().getDay();
					return shows.getShowsByDay(day);
				}
			}
		})
		.state("kanm.front.about", {
			url: "about",
			templateUrl: buildTUrl("about")
		})
		.state("kanm.front.contact", {
			url: "contact",
			templateUrl: buildTUrl("contact"),
			controller: "ContactCtrl"			
		})
		.state("kanm.front.frequency", {
			url: "frequency",
			resolve: {
				posts: function(wordpress) {
					return wordpress.getFrequency();
				}
			},
			abstract: true,
			template: "<ui-view></ui-view>"
		})
		.state("kanm.front.frequency.list", {
			url: "",
			templateUrl: buildTUrl("frequency"),
			controller: "FrequencyCtrl"
		})
		.state("kanm.front.frequency.post", {
			url: "/:id",
			templateUrl: buildTUrl("post"),
			controller: "PostCtrl",
			resolve: {
				post: function(posts, $stateParams) {
					return _.find(posts.data, function(p) {
						return p.ID == $stateParams.id
					});
				}
			}
		})
		.state("kanm.front.shows", {
			url: "shows",
			abstract: true,
			template: "<ui-view></ui-view>",
			resolve: {
				showList: function(shows) {
					return shows.getShows();
				}
			},			
		})
		.state('kanm.front.shows.schedule',{
			url:'/schedule',
		    templateUrl:buildTUrl("schedule"),
			controller:'SchedCtrl'
		})
		.state("kanm.front.shows.day", {
			url: "/schedule/daily",
			templateUrl: buildTUrl("dailySchedule"),
			controller: "DailyScheduleCtrl",
			resolve: {
				showsByDay: function($stateParams, shows) {
					return shows.getDailySchedule();
				}
			}
		})
		.state("kanm.front.shows.detail", {
			url: "/:id",
			templateUrl: buildTUrl("show"),
			resolve: {
				show: function(shows, $stateParams) {
					return shows.getShows($stateParams.id);
				}
			},
			controller: "ShowCtrl"
		})
		.state("kanm.front.nowplaying", {
			url: "nowplaying",
			templateUrl: buildTUrl("listen"),
			controller: "NowPlayingCtrl"
		})
		.state("kanm.front.apply", {
			url: "apply",
			templateUrl: buildTUrl("apply"),
			controller: "ApplyCtrl",
			authenticate: [
				auth.CAS
			],
			resolve: {
				app: function(user, application) {
					return application.fetchApp({netid: user.netid});
				},
				availableAppTypes: function(user, $http) {
					return $http({
						method: "GET",
						url: "/index.php/application/types",
						params: { netid: user.netid }
					});
				}
			}
		});

});

