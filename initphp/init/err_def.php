<?php

define ("CUR_DBNAME", "linux");

define("return_error_template_json", "({err:1,code:%d, msg:%s})");
define("OK_JSON", '({err:0, code:0, msg:"ok", ret:%s})');


define("PARA_ERR", -1);
define("DATEBASE_ACCESS_ERR", -2);
define("GET_DAO_ERR", -3);
define("UPDTAE_ERR", -4);
define("DEL_ERR", -5);
define("NO_RECORD", -6);
define("DUPLICATE", -7);
define("QUERY_ERR", -8);

define("DEFINED", -20);
define("PWDERR", -21);
define("INSERT_FAIL", -22);

define("NO_SESSION", -30);
define("SESSION_WRONG", -31);
define("SESSION_EXPIRE", -32);
define("NEEDLOGIN", -33);

/* temporary save here */
function hexFromBin($data){
	return bin2hex($data);
}
function binFromHex($data){
	$len = strlen($data);
	return pack("H".$len, $data);
}
function checkrequestpara($arraydata){
	foreach($arraydata as $para){
		if( !isset($_REQUEST[$para]))
			return FALSE;
	}
	return TRUE; 
}
function check_login(){
	if( !isset($_SESSION["user"])){
		echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
		return 0;
	}
	return 1;
}

function putlog($log){
	$dao = InitPHP::getDao('log');
	if( !empty($dao) ){
		$dao->putLog($log);
	}
}
function makearray_json($execpath){
		$num = count($execpath);
		$json_ret = "[";
		for($i=0; $i<$num; $i++){
			$json_ret .= '{';
			foreach($execpath[$i] as $key => $val){
				$json_ret .= "${key}:\"${val}\",";
			}
			$json_ret .= '},';
		}
		$json_ret .= "]";
		return $json_ret;
	}

function make_json($data){
	$json_ret = "({";
	foreach($data as $key => $val){
		$json_ret .= "${key}:\"${val}\",";
	}
	$json_ret .= '})';
	return $json_ret;
}
?>

