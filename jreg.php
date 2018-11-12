<?php
session_start();
?>
<html>
<head>
<title>Lookview - User Register</title>
<meta charset="utf-8"></meta>
</head>
<body>
<main>
<?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/register.css" />
<link href="/cd/fuelux.css" rel="stylesheet">
<form id="form_register">
	<div class="panel panel-success reg-main">
		<div class="panel-heading"> Register a new user </div>
		<div class="alert alert-danger alert-dismissible reg-alert-gone" role="alert">
  			<button type="button" class="close alert-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
 		 		<strong>Note!</strong><span class="alert-info"><span>
		</div>

		<div class="panel-body">
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1" >Username:</span>
  				<input type="text" class="form-control" id="input_reg_user" placeholder="Tyep your username" aria-describedby="basic-addon1">
				<span class="input-group-addon size2" id="sizing-addon3">English character only</span>

			</div>
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1"> Password:</span>
  				<input type="password" class="form-control" id="input_reg_pwd" placeholder="Type a Password" aria-describedby="basic-addon1">
			</div>
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1"> Confirm:</span>
  				<input type="password" class="form-control" id="confirm_reg_pwd" placeholder="Type the Password again" aria-describedby="basic-addon1">
			</div>
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1">Email:</span>
  				<input type="text" class="form-control" id="input_reg_email" placeholder="Type your Email address" aria-describedby="basic-addon1">
				<span class="input-group-addon size2">@abc.com, import to retrieve password later</span>

			</div>
		</div> <!-- body -->
		<div class="panel-footer"><input class="form_submit_but btn-danger" type="submit" value="sumbit"></div>
	</div> <!-- panel -->

</form>
<div id="reg-dialog" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
            <h4 class="modal-title" id="my-dia-title">Register a new user</h4>
      </div>
      <div class="modal-body" id="my-dia-body">
	  Registering ... 	
      </div>
      <div class="modal-footer">
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="bottom_area " id="bottom_area"> 
	<div class="ba_left"></div>
	<div class="ba_middle"><div>yongshliu@sina.cn</div><div>eternalvita</div><div>76220950</div><div>永远，永生</div></div>
	<div class="ba_right"></div>
</div>
<script src="/cd/jquery-1.12.0.js"></script>
<script src="/cd/jutil.js"></script>
<script src="/cd/jreg.js"></script>
<script src="/cd/bootstrap.js"></script>
<script src="/cd/fuelux.js"></script>
</body>
</html>
