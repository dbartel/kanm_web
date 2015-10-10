/**
 * @class kanmApp.services.timeutils
 * Provides helper methods for time conversion
 */
angular.module("kanmApp.services").factory("timeutils", function() {
	/**
	 * @property days
	 * Enumerated day array - Sunday is 0, Saturday is 6
	 */
	this.days = ["Sunday", "Monday", "Tuesday" , "Wednesday", "Thursday", "Friday", "Saturday"];

	/**
	 * @property timeCodes
	 * Time codes
	 */
	this.timeCodes = {
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


	/**
	 * @method codeToString
	 * Converts a time code to a readable string
	 * @param {String} code The timecode to convert
	 * @returns {String} A readable time string
	 */
	this.codeToString = function(code, excludeDay) {
		var day = code[0];
		var startTime = String(code[1]) + String(code[2]);
		var endTime = String(code[3]) + String(code[4]);

		return excludeDay
			? this.timeCodes[startTime] + "-" + this.timeCodes[endTime]
			: this.days[day] + ": " + this.timeCodes[startTime] + "-" + this.timeCodes[endTime];
	}

	/**
	 * @method addHour
	 * Adds an hour to an hour timecode
	 * @param {String} hour the hour to iterate
	 * @returns {String} the hour iterated by one
	 */
	this.addHour = function(hour) {
		if (hour[0] == "0") {
			var num = hour[1];
			num = parseInt(hour) + 1;
			if (num == 10) {
				return String(num);
			}
			else {
				return "0" + String(num);
			}

		}
		else {
			hour = parseInt(hour) + 1;
			return String(hour);
		}

	}

	/**
	 * @method generateCode
	 * Generates a timecode
	 * @param {Number} day The day that is started
	 * @param {String} begin The beginning time code
	 * @param {Number} length The length of time (in hours)
	 * @returns {String} The generated timecode
	 */
	this.generateCode = function(day, begin, length) {
		var end = String(begin);
		for (var i = 0; i < length; i++) {
			end = this.addHour(end);
		}
		return String(day) + String(begin) + String(end);
	}

	/*
	 * @method getDuration
	 * Gets the duration (in hours) of a timecode
	 * @param {String} code A time code
	 * @return {Number} The duration (in hours)
	 */
	this.getDuration = function(code) {
		var startTime = parseInt(String(code[1]) + String(code[2]));
		var endTime = parseInt(String(code[3]) + String(code[4]));    
		return endTime - startTime;
	}	
	return this;
});