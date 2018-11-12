<?php 
	define("APP_PATH", dirname(__FILE__));
	header("Content-Type:text/html;charset=utf-8");
	require_once('initphp/initphp.php');
	session_start();
	if( !isset($_REQUEST["fcid"])){
		echo "parameter invalide";
		return;
	}
	$com = InitPHP::getDao("com");
	if( !$com ){
		echo "internal error by geting dao";
		return;
	}
	$execheader = $com->get_exec_header_by_field("id", $_REQUEST["fcid"]);
	if( !$execheader ){
		echo "the execid is wrong or deleted";
		return;
	}
	
?>
<html>
<head>
<title>lookview -  Execution Path</title>
<meta charset="utf-8"></meta>
<script>
    var fc_header = '({"id":"<?php echo $execheader[0]["id"]?>", "name":"<?php echo $execheader[0]["name"] ?>", "des":"<?php echo $execheader[0]["des"] ?>", "user":"<?php echo $execheader[0]["username"] ?>", "keyword":"<?php echo $execheader[0]["keywords"] ?>"})';	
</script>

</head>
<body>
 <?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/file.css" />
<link rel="stylesheet" href="/cd/exec.css" />
<link href="/cd/fuelux.css" rel="stylesheet">

<div class="exec_main">
	<div class="exec_info">
		<div class="panel panel-default">
  			<div class="panel-heading"><?php echo $execheader[0]["name"] ?> <span class="badge"><?php echo $execheader[0]["time"] ?></span></div>
  			<div class="panel-body"><?php echo $execheader[0]["des"] ?></div>
		</div>
	</div>
	<div class="exec_contents">
		<div class="exec_path_container">
						
			<div class="nav-fc-item-add"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>   new flowchart
			</div>
			<div class="nav-vertical fc_list">
				<div class="nav nav-pills fc_item_cmd">
					<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Insert a new flowchart after" href="#"><span class="glyphicon glyphicon-plus cmd add" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Remove" href="#"><span class="glyphicon glyphicon-minus cmd del"aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Move up" href="#"><span class="glyphicon glyphicon-arrow-up cmd move-up" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Move down" href="#"><span class="glyphicon glyphicon-arrow-down cmd move-down" aria-hidden="true"></span></button>
				</div>
				<div class="nav-vertical-bar">
				</div>
			</div>
		</div>
		<div class="exec_source_container">
			<div id="fc_file_cmd_bar">
			</div>
			<div id="file_wrapper">
		                              loading
			</div>
		</div>
	</div>
</div>

<div class="bottom_area"> 
</div>
<script src="/cd/jquery-1.12.0.js"></script>
<script src="/cd/jutil.js"></script>
<script src="/cd/jfile.js"></script>
<script src="/cd/jexec.js"></script>
<script src="/cd/bootstrap.js"></script>

<script type="text/javascript" src="cd/wysiwyg.min.js"></script>
<script type="text/javascript" src="cd/wysiwyg-editor.min.js"></script>
<!-- github.io delivers wrong content-type - but you may want to include FontAwesome in 'wysiwyg-editor.css' -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="cd/wysiwyg-editor.min.css" />

<script src="/cd/fuelux.js"></script>


<div id="sel-dialog" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-dia-title">Selection</h4>
      </div>
      <div class="modal-body" id="my-dia-body">
        <div class="container-fluid">
		<ul class="nav nav-tabs" role="tablist">
 			<li role="presentation" class="active"><a href="#comments4sel" aria-controls="comments4sel" role="tab" data-toggle="tab">My Comments</a></li>
 			<li role="presentation"><a href="#favorates4sel" aria-controls="favorates4sel" role="tab" data-toggle="tab">My Favorate Comments</a></li>
		</ul>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="comments4sel"> loading</div>
			<div role="tabpanel" class="tab-pane" id="favorates4sel">loading...</div>
		</div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</body>
</html>


