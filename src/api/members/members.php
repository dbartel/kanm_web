<?php

// Get all members (djs & general)
$app->get("/members", function() {
	$db = connectDb();

	$stmt = $db->prepare("SELECT * FROM active_djs GROUP BY netid");
	$stmt->execute();
	$djs = $stmt->fetchAll();


	$stmt = $db->prepare("SELECT djs.* FROM general_member 
		INNER JOIN djs ON general_member.DjId=djs.pkey");

	$stmt->execute();
	$generalMembers = $stmt->fetchAll();

	$members = array(
		"dj" => $djs,
		"general" => $generalMembers
	);

	echo json_encode($members);
	$stmt= null;
	$db = null;

});


?>
