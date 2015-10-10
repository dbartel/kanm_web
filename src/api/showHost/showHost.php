<?php

$app->delete("/showHost/:showId/:djId", $authRequired(2), function($showId, $djId) {
	$db = connectDb();
	$stmt = $db->prepare("DELETE FROM show_host WHERE ShowID=:showid AND DjID=:djid");
	$stmt->execute(array(
		":showid" => $showId,
		":djid" => $djId
	));

	$stmt = null;
	$db = null;
});

$app->post("/showHost/:showId/:djId", $authRequired(2), function($showId, $djId) {
	$db = connectDb();
	$stmt = $db->prepare("INSERT INTO `show_host` (ShowId, DjId)
		VALUES (:show, :dj)");
	$stmt->execute(array(
		":show" => $showId,
		":dj" => $djId
	));

	$stmt = null;
	$db = null;
});

?>
