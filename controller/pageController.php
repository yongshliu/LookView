<?php

require_once('page.php');		


class pageController extends Controller{

	public $initphp_list = array('page');
	public function page(){
		if( !isset($_REQUEST["page"]) ){
			echo sprintf(return_error_template_json, PARA_ERR, '"the page not set"');
			return;
		}
		echo $_REQUEST["page"];
        	$html = sprintf($common_html_format, $_REQUEST["page"]);
		echo $html;
		return;
	}
}
?>

