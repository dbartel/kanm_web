<?php
/** @file postapps.php
 *  @brief methods for POST methods for applications
 * TODO: Explain application objects here
 */

/**
 * Posts a new application (show only)
 * Adds a new application to a show
 * show and user applications are tied by app id
 * @param Associated array with show information
 */
function PostNewShowApp($data, $id)
{
  $db = connectDb();
  // Insert applicant times
  $stmt = $db->prepare("INSERT INTO applicanttime (appid, time1, time2, time3, time4, time5, time6, time7, time8) 
				VALUES (:appid,:time1,:time2,:time3,:time4,:time5,:time6,:time7,:time8)");

  $times = $data["times"];
  for ($i = 0; $i < 8; $i++)
  {
    if (!isset($times[$i]))
    {
      $times[$i] = "";
    }
  }
  
  $stmt->execute(array(
    ":appid" => $id,
    ":time1" => $times[0],
    ":time2" => $times[1],
    ":time3" => $times[2],
    ":time4" => $times[3],
    ":time5" => $times[4],
    ":time6" => $times[5],
    ":time7" => $times[6],
    ":time8" => $times[7]
  ));

  $stmt = $db->prepare("INSERT INTO applicantshow (appid, name, description, genre)
			VALUES (:appid, :name, :description, :genre)");
  $stmt->execute(array(
    ":appid" => $id,
    ":description" => $data["description"],
    ":name" => $data["name"],
    ":genre" => implode(",", $data["genres"])
  ));

  // insert applicant bands
  $stmt_band = $db->prepare("INSERT INTO applicantband (appid, band1,band2,band3,band4,band5) 
			VALUES (:appid,:band1,:band2,:band3,:band4,:band5)");

  $band = $data["bands"];
  for ($i = 0; $i < 5; $i++) 
  {
    if (!isset($band[$i])) 
    {
      $band[$i] = "";
    }
  }
  $stmt_band->execute(array(
    ":appid" => $id,
    ":band1" => $band[0],
    ":band2" => $band[1],
    ":band3" => $band[2],
    ":band4" => $band[3],
    ":band5" => $band[4]
  ));
  
  $stmt = null;
  $db = null;  
  
}


/**
 * Posts a new application (person only)
 * Use this method for adding a new person (dj or general member)
 * @param Associated array with personal information
*/
function PostNewHumanApp($data)
{
  $db = connectDb();
  $stmt = $db->prepare("INSERT INTO applicant (firstname, lastname, email, year, uin, netid, memberType, appid, shirt)
		VALUES (:firstName, :lastName, :email, :year, :uin, :netid, :appType, :appid, :shirt)");

  $stmt->execute(array(
    ":firstName" => $data["firstName"],
    ":lastName" => $data["lastName"],
    ":email" => $data["email"],
    ":year" => $data["year"],
    ":uin" => $data["uin"],
    ":netid" => $data["netid"],
    ":appType" => $data["appType"],
    ":appid" => $data["appid"],
    ":shirt" => $data["shirt"]
  ));
  $stmt = null;
  $db = null;
  
}

