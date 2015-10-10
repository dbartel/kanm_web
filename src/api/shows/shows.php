<?php
/**@file shows.php
 * @brief API Methods for handling shows
 */


$app->get("/shows", function() {
	$pdh = connectDb();

	$stmt = $pdh->prepare(
		"SELECT * FROM active_shows"
		);

	$stmt->execute();
	$result = $stmt->fetchAll();



	$stmt = null;
	$pdh = null;
	echo json_encode($result);
});

$app->get("/shows/:id", function($id) {
	$pdh = connectDb();

	$stmt = $pdh->prepare(
		"SELECT * FROM shows WHERE pkey=:id"
	);

	$stmt->execute(array(
		":id" => $id
	));

	$show = $stmt->fetch();

	$stmt = $pdh->prepare(
		"SELECT * FROM active_djs WHERE showid=:id"
	);

	$stmt->execute(array(
		":id" => $id
	));

	$djs = $stmt->fetchAll();


	$stmt = $pdh->prepare(
		"SELECT * FROM playlist WHERE showid=:id"
	);

	$stmt->execute(array(
		":id" => $id
	));

	$sets = $stmt->fetchAll();

	$result = array(
		"show" => $show,
		"hosts" => $djs,
		"sets" => $sets
	);

	echo json_encode($result);
});


$app->put("/shows/description/:id", $authRequired(1), function($id) use ($app) {
	$db = connectDb();
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$stmt = $db->prepare("UPDATE shows SET ShowDescription=:description WHERE pkey=:id");
	$stmt->execute(array(
		":description" => $data["description"],
		":id" => $id
	));
	$stmt = null;
	$db = null;
});

$app->put("/shows/name/:id", $authRequired(2), function($id) use ($app) {
	$db = connectDb();
	$json = $app->request->getBody();
	$data = json_decode($json, true);

	$stmt = $db->prepare("UPDATE shows SET ShowName=:name WHERE pkey=:id");
	$stmt->execute(array(
		":name" => $data["name"],
		":id" => $id
	));
	$stmt = null;
	$db = null;
});

$app->post("/shows/picture/:id", $authRequired(1), function($id) use($app) {

	$db = connectDb();

	// Delete old picture
	$stmt = $db->prepare("SELECT ShowPicture FROM shows WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$result = $stmt->fetch();
	delete_pic($result["ShowPicture"]);


	// Upload new picture
	$img = $_FILES["file"];
	$filename = $id . "." . pathinfo($img["name"], PATHINFO_EXTENSION);
	$new_path = upload_pic($filename, $img, "showPics");

	$stmt = $db->prepare("UPDATE shows SET ShowPicture=:pic WHERE pkey=:id");
	$stmt->execute(array(
		":pic" => $new_path,
		":id" => $id
	));

	$stmt = null;
	$db = null;

});

$app->post("/shows/fromApp", $authRequired(2), function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$db = connectDb();
	/* Show
	 * 1. Check time conflict
	 * 2. Insert into show table
	 * 3. Insert into calendar
	 */

	if (showConflictExists($db, $data["time"])) 
	{
		// return 409 Conflict
		$db = null;
		$app->response->setStatus(409);
		return null;
	}

	//insert shows row
	$stmt = $db->prepare("INSERT INTO `shows` (ShowName) SELECT name FROM applicantshow WHERE appid=:id");

	$stmt->execute(array(
		":id" => $data["appId"]
	));

	//get show id
	$showId = $db->lastInsertId();

	// insert calendar row
	$stmt = $db->prepare("INSERT INTO `calendar` (timeslot, ShowID, active) VALUES (:time, :id, 1)");
	$stmt->execute(array(
		":time" => $data["time"],
		":id" => $showId
	));


	/* DJ
	 * if dj doesn't exist - insert dj row
	 * insert show_host row
	 */

	$stmt = $db->prepare("SELECT `netid` FROM applicant WHERE appid=:id");
	$stmt->execute(array(
		":id" => $data["appId"]
	));
	
	$djs = $stmt->fetchAll();

	foreach ($djs as $dj) {

		$stmt = $db->prepare("SELECT pkey FROM djs WHERE netid=:netid");
		$stmt->execute(array(
			":netid" => $dj["netid"]
		));

		if ($row = $stmt->fetch())
		{
			$djRef = $row["pkey"];
		}
		else 
		{
			$stmt = $db->prepare("INSERT INTO `djs` (firstname, lastname, email, uin, netid, shirt)
				SELECT (firstname, lastname, email, uin, netid, shirt) FROM applicant WHERE appid=:appid; 
				SELECT LAST_INSERT_ID() AS id");
			$stmt->execute(array(
				":appid" => $data["appId"]
			));
			$djRef = $db->lastInsertId();
		}

		// link dj to show
		$stmt = $db->prepare("INSERT INTO `show_host` (ShowID, DjID)
			VALUES (:showid, :djid)");
		$stmt->execute(array(
			":showid" => $showId,
			":djid" => $djRef
		));

		// update app status

		$stmt = $db->prepare("UPDATE `applicantshow` SET status='ADDED' WHERE appid=:appid");
		$stmt->execute(array(
			":appid" => $data["appId"]
		));
	}
});

// Get shows by day
$app->get("/shows/day/:day", function($day) {
	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM active_shows
		INNER JOIN active_djs ON active_djs.showid=active_shows.pkey
		WHERE ((SUBSTRING(timeslot, 1,1)=:day))
		ORDER BY timeslot");

	$stmt->execute(array(
		":day" => $day
	));

	$result = $stmt->fetchAll();
	echo json_encode($result);

});


?>
