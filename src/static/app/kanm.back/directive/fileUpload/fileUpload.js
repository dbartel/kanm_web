// inspired by https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs

angular.module("kanmApp.back.directive")
	.directive("fileModel", function($parse) {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind("change", function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	})
	.service("fileUpload", function($http) {
		this.uploadFile = function(file, url) {
			var fd = new FormData();
			fd.append("file", file);
			return $http.post(url, fd, {
				transformRequest: angular.identity,
				headers: {"Content-Type": undefined}
			});
		};

	});