<?php 
session_start();
header("Content-Type:text/html;charset=utf-8");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LookView <?php echo $_REQUEST["page"] ?></title>

<script>
    
</script>
</head>
<body>
 <?php require_once("header.php"); ?>
<link rel="stylesheet" href="/cd/page.css" />
<link rel="stylesheet" href="/cd/file.css" />
<link href="/cd/fuelux.css" rel="stylesheet"  />
<div class="main_area scrolled" id="main_area">
   
	        <div class="codearea" id="codeareaID">
<div class="code-navi top" id="code-navi">
</div>
	<!-- put the codes here -->		
	<div id="target_page">
<?php 
	if( !isset($_REQUEST["page"] )){
		$html = '<p> the file isnt specified </p>';
		echo $html;
	}else{
		$file_path = ".";
		if( isset($_REQUEST["top"])){
			$file_path .= $_REQUEST["top"] . "/".$_REQUEST["page"];;
		}
		else
			$file_path .= $_REQUEST["page"];
		require_once($file_path); 
	}
?>
	</div>
    </div>

</div>
<div id="my-dialog" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-dia-title">Modal title</h4>
      </div>
      <div class="modal-body" id="my-dia-body">
        <div class="container-fluid">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="project-tree-container" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-dia-title">目录文件树         <a href="/index.php">其它项目</a></h4>
      </div>
      <div class="modal-body" id="my-dia-body">
        <div class="fuelux">

    <ul class="tree" data-folderSelect=false role="tree" id="project-tree">
  <li class="tree-branch hide" data-template="treebranch" role="treeitem" aria-expanded="false">
    <div class="tree-branch-header">
      <button type="button" class="glyphicon icon-caret glyphicon-play"><span class="sr-only">Open</span></button>
      <button type="button" class="tree-branch-name">
        <span class="glyphicon icon-folder glyphicon-folder-close"></span>
        <span class="tree-label"></span>
      </button>
    </div>
    <ul class="tree-branch-children" role="group"></ul>
    <div class="tree-loader" role="alert">Loading...</div>
  </li>
  <li class="tree-item hide" data-template="treeitem" role="treeitem">
    <button type="button" class="tree-item-name">
      <span class="glyphicon icon-item fueluxicon-bullet"></span>
      <span class="tree-label"></span>
    </button>
  </li>
</ul>      
	</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
<script src="/cd/jfile.js"></script>
<script src="/cd/jpage.js"></script>
<script src="/cd/bootstrap.js"></script>

	 <script type="text/javascript" src="cd/wysiwyg.min.js"></script>
<script type="text/javascript" src="cd/wysiwyg-editor.min.js"></script>
<!-- github.io delivers wrong content-type - but you may want to include FontAwesome in 'wysiwyg-editor.css' -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="cd/wysiwyg-editor.min.css" />

<script src="/cd/fuelux.js"></script>
</body>
</html>


