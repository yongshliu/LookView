<link href="/cd/bootstrap.css" rel="stylesheet" />
<link href="/cd/common.css" rel="stylesheet" />

<div class="page-header navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/index.php">
        <img alt="Brand" src="/cd/logo50.png">
      </a>
	<div class="input-group navbar-nav project">
		<div class="input-dropdown">
 		 <input type="text" class="idd-trigger" id="pro-search-input" placeholder="查找项目">
  		<div class="input-dropdown-menu" aria-labelledby="pro-search-input" id="pro-list-dropdown">
			<div class="idm-close">关闭&#160;&#160;&#160;&#160;<span class="glyphicon glyphicon-remove-sign"></span></div>
			<div id="pro-list-block">
			</div>
		</div>	
		</div> <!-- input-dropdown -->
	</div>
	<div class="nav navbar-nav">
     	<div class="dropdown header-user">
		<a role="button" class="btn btn-default login" id="user-info-trigger">登录</a> 
		<ul class="dropdown-menu" aria-labelledby="user-info-trigger" >
			<li><a href="/user.php?what=profile">用户信息</a></li>
			<li><a href="/user.php?what=comments">用户评论</a></li>
			<li><a href="/user.php?what=favorates">用户收藏</a></li>
			<li><a href="/user.php?what=follows">用户关注</a></li>
			<li><a href="/user.php?what=flowchart">程序流程</a></li>
			<li role="separator" class="divider"><li>
			<li><a href="#" id="user-logout-btn">退出登录</a></li>
		</ul>

     	</div>  
	</div>
    </div>  
  </div>
  <div class="nav-for-page">
  </div>
</div>
<div class="header-place-holder">
</div>
<script>
	   var page_info = '({base:"/page.php?page=/"})';	
	    var suser = "<?php echo isset($_SESSION["user"])?$_SESSION["user"]:""; ?>";
	    <?php
		require_once('initphp/initphp.php');
		$errtxt = "";
		$retjson = 0;
		$com = InitPHP::getDao("com");
		if( !$com ){
			$errtxt = "internal error by geting dao";
		}else{
			$pros = $com->get_all_project();
			if( !$pros ){
				$errtxt = "the execid is wrong or deleted";
			}else{
				$retjson = makearray_json($pros); 
			}
			
		}
		if( $retjson ){
			echo 'var main_projects = \'({err:0,projects:'.$retjson.'})\';';
		}else{
			echo 'var main_projects = \'({err:1, projects:[]})\'';
		}

	?>

</script>

