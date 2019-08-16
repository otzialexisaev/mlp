<?php
$name = $_REQUEST['name'];
$options = json_decode($_REQUEST['options']);
//$options = $_REQUEST['options'];
//echo "{$name}";
$form = '';
if (isset($options->label)) {
    $form .= "<label class='menucore-label' for='{$name}'>{$options->label}</label>";
}
//todo почему статичный айди???
$form .= "<input type='textfield' name='{$name}' id='name'/>";
echo $form;
