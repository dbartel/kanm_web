<?php
/** @file virgins.php
 * @brief API Methods for handling firgins
 */

$app->get("/virgins", $authRequired(1), function() {
	$db = connectDb();
	$stmt = $db->prepare(
		"SELECT * FROM virgin"
	);
	$stmt->execute();
	$result = $stmt->fetchAll();

	echo json_encode($result);
});

$app->post("/virgins", $authRequired(2), function() use ($app) {
	$db = connectDb();
	$json = $app->request->getBody();
	$data = json_decode($json, true);

	$stmt = $db->prepare("INSERT INTO virgin (Artist, Album, genre, review) 
		VALUES (:artist,:album,:genre,:review)");

	$stmt->execute(array(
		":artist" => $data["artist"],
		":album" => $data["album"],
		":genre" => $data["genre"],
		":review" => $data["review"]
	));

	$stmt = null;
	$db = null;

});

$app->delete("/virgins/:id", $authRequired(2), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("DELETE FROM virgin WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));

});

?>