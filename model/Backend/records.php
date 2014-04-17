<?php
if (count($_POST) > 0) {
	$player = $_POST['player'];
	$score = $_POST['score'];

	$f = fopen('records.txt', 'a+');
	fwrite($f, $player . ":" . $score . "\n");
	fclose($f);
} elseif ($_GET['action'] == 'getrecords') {
	$records = file('records.txt');

	$arr = array();
	foreach($records as $record)
	{
		$arr[] = explode(':', trim($record));
	}
	
	usort($arr, function($a, $b)
	{
		return $b[1] - $a[1];
	});
	
	if (count($arr) > 17)
		array_splice($arr, 17);

	echo json_encode($arr);
}