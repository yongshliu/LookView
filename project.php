<?php
	session_start();
	header("Content-Type:text/html;charset=utf-8");
	if( !isset($_REQUEST["pro"])){
		echo '连接错误 请返回<a href="/index.php">主页</a>';
		exit();
	}
	require_once('initphp/initphp.php');
	$ddao = InitPHP::getDao("com");
	$projects = $ddao->get_project_by_fields(array("projectname"=>$_REQUEST["pro"]));
	if( !$projects && count($projects)<1){
		echo '制定的项目不存在 请返回<a href="/index.php">主页</a>';
		exit();
	}	
	$project = $projects[0];
	if( $project["projectpath"][0] == '/'){
		$coms = $ddao->get_comments_by_fields(array("topdir"=>substr($project["projectpath"], 1)));
	}else{
		$coms = $ddao->get_comments_by_fields(array("topdir"=>$project["projectpath"]));
	}
	$image = $project["picture"];
	if( $image == ''){
		$image = '/img/lv.jpg';
	}else{
		$image = '/img/pro/'.$image;
	}
	$intro = $project["intros"];
	if( $intro == ''){
		$intro = '暂时没有介绍';
	}
	$topdir = '/page.php?page='.$project["projectpath"].'/'.$project["projectname"].'/lv_tag_index.htm';
?>

<html>
<head>
<title>lookview</title>
<meta charset="utf-8" />
<script>
	var target_project_topdir = "<?php echo $project["projectpath"]; ?>";	
</script>
</head>
<body  id="project-page">

<?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/project.css" />
<link href="/cd/fuelux.css" rel="stylesheet">
<script src="/cd/jquery-1.12.0.js"></script>

<div class="pro_header">
	<div class="alert alert-success" role="alert">
	<h1><?php echo $project["projectname"]; ?><br>
	<small><a href="<?php echo $project["webpage"];?>"><?php echo $project["webpage"]; ?></a></small></h1>
	</div>
<div class="row">
	<div class="pro_img"><img src="<?php echo $image; ?>"/> </div>
	<div class="pro_intro"><?php echo $intro; ?></div>
</div>
<div class="pro_source_link"><h3><span class="glyphicon glyphicon-hand-right"></span>  <a href="<?php echo $topdir; ?>">浏览学习源代码</a></h3></div>
</div>
<div class="pro_coms">
<div class="panel panel-default">
  <div class="panel-heading">所有评论<span class="badge coms_num"><?php echo count($coms); ?></span></div>
  <div class="coms_all">
  <div class="panel-body">
    没有评论注释
  </div>
  </div>
</div>

</div>
<script src="/cd/jutil.js"></script>
<script src="/cd/jproject.js"></script>
<script src="/cd/bootstrap.js"></script>
<script src="/cd/fuelux.js"></script>
</body>
</html>


