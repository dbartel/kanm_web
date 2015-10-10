<?php

$app->get("/officers", function() {

	$db = connectDb();

	$stmt = $db->prepare("SELECT * FROM officers");

	$stmt->execute();

	$result = $stmt->fetchAll();
	$officers = array();
	
	foreach ($result as $row)
	{
		array_push($officers,$row);
	}
	echo json_encode($officers);
  
});

$app->get("/officers/:id", function($id) {
	$db = connectDb();
	$stmt = $db->prepare("SELECT position_title,office_hours,contact,picture FROM officer WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));

	$result = $stmt->fetch();
	echo json_encode($result);

	$stmt = null;
	$db = null;

});

?>
