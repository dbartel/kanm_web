<?php
require( dirname(__FILE__) . '/wp-load.php' );

// Allows session authentication with wordpress

function getUser($netid)
{
	$wpUser = new WP_User();
	$user = $wpUser->get_data_by("login", $netid);

	$user = new WP_User($user->ID);

	if ($user->ID == 0)
	{
		$newUserData = array(
			"user_email" => $_SESSION["userInfo"]["netid"] . "@tamu.edu",
			"user_login" => $netid,
			"first_name" => "KANM",
			"last_name" => "Staff",
			"role" => "contributor"
		);

		if ($_SESSION["access"]["OFFICER"])
		{
			$newUserData["role"] = "administrator";
		}

		$newUserId = wp_insert_user($newUserData);
		$user = new WP_User($newUserId);
		return $user;
	}
	else
	{
		return $user;
	}

}

function authenticate_wp_user()
{
	if (isset($_SESSION["access"]) && ( isset($_SESSION["access"]["DJ"]) || isset($_SESSION["access"]["OFFICER"])))
	{
		$user = getUser($_SESSION["userInfo"]["netid"]);
		if (!is_wp_error($user))
		{
			print_r($user);
			wp_clear_auth_cookie();
			wp_set_current_user($user->ID);
			wp_set_auth_cookie($user->ID);

   			$redirect = user_admin_url();
   			wp_safe_redirect($redirect);
   			exit();
		}

	}
	else
	{
		header( 'Location: /index.php/noAuth' ) ;
	}
}


if (isset($_GET["action"]))
{
	check_admin_referer('log-out');

	$user = wp_get_current_user();

	wp_logout();

	if ( ! empty( $_REQUEST['redirect_to'] ) ) {
		$redirect_to = $requested_redirect_to = $_REQUEST['redirect_to'];
	} else {
		$redirect_to = 'wp-login.php?loggedout=true';
		$requested_redirect_to = '';
	}

	/**
	 * Filter the log out redirect URL.
	 *
	 * @since 4.2.0
	 *
	 * @param string  $redirect_to           The redirect destination URL.
	 * @param string  $requested_redirect_to The requested redirect destination URL passed as a parameter.
	 * @param WP_User $user                  The WP_User object for the user that's logging out.
	 */
	header( 'Location: /index.php' ) ;
}
else
{
	echo "auth";
	authenticate_wp_user();
}

?>