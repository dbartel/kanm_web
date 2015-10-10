<?php

function generateSetId() {
	return substr(md5(microtime()),rand(0,26),8);
}

function getSetId($showid)
{
	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM playlist 
		WHERE `TS` > SUBDATE( CURRENT_TIMESTAMP, INTERVAL 2 HOUR) AND ShowId=:id");

	$stmt->execute(array(
		":id" => $showid
	));

	if ($result = $stmt->fetch())
	{
		return $result["SetId"];
	}
	else
	{
		return generateSetId();
	}
}

function getVirginId($artist, $album)
{
	$db = connectDb();
	$stmt = $db->prepare("SELECT pkey FROM virgin WHERE Artist LIKE :artist AND Album LIKE :album");

	$stmt->execute(array(
		":artist" => $artist,
		":album" => $album
	));

	if ($result = $stmt->fetch())
	{
		return $result["pkey"];
	}
	else
	{
		return null;
	}
}

$app->get("/playlist", function() {
});

function playlistInsert($arr)
{
	$db = connectDb();
	$stmt = $db->prepare("INSERT INTO playlist
		(Track, Artist, Album, VirginId, SetId, ShowId, psa, StatId) VALUES (:track, :artist, :album, :virgin, :setid, :showid, :psa, :statid)");
	$stmt->execute($arr);
	$stmt = null;
	$db = null;
}

$app->post("/playlist/track", $authRequired(1), function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);

	$setId = getSetId($data["showId"]);
	$virginId = getVirginId($data["artist"], $data["album"]);

	$newPlaylistRow = array(
		":track"  => $data["track"],
		":artist" => $data["artist"],
		":album"  => $data["album"],
		":virgin" => $virginId,
		":setid"  => $setId,
		"showid"  => $data["showId"],
		"psa"     => 0,
		"statid"  => 0
	);

	playlistInsert($newPlaylistRow);


});

$app->post("/playlist/psa", $authRequired(1), function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$setId = getSetId($data["showId"]);


	$newPlaylistRow = array(
		":track"  => "PSA",
		":artist" => "PSA",
		":album"  => "PSA",
		":virgin" => null,
		":setid"  => $setId,
		"showid"  => $data["showId"],
		"psa" => 1,
		"statid"  => 0
	);
	playlistInsert($newPlaylistRow);

});

$app->post("/playlist/statid", $authRequired(1), function() use($app) {
	$json = $app->request->getBody();
	$data = json_decode($json, true);
	$setId = getSetId($data["showId"]);
	$newPlaylistRow = array(
		":track"  => "StationId",
		":artist" => "StationId",
		":album"  => "StationId",
		":virgin" => null,
		":setid"  => $setId,
		"showid"  => $data["showId"],
		"psa" => 0,
		"statid"  => 1		
	);
	playlistInsert($newPlaylistRow);
});

// SELECT * FROM `playlist` WHERE `TS` > NOW() - INTERVAL 2 HOUR

$app->get("/playlist/NowPlaying", function() {
	$db = connectDb();
	$stmt = $db->prepare("SELECT playlist.*, shows.ShowName FROM `playlist`
		INNER JOIN shows ON playlist.ShowId=shows.pkey
		WHERE SetId=(SELECT setid FROM `playlist` WHERE `TS` > NOW() - INTERVAL 2 HOUR ORDER BY pkey DESC LIMIT 1)
		AND PSA=0 AND StatId=0");
	$stmt->execute();
	$result = $stmt->fetchAll();
	echo json_encode($result);
	$stmt = null;
	$db = null;
});

$app->get("/playlist/current/:id", function($id) {
	$db = connectDb();

	if ($setid = getSetId($id))
	{
		$stmt = $db->prepare("SELECT pkey, Track, Album, Artist 
			FROM playlist WHERE SetId=:setid");

		$stmt->execute(array(
			":setid" => $setid
		));

		$playlist = $stmt->fetchAll();

		$stmt = $db->prepare("SELECT SUM(PSA) as psa, COUNT(VirginId) as virgin, SUM(StatId) as stationid
			FROM playlist WHERE SetId=:setid");
		$stmt->execute(array(
			":setid" => $setid
		));

		$info = $stmt->fetch();

		$set = array(
			"playlist" => $playlist,
			"info" => $info
		);

		echo json_encode($set);

	}
	else echo "{}";
	$stmt = null;
	$db = null;

});


$app->delete("/playlist/:id", $authRequired(1), function($id) {
	$db = connectDb();
	$stmt = $db->prepare("DELETE FROM playlist WHERE pkey=:id");
	$stmt->execute(array(
		":id" => $id
	));
	$stmt = null;
	$db = null;
});


?>
