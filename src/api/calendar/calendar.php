<?php

$app->put("/calendar/:id", function($id) {
	$db = connectDb();

	$stmt = $db->prepare("UPDATE calendar SET active=0 WHERE ShowID=:id");
	$stmt->execute(array(
		":id" => $id
	));

	$stmt = null;
	$db = null;
});

$app->put("/calendar/reschedule/:id", function($id) use ($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$new_time = $data["time"];
	$db = connectDb();

	// check conflict
	if (showConflictExists($db, $new_time)) 
	{
		$db = null;
		$app->response->setStatus(409);
		return null;
	}

	// update timeslot
	$stmt = $db->prepare("UPDATE calendar SET timeslot=:time WHERE ShowID=:id");
	$stmt->execute(array(
		":time" => $new_time,
		":id" => $id
	));

	$stmt = null;
	$db = null;
});



?>
