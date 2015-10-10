<?php
function incrementTime($time) {
	if ($time[0] == "0")
	{
		$hour = 0 + $time[1];
		if ($time[1] == 9)
		{
		    return "10";
		}
		else
		{
		    $hour++;
		    return "0" . $hour;
		}
	 }
	 else
 	{
		$hour = 0 + $time;
		$hour++;
		if ($hour == 25)
		{
		    return "0";
		}
		else
		{
		    return "" . $hour;
		}
 	}
}

function getDuration($time)
{
	$start_time = (string) $time[1] . (string) $time[2];
	$end_time = (string) $time[3] . (string) $time[4];
	return (int) $end_time - (int) $start_time;
}


function showConflictExists($pdh, $time)
{
	$day = (string) $time[0];
	$start_time = (string) $time[1] . (string) $time[2];
	$end_time = (string) $time[3] . (string) $time[4];


	/*
	    1. Check Duration
	        If one hour:
	            - start_time cannot equal another start_time
	            - end_time cannot equal another end_time
	        If >1 hours:
	            - start_time cannot equal another start_time
	            - any time BETWEEN start_time and end_time cannot equal EITHER start or end time
	            - end_time cannot equal another end_time
	*/

	//Check start time and end time
	$stmt = $pdh->prepare("SELECT timeslot FROM `calendar`
	    WHERE active=1 AND ((SUBSTRING(timeslot,1,1)=:day) AND (SUBSTRING(timeslot,2,2) = :start OR SUBSTRING(timeslot,4,2) = :end))");

	$stmt->execute(array(
	    ":day" => $day,
	    ":start" => $start_time,
	    ":end" => $end_time
	));

	$result = $stmt->fetchAll();
	$stmt = null;

	if (count($result) > 0) return true;

	//check in-between
	$intermediate_time = incrementTime($start_time);
	while ($intermediate_time != $end_time)
	{
	    $stmt = $pdh->prepare("SELECT timeslot FROM `calendar`
	        WHERE active=1 AND ((SUBSTRING(timeslot,1,1)=:day) AND (SUBSTRING(timeslot,2,2) = :time OR SUBSTRING(timeslot,4,2) = :time))");

	    $stmt->execute(array(
	        ":day" => $day,
	        ":time" => $intermediate_time
	    ));

	    $result = $stmt->fetchAll();
	    $stmt = null;
	    if (count($result) > 0) return true;

	    $intermediate_time = incrementTime($intermediate_time);
	}

	//no conflict
	return false;	
}


?>
