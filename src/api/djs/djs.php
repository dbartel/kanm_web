<?php
/** @file djs.php
 * @brief API Methods for DJs
 */


$app->get("/djs", function() {
	$db = connectDb();
	

	if (isset( $_GET['netid'] ) && !empty( $_GET['netid'] )) {
		$netid = $_GET["netid"];
		$stmt = $db->prepare("SELECT * FROM djs WHERE netid=:id");
		$stmt->execute(array(
			":id" => $netid
		));
		$result = $stmt->fetch();
	}
	else {
		$stmt = $db->prepare("SELECT * FROM active_djs GROUP BY netid");
		$stmt->execute();
		$result = $stmt->fetchAll();
	}

	$stmt = null;
	$db = null;
	echo json_encode($result);
});

$app->delete("/djs/:id", $authRequired(2), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("DELETE FROM djs WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$stmt = null;
	$db = null;
});


?>
