<?php

$app->get("/generalMembers", function() {
	$db = connectDb();

	$stmt = $db->prepare("SELECT * FROM general_member
		INNER JOIN djs ON djs.pkey=general_member.DjId");
	$stmt->execute();
	echo json_encode($stmt->fetchAll());

});

$app->post("/generalMembers/fromApp", $authRequired(2), function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$db = connectDb();

	$stmt = $db->prepare("SELECT `netid` FROM applicant WHERE appid=:id");
	$stmt->execute(array(
		":id" => $data["appId"]
	));

	$result = $stmt->fetch();
	$netid = $result["netid"];


	$stmt = $db->prepare("SELECT pkey FROM djs WHERE netid=:netid");
	$stmt->execute(array(
		":netid" => $netid
	));

	print_r($stmt->errorInfo());

	if ($row = $stmt->fetch())
	{
		$dbRef = $row["pkey"];

	}
	else
	{
		$stmt = $db->prepare("INSERT INTO `djs` (firstname, lastname, email, uin, netid, shirt)
			SELECT firstname, lastname, email, uin, netid, shirt FROM applicant WHERE appid=:appid"
		);
		$stmt->execute(array(
			":appid" => $data["appId"]
		));

		print_r($stmt->errorInfo());

		$dbRef = $db->lastInsertId();
	}

	$stmt = $db->prepare("INSERT INTO `general_member` (DjId) VALUES (:id)");
	$stmt->execute(array(
		":id" => $dbRef
	));

	print_r($stmt->errorInfo());

	$stmt = $db->prepare("UPDATE `applicantshow` SET status='ADDED' WHERE appid=:appid");
	$stmt->execute(array(
		":appid" => $data["appId"]
	));

	print_r($stmt->errorInfo());

});


?>