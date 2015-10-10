<?php

function delete_pic($path)
{
	if (file_exists($path))
	{
		unlink($path);
	}
}

function upload_pic($filename, $img, $dir)
{
	$path = $_SERVER["DOCUMENT_ROOT"] . "/_assets/img/" . $dir . "/" . $filename;

	$web_path = "/_assets/img/" . $dir . "/" . $filename;

	move_uploaded_file($img["tmp_name"], $path);
	return $web_path;
}


?>