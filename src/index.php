<?php

/** @file index.php
 * @brief Entry point to application
 */

require "vendor/autoload.php";


// start up session
session_cache_limiter(false);
session_start();

// instantiate app
$app = new \Slim\Slim(array(
    "debug" => true,
    "templates.path" => "."
));

// load in api methods
require "api/index.php";

// default render
$app->get("/", function() use($app) {
  $app->render("static/index.html");
});

// onair playlist (for display in station)
$app->get("/onair", function() use ($app) {
	$app->render("onair/index.html");
});

// start it up
$app->run();



?>
