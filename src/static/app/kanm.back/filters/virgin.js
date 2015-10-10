angular.module("kanmApp.back.filters")
.filter("virginSearch", function() {
	return function(arr, name, genre) {
		var newArr = _.filter(arr, function(el) {
			return 
				( el.Artist.indexOf(name) > -1 || el.Album.indexOf(name) > -1 ) && el.genre.indexOf(genre) > -1;
			});
		return newArr
	};
});
