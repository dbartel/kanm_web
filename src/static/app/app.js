
var app = angular.module("kanmApp", [
	"ui.router",
	"ui.bootstrap",
	"angular-loading-bar",
	"kanmApp.front",
	"kanmApp.back",
	"kanmApp.services",
	"kanmApp.filters",
	"kanmAppConstants"
]);

app.config(['cfpLoadingBarProvider', "$stateProvider", "$urlRouterProvider", function(cfpLoadingBarProvider, $stateProvider, $urlRouterProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
	$urlRouterProvider.otherwise("/");
	//setup abstract kanm state
	$stateProvider.state("kanm", {
		abstract: true,
		url: "/",
		template: "<div ui-view='header'></div><div ui-view='content'></div>",
		resolve: {
		user: function(authService) {
			return authService.getUserInfo()
		},
		nowPlaying: function(playlist) {
			return playlist.getCurrentPlaylist();
		},
		officers: function(officer) {
			return officer.getOfficers();
		}
	  }
	})
	.state("kanm.unauthorized", {
		url: "kanm.unauthorized",
		templateUrl: "static/app/view/unauthorized/view.htm"
	});

}]);


app.run(function($rootScope, $state, $location, authService, auth){
  $rootScope.$on("$stateChangeError", console.log.bind(console));

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
	if (toState.authenticate && !toState.stateAuthorized) {
		event.preventDefault();
		authService.checkAuth(toState.authenticate)
			.then(function(result) {
				if (result.stateAuthorized) {
					toState.stateAuthorized = true;
					$state.transitionTo(toState.name, toParams);
				}
				else {
					if (result.CASAuthorized) {
						// if authorized through CAS, but no access (e.g. dj => officer route)
						// transition to client unauthorized page
						$state.transitionTo("kanm.unauthorized");
					}
					else {
						//if not authorized through CAS, redirect to server login
						var url = toState.url;
						if (toState.name === "kanm.back.dashboard") url = "dashboard";
						window.location = "/index.php/login?redirect=" + url;
					}
				}
			});
	}
  });

});

