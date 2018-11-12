<?php 
	session_start();
	$disable_user_operation = true;
	define("APP_PATH", dirname(__FILE__));
	header("Content-Type:text/html;charset=utf-8");
	require_once('initphp/initphp.php');
	$udao = InitPHP::getDao("user");
	if( isset($_REQUEST["pwdreset"])){
		$newpwd = $_REQUEST["pwdreset"];
		if(!$_SESSION["pwdreset"]){
			echo "invalid link";
			exit();
		}
		//print_r($_SESSION["pwdreset"]);
		//print_r($_REQUEST["pwdreset"]);
		if( $udao->pwd_reset($_SESSION["pwdreset"], $_REQUEST["pwdreset"])){
			echo "reset okay";
		}else{
			echo "reset failed";
		}
		exit();
	}
	if( !isset($_REQUEST["pwdvalidation"])){
		echo "invalid link";
		exit();
	}
	// send the validation message
	
	$message = $udao->verify_validation($_REQUEST["pwdvalidation"]);
	if( !$message ){
		echo "validation failed";
		exit();
	}
	$_SESSION["pwdreset"]=$message;
	//print_r($_SESSION["pwdreset"]);

?>


<html>
<head>
<title>Lookview --</title>
<meta charset="utf-8" />
<script>
</script>

</head>
<body>

<?php //require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/pwdrst.css" />
<link href="/cd/fuelux.css" rel="stylesheet">

<div class="pwd_reset_block">
	<form id="pwd_reset_form" action="" method="post">
		<table>
			<tr>
				<td>password reset:</td>
				<td><?php $_SESSION["pwdreset"][1] ?></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="password" class="form-control" id="input_reg_pwd" placeholder="password" aria-describedby="basic-addon1"></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="password" class="form-control" id="confirm_reg_pwd" placeholder="confirm password" aria-describedby="basic-addon1"></td>
			</tr>
		</table>
 		<input class="pwd_reset_form_submit" type="submit" value="okay">	
	</form>
	<div class="pwd_reset_ind">
	</div>
 
</div>
<div class="bottom_area" id="bottom_area"> </div>
</body>
<script src="/cd/jquery-1.12.0.js"></script>
<script src="/cd/jutil.js"></script>
<script src="/cd/jpwdrest.js"></script>
<script src="/cd/bootstrap.js"></script>
<script src="/cd/fuelux.js"></script>
</html>


