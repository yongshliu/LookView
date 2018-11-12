<?php 
	session_start();
	$tuser = "";
	$tuserid = 0;
	if( isset($_REQUEST["tuser"])){
		require_once('initphp/initphp.php');
		$userdao = InitPHP::getDao("user");
		$tuser = $_REQUEST["tuser"];
		$tuserid = $userdao->get_user_id($tuser);
	}elseif(isset($_SESSION["user"])){
		$tuser = $_SESSION["user"];
		$tuserid = $_SESSION["userid"];
	}
	
	
?>

<html>
<head>
<title>Dynamic Menus</title>
<meta charset="utf-8"></meta>
<script>
	    var user_page_info = '({action:"<?php echo isset($_REQUEST["what"])?$_REQUEST["what"]:""; ?>",tuser:"<?php echo $tuser ?>", tuserid:<?php echo $tuserid ?>})';	
</script>

</head>
<body>
<?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/common.css" />
<link rel="stylesheet" href="/cd/user.css" />
<link href="/cd/fuelux.css" rel="stylesheet">
<div class="user-main">
	<div class="panel panel-default user-nav">
		<div class="panel-body">
		<div class="user-self">
			<div class="user-name"><span class="user-id-name"></span>
				<div class="user-short-des">
					<div class="short-des-item no-short-des lv-hide"><span class="glyphicon glyphicon-pencil"></span>添加签名</div>
					<div class="short-des-edit lv-hide"><input type=text id=shor-des-input></input><button class="btn btn-primary" id="sig-edit-ok">确定</button></div>
					<div class="short-des-item short-des-conts lv-hide"><span></span><a href="" class="to_change_sig">修改</a></div>
				</div>
			</div>
			<div class="user-photo">
			</div>
			<div class="user-profile">
				<div class="user-long-des">
					<div class="no-long-des"><span class="glyphicon glyphicon-pencil"></span>填写个人简介</div>
					<div class="long-des-edit lv-hide">
						<textarea id="long-des-input"></textarea>
						<button class="btn btn-primary long-des-edit-ok">确定</button></div>
					<div class="long-des-conts lv-hide"><span></span><a href="" class="to_change_longdes">修改</a></div>
				</div>
			</div>
			<div class="up-email"></div> <div class="user-follow-up lv-hide"><span class="ufu-fan">关注</span><span class="ufu-unfan lv-hide">取消关注</span></div>
		</div>
    		</div>
  		<div class="panel-footer">
		<ul class="nav nav-pills nav-justified">
			<li role="presentation" class="un-li active"><a href="#" class="user-item profile">基本</a></li>
			<li role="presentation" class="un-li"><a href="#" class="user-item comments">评论(<span>0</span>)</a></li>
			<li role="presentation" class="un-li"><a href="#" class="user-item favorates">收藏(<span>0</span>)</a></li>
			<li role="presentation" class="un-li"><a href="#" class="user-item follows">关注(<span>0</span>)</a></li>
			<li role="presentation" class="un-li"><a href="#" class="user-item flowchart">流程(<span>0</span>)</a></li>
		</ul>
		</div>
	</div>
	<div class="list-group user_contents">
		<div id="uc_wrapper">
  			<div class="list-group-item title"></div>
  			<div class="contents"></div>
		</div>
  	</div>
</div>

<div class="modal fade" id="user-new-flowc"  role="dialog">
  <div class="modal-dialog" role="document">
      <div class="modal-body">
        <div class="panel panel-success">
		<div class="panel-heading"> Create a New Flow-Chart </div>
		<div class="alert alert-danger alert-dismissible alert-gone" role="alert">
  			<button type="button" class="close alert-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
 		 		<strong>Note!</strong><span class="alert-info"><span>
		</div>

		<div class="panel-body">
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1" >Flowchart Name:</span>
  				<input type="text" class="form-control" id="input_exec_name" placeholder="Tyep a name < 50">

			</div>
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1">Description:</span>
  				<textarea type="text" class="form-control" cols=5 id="exec_des" placeholder="Description < 1000" ></textarea>


			</div>
			<div class="input-group input-group-lg">
  				<span class="input-group-addon size1">Keywords:</span>
  				<input type="text" class="form-control" id="input_exec_keyword" placeholder="use , to separate each keyword; < 50">

			</div>

		</div> <!-- panel body -->
		<div class="panel-footer">
			<button class="btn-danger" onclick=on_submit_new_exec(this) type="button">Submit</button>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

		</div>
	</div> <!-- panel -->
	    </div><!-- modal body -->
  </div>
</div>
<div class="bottom_area " id="bottom_area"> 
	<div class="ba_left"></div>
	<div class="ba_middle"><div>yongshliu@sina.cn</div><div>eternalvita</div><div>76220950</div><div>永远，永生</div></div>
	<div class="ba_right"></div>
</div>

</body>
<script src="/cd/jquery-1.12.0.js"></script>
<script src="/cd/jutil.js"></script>
<script src="/cd/juser.js"></script>
<script src="/cd/bootstrap.js"></script>
<script src="/cd/fuelux.js"></script>

</html>


