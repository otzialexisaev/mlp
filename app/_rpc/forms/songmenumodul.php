<?php

use App\Song as Song;

$id = $_REQUEST['id'];

$name = $_REQUEST['name'];

$obj = Song::find($id);
$obj->name = $name.'.mp3';
$obj->save();



