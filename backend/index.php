<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

require __DIR__ ."/config/config.php";
require __DIR__ ."/model/DB.php";
require __DIR__ ."/src/Api.php";

(new Api());


