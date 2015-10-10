<?php




/**
 * Set up a mysql connection
 * @return PDO Object A PDO object with a connection to the MySQL database
 */
function connectDb()
{
	$config = parse_ini_file("config.ini", true);
	return new PDO($config["database"]["dsn"], $config["database"]["user"], $config["database"]["password"]);
}

/** 
 * Include modules 
*/
//utility methods
require "api/utils/time_utils.php";
require "api/utils/image_upload.php";

//API methods
require "api/auth/auth.php";
require "api/shows/shows.php";
require "api/application/application.php";
require "api/officers/officers.php";
require "api/djs/djs.php";
require "api/virgins/virgins.php";
require "api/playlist/playlist.php";
require "api/pd/pd.php";
require "api/generalMembers/generalMembers.php";
require "api/showHost/showHost.php";
require "api/calendar/calendar.php";
require "api/members/members.php";
/** 
 * Include modules 
*/


?>
