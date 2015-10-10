<?php
/**
 * @brief App Types
 * @details [long description]
 * 
 * @param slot [description]
 * @return [description]
 */

$applicationTypes = array(
	"returning_new" => array(
		"name" => "DJ",
		"desc" => "Dues: $25. You will receive a new time slot",
		"value" => "RETURNING_NEW"),
	"returning_same" => array(
		"name" => "Returning DJ (same slot)",
		"desc" => "Dues: $25. Select this if you want the same timeslot",
		"value" => "RETURNING_SAME"),
	"general" => array(
		"name" => "General Member",
		"desc" => "Dues: $10. Basic membership to KANM, no show, still a part of the station through crews, meetings etc.",
		"value" => "GENERAL"
	),
	"new" => array(
		"name" => "New DJ",
		"desc" => "Dues: $30. You get a show",
		"value" => "NEW"
	)
);	

$app->get("/application/types", function() use($applicationTypes) {

	/* if user exists in db
	 * 		- if user has a show id: returning_new, returning_same
	 *		- else returning new
	 * if user doesn't exist in db: general, new
	 * if application exists -> set update flag to true
	 */

	$db = connectDb();

	$stmt = $db->prepare("SELECT ShowID, djs.* FROM djs
		LEFT JOIN show_host ON djs.pkey=show_host.DjID
		WHERE djs.netid=:netid");

	$stmt->execute(array(
		":netid" => $_GET["netid"]
	));

	if ($result = $stmt->fetch())
	{
		// fetch old timeslot

		if ($result["ShowID"] != null)
		{
			$stmt = $db->prepare("SELECT timeslot FROM calendar WHERE ShowID=:id 
				ORDER BY pkey DESC LIMIT 1");

			$stmt->execute(array(
				":id" => $result["ShowID"]
			));

			if ($calResult = $stmt->fetch())
			{
				$timeslot = $calResult["timeslot"];
			}

			$arr = array(
				"timeslot" => $timeslot,
				"appTypes" => array(
					$applicationTypes["returning_same"],
					$applicationTypes["returning_new"],
					$applicationTypes["general"]
				)
			);
		}
		else
		{
			$arr = array(
				"timeslot" => null,
				"appTypes" => array(
					$applicationTypes["returning_new"],
					$applicationTypes["general"]					
				)
			);
		}

	}
	else
	{
		$arr = array(
			"timeslot" => null,
			"appTypes" => array(
				$applicationTypes["new"],
				$applicationTypes["general"]
			)
		);
	}
	$stmt = null;
	$db = null;


	echo json_encode($arr);
});

?>