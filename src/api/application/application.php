<?php 

/** @file application.php
 *	@brief API Methods for KANM Applications
 */


require "appUtils.php";
require "apptype.php";
require "getapps.php";
require "postapps.php";

$path = "/application";


/**
 * @brief Generates an application ID
 * @details Generates the id stored internally for referencing application tables in the DB
 * @return Application ID String
 */
function generateAppId() {
	return substr(md5(microtime()),rand(0,26),8);
}


function application_get($app) 
{
	if (isset($_GET["netid"]))
	{
		$response = getAppByNetId($_GET["netid"]);
	}
	else if (isset($_GET["appid"]))
	{
		$response = getAppByAppId($_GET["appid"]);
	}
	else
	{
		$response = getApps();
	}

	if ($response == null)
	{
		$app->response->setStatus(204);
	}
	else
	{
		echo $response;
	}

}

/**
 * @Property Get get
 */
$app->get("/application", function() use($app) {
	$response = getApps();
	echo $response;
});

$app->get("/application/netid/:id", function($id) use($app) {
	$response = getAppByNetId($id);

	if ($response == null) $app->response->setStatus(204);
	echo $response;
});

$app->get("/application/appid/:id", function($id) use ($app) {
	$response = getAppByAppId($id);

	if ($response == null) $app->response->setStatus(204);

	
		
	echo $response;
});

$app->post($path, function() use($app) {
  //get app data
  $json = $app->request->getBody();
  $data = json_decode($json, true);

  // if it's a show app, create the appropriate records
  if (isset($data["show"]))
  {
    PostNewShowApp($data["show"], $data["applicant"]["appid"]);
  }

  PostNewHumanApp($data["applicant"]);

});

$app->put($path, function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);

	$db = connectDb();

	// update applicant
	$stmt = $db->prepare("UPDATE applicant 
		SET 
			firstname=:firstname,
			lastname=:lastname,
			email=:email,
			year=:year,
			uin=:uin,
			memberType=:memberType,
			shirt=:shirt
		WHERE appid=:appid AND netid=:netid"
	);

	$stmt->execute(array(
		":firstname" => $data["applicant"]["firstName"],
		":lastname" => $data["applicant"]["lastName"],
		":email" => $data["applicant"]["email"],
		":year" => $data["applicant"]["year"],
		":uin" => $data["applicant"]["uin"],
		":memberType" => $data["applicant"]["appType"],
		":shirt" => $data["applicant"]["shirt"],
		":appid" => $data["applicant"]["appid"],
		":netid" => $data["applicant"]["netid"]
	));

	// update applicant show
	$stmt = $db->prepare("UPDATE applicantshow
		SET
			name=:name,
			description=:description,
			genre=:genre
		WHERE appid=:appid"
	);

	$stmt->execute(array(
		":name" => $data["show"]["name"],
		":description" => $data["show"]["description"],
		":genre" => implode(",", $data["show"]["genres"]),
		":appid" => $data["applicant"]["appid"]
	));


	// update applicanttime
	$stmt = $db->prepare("UPDATE applicanttime
		SET
			time1=:time1,
			time2=:time2,
			time3=:time3,
			time4=:time4,
			time5=:time5,
			time6=:time6,
			time7=:time7,
			time8=:time8
		WHERE appid=:appid"
	);

	$times = prepareArray($data["show"]["times"], 8);

	$stmt->execute(array(
		":time1" => $times[0],
		":time2" => $times[1],
		":time3" => $times[2],
		":time4" => $times[3],
		":time5" => $times[4],
		":time6" => $times[5],
		":time7" => $times[6],
		":time8" => $times[7],
		":appid" => $data["applicant"]["appid"]
	));

	// update applicantband

	$bands = prepareArray($data["show"]["bands"], 5);

	$stmt = $db->prepare("UPDATE applicantband
		SET
			band1=:band1,
			band2=:band2,
			band3=:band3,
			band4=:band4,
			band5=:band5
		WHERE appid=:appid"
	);

	$stmt->execute(array(
		":band1" => $bands[0],
		":band2" => $bands[1],
		":band3" => $bands[2],
		":band4" => $bands[3],
		":band5" => $bands[4],
		":appid" => $data["applicant"]["appid"]
	));

});

$app->delete($path, function() {
	$db = connectDb();

	if (isset($_GET["appid"]) && isset($_GET["netid"]))
	{
		$appid = $_GET["appid"];
		$netid = $_GET["netid"];

		$stmt = $db->prepare("SELECT COUNT(pkey) AS total FROM applicant
			WHERE appid=:id");
		$stmt->execute(array(
			":id" => $appid
		));

		if ($row = $stmt->fetch())
		{
			// if there aren't any cohosts, delete the whole app
			if ($row["total"] <= 1)
			{
				$stmt = $db->prepare("DELETE FROM applicantshow WHERE appid=:id");
				$stmt->execute(array(
					":id" => $appid
				));

				$stmt = $db->prepare("DELETE FROM applicantband WHERE appid=:id");
				$stmt->execute(array(
					":id" => $appid
				));

				$stmt = $db->prepare("DELETE FROM applicanttime WHERE appid=:id");
				$stmt->execute(array(
					":id" => $appid
				));
			}

			//delete applicant
			$stmt = $db->prepare("DELETE FROM applicant WHERE netid=:id");
			$stmt->execute(array(
				":id" => $netid
			));
		}
		$stmt = null;
		$db = null;

	}


});

$app->delete("/application/all", function() {
	$db = connectDb();
	$db->exec("DELETE FROM applicant");
	$db->exec("DELETE FROM applicantshow");
	$db->exec("DELETE FROM applicanttime");
	$db->exec("DELETE FROM applicantband");
	$db = null;	
});


// add cohost - just add the applicant, no show info
$app->post("/application/cohost", function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	PostNewHumanApp($data["applicant"]);
});


?>
