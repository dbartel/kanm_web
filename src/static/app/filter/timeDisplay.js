angular.module("kanmApp.filters").filter("timecode", function() {
	return function(code, excludeDay) {


		/**
		 * @property days
		 * Enumerated day array - Sunday is 0, Saturday is 6
		 */
		var days = ["Sunday", "Monday", "Tuesday" , "Wednesday", "Thursday", "Friday", "Saturday"];

		/**
		 * @property timeCodes
		 * Time codes
		 */
		var timeCodes = {
			"00": "12:00 am",
			"01": "1:00 am",
			"02": "2:00 am",
			"03": "3:00 am",
			"04": "4:00 am",
			"05": "5:00 am",
			"06": "6:00 am",
			"07": "7:00 am",
			"08": "8:00 am",
			"09": "9:00 am",
			"10": "10:00 am",
			"11": "11:00 am",
			"12": "12:00 pm",
			"13": "1:00 pm",
			"14": "2:00 pm",
			"15": "3:00 pm",
			"16": "4:00 pm",
			"17": "5:00 pm",
			"18": "6:00 pm",
			"19": "7:00 pm",
			"20": "8:00 pm",
			"21": "9:00 pm",
			"22": "10:00 pm",
			"23": "11:00 pm",
			"24": "12:00 am"
		};

		var day = code[0];
		var startTime = String(code[1]) + String(code[2]);
		var endTime = String(code[3]) + String(code[4]);

		return excludeDay
			? timeCodes[startTime] + "-" + timeCodes[endTime]
			: days[day] + ": " + timeCodes[startTime] + "-" + timeCodes[endTime];
	};
});