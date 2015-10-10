<?php
/** @file getapps.php
 *  @brief Wrapper for GET methods for applications
 */





/**
 * Remaps DB result to friendlier output for app
 * @param  AssocArray $data data returned from db
 * @return JSON       JSON Object
 */
function serializeJson($data)
{

	$applicant = array(
		"firstName" => $data["firstname"],
		"lastName" => $data["lastname"],
		"email" => $data["email"],
		"uin" => $data["uin"],
		"appType" => $data["memberType"],
		"netid" => $data["netid"],
		"year" => $data["year"],
		"shirt" => $data["shirt"],
		"appid" => $data["appid"]
	);
	$show = array(
		"genres" => $data["genre"],
		"bands" => array($data["band1"], $data["band2"], $data["band3"], $data["band4"], $data["band5"]),
		"times" => array($data["time1"], $data["time2"], $data["time3"], $data["time4"], $data["time5"], $data["time6"], $data["time7"], $data["time8"]),
		"genres" => $data["genre"],
		"name" => $data["name"],
		"description" => $data["description"]
	);


	$arr = array(
		"show" => $show,
		"applicant" => $applicant
		);

	return json_encode($arr);

}

/**
 * Returns app by net id
 * @param  string $netid Someone's netid
 * @return JSON        Application object
 */
function getAppByNetId($netid) 
{
	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM applications WHERE netid=:netid");

	$stmt->execute(array(
		"netid" => $netid
	));

	$result = $stmt->fetch();
	$stmt = null;
	$db = null;

	

	if ($result == null) 
	{
		return null;
	}
	else 
	{
		return serializeJson($result);
	}
	

}

/**
 * Returns all apps by an app id
 * @param  string $appid Application Id
 * @return JSON        Application object
 */
function getAppByAppId($appid)
{
	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM applications WHERE appid=:appid");
/*	$stmt = $db->prepare("SELECT * FROM applicant
		INNER JOIN applicantshow ON applicant.appid=applicantshow.appid
		INNER JOIN applicanttime ON applicant.appid=applicantshow.appid
		INNER JOIN applicantband ON applicant.appid=applicantband.appid
		WHERE applicant.appid=:appid");*/

	$stmt->execute(array(
		":appid" => $appid
	));

	$result = $stmt->fetch();

	$stmt = null;
	$db = null;

	if ($result == null) 
	{
		echo "{}";
	}
	else 
	{
		return serializeJson($result);
	}
}


/**
 * Returns all apps
 * @return JSON Array Applications
 */
function getApps()
{
	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM applications");

	$stmt->execute();
	$result = $stmt->fetchAll();
	// json_encode($result);
	$stmt = null;
	$db = null;
	return json_encode($result);
}



?>