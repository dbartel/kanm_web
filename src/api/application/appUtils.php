<?php
/** @file appUtils.php
 * @brief utility methods for applications
 */

function prepareArray($arr, $max)
{
	for ($i = 0; $i < $max; $i++)
	{
		if (!isset($arr[$i]))
		{
			$arr[$i] = "";
		}
	}
	return $arr;
}


?>