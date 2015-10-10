<?php
/** @file auth.php
 * @brief Provides authorization API routes and PHPSlim auth middleware
 */

require "middleware.php";

$_ROLES = array(
	"PUBLIC" => 0,
	"DJ" => 1,
	"OFFICER" => 2
);


function redirectNoAuth()
{
	$app = \Slim\Slim::getInstance();
	$app->redirect($app->urlFor("noauth"));	
}

/**
 * @method authRequired
 * @brief middleware method for authorization levels
 * @param role the role required
*/
$authRequired = function( $role = 0 )  use($_ROLES) {
	return function() use ($role, $_ROLES) {

		if ($role > $_ROLES["PUBLIC"] && !isset($_SESSION["access"]))
		{
			redirectNoAuth();
		}

		switch ($role) {
			case $_ROLES["DJ"]:
				if (!$_SESSION["access"]["DJ"]) redirectNoAuth();
				break;
			case $_ROLES["OFFICER"]:
				if (!$_SESSION["access"]["OFFICER"]) redirectNoAuth();
				break;
		}
	};
};


$app->get("/login", function() use($app) {
	// CAS redirect goes here
	// on CAS success we get user's netid
	$netid = authenticate();

	// access object
	$access = array(
		"OFFICER" => false,
		"DJ" => false,
		"CAS" => true
	);

	$user = array(
		"netid" => $netid,
		"shows" => array(),
		"officerid" => ""
	);


	$db = connectDb();
	$stmt = $db->prepare("SELECT * FROM authorization WHERE netid=:netid ORDER BY ShowID DESC");
	$stmt->execute(array(
		":netid" => $netid
	));

	// if lookup successful, assign session stuff and redirect
	if ($result = $stmt->fetchAll())
	{
		$info = $result[0];

		// Officer access check
		if (isset($info["officerId"]))
		{
			$access["OFFICER"] = true;
			$user["officerid"] = $info["officerId"];
		}

		// Show access check
		$shows = array();
		foreach($result as $row)
		{
			if (isset($row["ShowID"]))
			{
				$access["DJ"] = true;
				array_push($shows, $row["ShowID"] );
			}
		}
		$user["shows"] = $shows; 
	}
	$_SESSION["access"] = $access;
	$_SESSION["userInfo"] = $user;

	// optionally redirect e.g. redirect to apply state
	if (isset($_GET["redirect"]))
	{
		$app->response->redirect("/#/" . $_GET["redirect"]);
	}
	else
	{
		$app->response->redirect("/");
	}
});

// returns session access if present, 403 if not present
$app->get("/auth/status", function() use($app) {
	if (isset($_SESSION["access"]))
	{
		echo json_encode($_SESSION["access"]);
	}
	else
	{
		$app->response->setStatus(401);
	}
});

$app->get("/auth/user", function() use ($app) {
	if (isset($_SESSION["userInfo"]))
	{
		echo json_encode($_SESSION["userInfo"]);
	}
	else
	{
		$app->response->setStatus(401);
	}
});

$app->get("/logout", function()  use($app) {
	// don't log all the way out of CAS, just out of KANM
	session_unset();
	$app->response->redirect("/");
});

// login
$app->get("/noauth", function() use ($app) {
	$app->response->setStatus(401);
	$app->render("noAuth.html");
})->name("noauth");


$app->put("/auth/show/:id", $authRequired(1), function($id) use($app) {

		//check if it's a valid showid
		if ($index = array_search($id, $_SESSION["userInfo"]["shows"]))
		{
				// swap elements
				$tmp = $_SESSION["userInfo"]["shows"][0];
				$_SESSION["userInfo"]["shows"][0] = $_SESSION["userInfo"]["shows"][$index];
				$_SESSION["userInfo"]["shows"][$index] = $tmp;
		}
		else
		{
				//if not in array, bad request
				$app->response->setStatus(400);
		}
});

?>
