<?php
/** @file pd.php
 * @brief Provides API methods for the programming director
 */

$app->put("/shows/:id/strike", $authRequired(2), function($id) {
	$db = connectDb();

	$stmt = $db->prepare("UPDATE djs
		LEFT JOIN show_host ON show_host.DjId=djs.pkey
		SET strikes=strikes+1
		WHERE ShowID=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$stmt = null;
	$db = null;
});

/**
* @brief strike a dj
* @param id - pkey of dj
*/
$app->put("/djs/:id/strike", $authRequired(2), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("UPDATE djs SET strikes=strikes+1 WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$stmt = null;
	$db = null;
});

$app->put("/djs/:id/points/:amount", $authRequired(2), function($id, $amount) {
	$db = connectDb();
	$stmt = $db->prepare("UPDATE djs SET points=points+:amount WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id,
		":amount" => $amount
	));
	$stmt = null;
	$db = null;
});

$app->put("/djs/:id/points/clear", $authRequired(2), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("UPDATE djs SET points=0 WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$stmt = null;
	$db = null;
	
});

$app->get("/shows/:id/audit", $authRequired(2), function($id) {

	$db = connectDb();
	$stmt = $db->prepare("SELECT SetId, TS, COUNT(VirginId) AS 'virgin', SUM(PSA) AS 'psa' , SUM(StatId) as 'stationId', playlist.ShowId, calendar.timeslot, shows.ShowName, shows.Specialty
		FROM playlist
		INNER JOIN calendar ON playlist.ShowId=calendar.ShowID
		INNER JOIN shows ON playlist.ShowId=shows.pkey
		WHERE SetId=
			(SELECT SetId FROM playlist WHERE ShowId=:id ORDER BY TS DESC LIMIT 1)");

	//First get their last set
	$stmt->execute(array(
		":id" => $id
	));

	$result = $stmt->fetch();
	$duration = getDuration($result["timeslot"]);

	if ($result["TS"])
	{
		$stationIdCount = 1 * $duration;
		$virginCount = 3 * $duration;

		$today = new DateTime();
		$showDate = new DateTIme($result["TS"]);
	
		$dateDiff = $today->diff($showDate, true)->days;

		if ($result["Specialty"] == 1)
		{
			$status = array(
				"name" => $result["ShowName"],
				"showId" => $result["ShowId"],
				"virgin" => false,
				"stationId" => ($result["stationId"] < $stationIdCount),
				"date" => $dateDiff > 7,
				"duration" => $duration,
				"specialty" => true

			);
		}
		else
		{
			$status = array(
				"name" => $result["ShowName"],
				"showId" => $result["ShowId"],
				"virgin" => ($result["virgin"] < $virginCount),
				"stationId" => ($result["stationId"] < $stationIdCount),
				"date" => $dateDiff > 7,
				"duration" => $duration,
				"specialty" => $result["Specialty"]
			);
		}
	}
	else
	{
		$stmt = $db->prepare("SELECT ShowName, Specialty FROM shows WHERE pkey=:id");
		$stmt->execute(array(
			":id" => $id
		));
		$result = $stmt->fetch();
		$status = array(
			"name" => $result["ShowName"],
			"showId" => $id,
			"virgin" => false,
			"stationId" => false,
			"date" => true,
			"duration" => $duration,
			"specialty" => $result["Specialty"]

		);
	}

	$stmt = $db->prepare("SELECT *
		FROM playlist WHERE ShowId=:id");
	$stmt->execute(array(
		":id" => $id
	));

	$result = $stmt->fetchAll();
	$status["sets"] = $result;

	$stmt = null;
	$db = null;

	echo json_encode($status);
});

$app->put("/shows/:id/specialty", $authRequired(2), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("SELECT Specialty FROM shows WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));

	$result = $stmt->fetch();
	if($result["Specialty"] == 0) $specialty = 1;
	else $specialty = 0;

	$stmt = $db->prepare("UPDATE shows SET Specialty=:spec
		WHERE pkey=:id");
	$stmt->execute(array(
		":spec" => $specialty,
		":id" => $id
	));
	$stmt = null;
	$db = null;
});

?>

