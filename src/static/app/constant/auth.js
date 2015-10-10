/*
 * Holds levels of authorization to check against
 */

angular.module("kanmAppConstants")
	.constant("auth", {
		CAS: "CAS",
		DJ: "DJ",
		OFFICER: "OFFICER"
	});