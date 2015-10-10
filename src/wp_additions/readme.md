# Wordpress additions

## wp-cas-login.php

Allows for session authentication for Wordpress - creates a user if they don't exist with proper permissions

If the user is an officer, they will get an Administrator account.

If the user is a DJ, they will get a Contributor account

**Add this file to the wordpress/ directory for use**

## File edits

*wp-config.php*

```
		if (!session_id())
			session_start();
```

*wp-login.php*

If you want to redirect somewhere other than the login page on logout:

1. Find ``case 'logout'``
2. Comment out the redirect code
3. redirect as necessary