<?php 
	session_start();
	header("Content-Type:text/html;charset=utf-8");
	define("PWD_RET", '({err:%d, ret:"%s"})');
	require_once('email.class.php');
	if( isset($_REQUEST["email"])){
		// send the validation message
		define("APP_PATH", dirname(__FILE__));
		require_once('initphp/initphp.php');
		$udao = InitPHP::getDao("user");
		$message = $udao->make_email_validation_info($_REQUEST["email"]);
		if( !$message ){
			echo sprintf(PWD_RET, -1, "无效的邮件地址");
			exit();
		}
		//$plain = $udao->verify_validation($message);
		//mail($_REQUEST["email"], "password reset", $message);
		$smtpserver = "smtp.sina.cn";
		$smtpserverport = 25;
		$smtpusermail = "lookview@sina.cn";
		$smtpmailto = $_REQUEST["email"]; //"livylau@sina.cn";
		$smtpuser="lookview";
		$smtppass="lookview1234";
		$mailtitle="Lookview account validation";
		$contents = "<h1>validation message</h1><h2><a href=http://lookview.cn/pwdreset.php?pwdvalidation=".$message." >重置密码</a></h2>";
		$contents .= "<br>";
		$contents .= "<h1>或者手动拷贝如下链接到浏览器的地址栏</h1><br>";
		$contents .= "<h2>http://lookview.cn/pwdreset.php?pwdvalidation=".$message."</h2>";
		$mailcontent="";
		$mailtype="HTML";
		//putlog( "create a new smtp instance"); 
		$smtp = new smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass);
		//putlog(" now start to send mail");
		$smtp->debug = false;
		$state = $smtp->sendmail($smtpmailto, $smtpusermail, $mailtitle, $contents, $mailtype);
		if($state == ""){
			echo sprintf(PWD_RET, -2, "邮件发送失败");
			exit();
		}	
		echo sprintf(PWD_RET, 0, "邮件发送成功。请登录邮箱通过连接重置密码");	
		return;
		
	}
	
?>


<html>
<head>
<title>Lookview -- 忘记密码</title>
<meta charset="utf-8" />
<script>
</script>

</head>
<body>

<?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/pwd.css" />
<link href="/cd/fuelux.css" rel="stylesheet">

<div class="pwd_lost_block">
	<form id="pwd_lost_form" action="" method="post">
		<table>
			<tr>
				<td>email:</td>
				<td class="pwd_lost_email"><input type="email" id="pwd_lost_email_t" placeholder="input the email address"></td>
			</tr>
		</table>
 			<input class="pwd_lost_form_submit" type="submit" value="okay"> 
	</form>
	<div class="pwd_lost_ind">
	</div>
 
</div>
<div class="bottom_area" id="bottom_area"> </div>
</body>
<script src="/cd/jquery-1.12.0.js"></script>
<script src="/cd/jutil.js"></script>
<script src="/cd/jpwd.js"></script>
<script src="/cd/bootstrap.js"></script>
<script src="/cd/fuelux.js"></script>
</html>


