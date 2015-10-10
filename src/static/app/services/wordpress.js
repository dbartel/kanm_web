/**
 * @class kanmApp.services.wordpress
 * Provides methods for accessing wordpress posts
 */

 angular.module("kanmApp.services")
 	.factory("wordpress", function($http) {

 		this.getFrequency = function(postsPerPage) {
 			var limit = postsPerPage || "";
 			return $http({
 				method: "GET",
 				url: "/wordpress/?json_route=/posts&filter[posts_per_page]=" + limit + "&filter[category_name]=frequency"
 			});
 		};

 		this.getAnnouncements = function() {
 			return $http({
 				method: "GET",
 				url: "/wordpress/?json_route=/posts&filter[posts_per_page]=1&filter[category_name]=announcement"
 			})
 				.then(function(result) {
 					return result.data[0];
 				});
 		};

 		return this;

 	});