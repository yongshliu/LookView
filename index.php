<?php

define("APP_PATH", dirname(__FILE__));
session_start();
header("Content-Type:text/html;charset=utf-8");
require_once('initphp/initphp.php');
if( isset($_REQUEST["c"])){
	InitPHP::init();
}else{
	require_once("main.php");
}
?>
