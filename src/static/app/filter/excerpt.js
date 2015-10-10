angular.module("kanmApp")
	.filter("excerpt", function() {
		return (function(excerpt) {
			return excerpt.replace(/Continue reading.*/, "");
		});
	});