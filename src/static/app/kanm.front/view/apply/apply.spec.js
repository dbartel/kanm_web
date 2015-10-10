describe("ApplyCtrl", function() {
	var scope;

	beforeEach(function() {
		// module("kanmApp");
		module("kanmApp.front");
		module("kanmApp.services");
		module("kanmApp.filters");
		// module("templates");

		inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			var app = {
				show: {
					times: []
				}
			};

			var user = {
				netid: "danbartel"
			};

			var applicationStub = {
				submitApp: function() {

				}
			};

			$controller("ApplyCtrl", {
				$scope: scope,
				application: applicationStub,
				app: app,
				user: user
			});
		});
	});

	describe("intialization", function() {
		var year;
		beforeEach(function() {
			year = new Date().getUTCFullYear();
		});
		it("should intialize years properly", function() {
			expect(scope.years[0]).toBe(year);
		});

	});

	describe("addGenre function", function() {
		beforeEach(function() {
			scope.genreSelect = "New Genre";
		});
		describe("with less than 3 genres", function() {
			beforeEach(function() {
				scope.data.show.genres = [];
			});
			it("should add the genre to the application", function() {
				scope.addGenre();
				expect(scope.data.show.genres[0]).toEqual(scope.genreSelect);
			});			
		});
		describe("with 3 genres", function() {
			beforeEach(function() {
				scope.data.show.genres = _.fill(Array(3), "genre");
			});
			it("should not add the genre to the application", function() {
				scope.addGenre();
				expect(scope.data.show.genres.length).toEqual(3);
			});
		});


	});

	describe("addBand function", function() {
		var bands;
		beforeEach(function() {
			scope.bandInput = "New Band";
		});
		describe("with less than 5 bands", function() {
			beforeEach(function() {
				scope.data.show.bands = [];
			})
			it("should add a band to the application", function() {
				scope.addBand();
				expect(scope.data.show.bands[0]).toEqual(scope.bandInput);
			});
		});

		describe("with 5 bands", function() {
			beforeEach(function() {
				scope.data.show.bands = _.fill(Array(5), "band");
			})
			it("should not add a band to the application", function() {
				scope.addBand();
				expect(scope.data.show.bands.length).toEqual(5);
			});
		});
	});

	describe("removeItem", function() {
		var arr, expected;
		beforeEach(function() {
			arr = [1,2,3];
			expected = [2,3];
		});
		it("should remove an item in place", function() {
			scope.removeItem(0, arr);
			expect(arr.length).toEqual(2);
			expect(arr.indexOf(1)).toEqual(-1);
		});
	});

	describe("addItem", function() {
		var newItem, arr, len;
		beforeEach(function() {
			newItem = "New Item";
			len = 3;
		});
		describe("with a full array", function() {
			beforeEach(function() {
				arr = _.fill(Array(len), newItem);
			});
			it("should not add to the array", function() {
				scope.addItem(newItem, arr, len);
				expect(arr.length).toEqual(len);
			});
		});

		describe("with a nonfull array", function() {
			beforeEach(function() {
				arr = [];
			});
			it("should add to the array", function() {
				scope.addItem(newItem, arr, len);
				expect(arr[0]).toEqual(newItem);
			});
		});
	});
});