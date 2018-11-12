<?php



class comController extends Controller{
	public function __construct(){
		parent::__construct();
	}

    public $initphp_list = array('getcommentdir', 'getcommentln', 'getcomments_json', 'addcomment_json', 'updatecomment_json', 'delcomment_json', 
					'addfavor', "delfavor", 'givegift', "delgift", 'getcommentsuser_json', 'getfavorbyuser_json',
					'getfollower', 'getfollowee', 'checkfaned', 'makefollow', 'delfollow', 'getfavorcombyuser', 
			'operatefcgf', 'getcomgift', 'getcomfavor','getlatestfcs', 'getlatestcoms');
  
	private function convertfavor2json($arraydata){
		$ret_json = "[";
		for($i =0; $i<count($arraydata); $i++){
			$row_json = '{id:'.$arraydata[$i]["id"].',';
			$row_json = $row_json.'favorwho:"'.$arraydata[$i]["favorwho"].'",';
			$row_json = $row_json.'whofavor:"'.$arraydata[$i]["whofavor"].'",';
			$row_json = $row_json.'project:"'.$arraydata[$i]["project"].'",';
			$row_json = $row_json.'file:"'.$arraydata[$i]["file"].'",';
			$row_json = $row_json.'commentid:"'.$arraydata[$i]["commentid"].'",';
			$row_json = $row_json.'time:"'.$arraydata[$i]["time"].'",';
			$row_json .= '},';
			$ret_json = $ret_json.$row_json;
		}
		$ret_json = $ret_json.']';
		return $ret_json;

	}
	public function getfavorcombyuser(){
		if( !checkrequestpara(array("tuser"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$user = $_REQUEST["tuser"];
		$dat = InitPHP::getDao('com');
		$results = $dat->get_favor_com_by_filed("whofavor", $user);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;


	}
	public function getfavorbyuser_json(){
		if(!isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"file shuld be defined"');
			return;	
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_favor_by_field("whofavor", $_SESSION["user"]);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;

	}
	public function getfavorbyfile_json(){
		if(!isset($_REQUEST["file"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"file should be specifed"');
			return;	
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_favor_by_field("file", $_REQUEST["file"]);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"no record available"');
			return;
		}
			echo sprintf(OK_JSON, $this->convertfavor2json($results));
		return;

	}
	public function getcomfavor(){
		if(!isset($_REQUEST["op"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"op should be specifed"');
			return;	
		}
		$op = $_REQUEST["op"];
		// by  filepath and who made the favor
		$dao = InitPHP::getDao('com');
		if( $op == "fw" ){
			if(!isset($_REQUEST["who"]) || !isset($_REQUEST["topdir"]) || !isset($_REQUEST["file"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_all_by_fields(array("whofavor"=>$_REQUEST["who"], "file"=>$_REQUEST["file"], "topdir"=>$_REQUEST["topdir"]), commentfavor);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}
	
		}// by comid
		else if( $op == "ci"){
			if(!isset($_REQUEST["comid"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_sel_by_fields(array("commentid", "whofavor"), array("commentid"=>$_REQUEST["comid"]), commentfavor);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(OK_JSON, '[]'); 
				return;
			}

		}// by who to who
		else if( $op == "pp"){
			if(!isset($_REQUEST["who"]) || !isset($_REQUEST["author"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_all_by_fields(array("whofavor"=>$_REQUEST["who"], "favorwho"=>$_REQUEST["author"]), commentfavor);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}

		}else if ($op="file"){ // get regarding to the filename
			if( !isset($_REQUEST["file"]) || !isset($_REQUEST["topdir"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"file,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_com_gf_by_file($_REQUEST["topdir"], $_REQUEST["file"], "favor");
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}
		}

	}
	public function getcomgift(){
		if(!isset($_REQUEST["op"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"op should be specifed"');
			return;	
		}
		$op = $_REQUEST["op"];
		// by  filepath and who made the favor
		$dao = InitPHP::getDao('com');
		if( $op == "fw" ){
			if(!isset($_REQUEST["who"]) || !isset($_REQUEST["topdir"]) || !isset($_REQUEST["file"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_all_by_fields(array("whogive"=>$_REQUEST["who"], "file"=>$_REQUEST["file"], "topdir"=>$_REQUEST["topdir"]), commentgift);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}
	
		}// by comid
		else if( $op == "ci"){
			if(!isset($_REQUEST["comid"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_sel_by_fields(array("commentid", "whogive"), array("commentid"=>$_REQUEST["comid"]), commentgift);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(OK_JSON, '[]'); 
				return;
			}

		}// by who to who
		else if( $op == "pp"){
			if(!isset($_REQUEST["who"]) || !isset($_REQUEST["author"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"who,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_all_by_fields(array("whogive"=>$_REQUEST["who"], "authorname"=>$_REQUEST["author"]), commentgift);
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}

		}else if ($op="file"){ // get regarding to the filename
			if( !isset($_REQUEST["file"]) || !isset($_REQUEST["topdir"])){
				echo sprintf(return_error_template_json, PARA_ERR, '"file,topdir, file should be specifed"');
				return;	
			}
			$results = $dao->get_com_gf_by_file($_REQUEST["topdir"], $_REQUEST["file"], "gift");
			if( $results){
				echo sprintf(OK_JSON, makearray_json($results));
				return;

			}else{
				echo sprintf(return_error_template_json,QUERY_ERR, '[]'); 
				return;
			}
		}
	}

	public function  addfavor(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if(!isset($_REQUEST["topdir"]) || !isset($_REQUEST["favorwho"]) || !isset($_REQUEST["file"]) || !isset($_REQUEST["commentid"]))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
	
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		$id = $dao->log_favor($_REQUEST["favorwho"], $_SESSION["user"], $_REQUEST['topdir'], $_REQUEST['file'], $_REQUEST['commentid']);
		if( $id )
			echo sprintf(OK_JSON, '"'.$id.'"');
		else
			echo sprintf(return_error_template_json, INSERT_FAIL, '"insert error"');
		return;
  	  }
	public function delfavor(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if(!isset($_REQUEST["commentid"]))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
	
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		if( $retid = $dao->del_record_by_fields(array("commentid"=>$_REQUEST["commentid"], "whofavor"=>$_SESSION["user"]), "commentfavor")){
			echo sprintf(OK_JSON, '"'.$retid.'"');
			return;
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"deleting commment favor error"');
			return;
		}

	}
	public function getgiftbyfile(){
		if(!isset($_REQUEST["file"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"file shuld be defined"');
			return;	
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_gift_by_field("file", $_REQUEST["file"]);
		if( empty($results) ){
			echo sprintf(return_error_template_json, DATEBASE_ACCESS_ERR, '"look for table failed"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;

	}
	// handle for gift and favor 
	public function operatefcgf(){
		// get, del, getdetail
		$onlyget = 0;
		$type = "flowchartgift";
		if( isset($_REQUEST["type"]) && $_REQUEST["type"] == "fcf")
			$type = "flowchartfavor";
		if( !checkrequestpara(array("op"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"lack op cmd"');
			return;
		}
		$op = $_REQUEST["op"];
		if( !isset($_SESSION["userid"])){
			if( $op != "get"){
				echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
				return;
			}
			$onlyget = 1;			
		}
		$dat = InitPHP::getDao('com');
		$fields = array();
		if( isset($_REQUEST["id"] ))
			$fields["id"] = $_REQUEST["id"];
		if( isset($_REQUEST["fcid"]))
			$fields["flowchartid"] = $_REQUEST["fcid"];
		if( isset($_REQUEST["whodid"]))
			$fields["whodid"] = $_REQUEST["whodid"];
		if( $onlyget ){
			$result = $dat->get_all_by_fields($fields, $type);	
			if( count($result)<1 ){
				echo sprintf(return_error_template_json, NO_RECORD, '"No record found"');
			}else{
				echo sprintf(OK_JSON, makearray_json($result));
			}
			return;
		}
		else{
			if( $op=="add" && isset($_REQUEST["fcid"])){
				$retid = $dat->insert_flowchart_gift_favor($_SESSION["userid"], $_REQUEST["fcid"], $type);
				if( $retid ){
					echo sprintf(OK_JSON, '"'.$retid.'"');
					return;
	
				}else{
					echo sprintf(return_error_template_json, PARA_ERR, '"adding favor to fc parameters error"');
					return;

				}
			}else if($op=="del" && isset($_REQUEST["id"])){
				if( $retid = $dat->del_record_by_fields(array("id"=>$_REQUEST["id"], "whodid"=>$_SESSION["userid"]), $type)){
					echo sprintf(OK_JSON, '"'.$retid.'"');
					return;
				}else{
					echo sprintf(return_error_template_json, PARA_ERR, '"deleting fc in parameters error"');
					return;

				}
			}else if($op=="visit" && isset($_REQUEST["tuser"])){
				$retset = $dat->fetch_flowchart_state_tuser($_REQUEST["tuser"], $_SESSION["userid"], $type);
				if( count($retset)>0 ){
					echo sprintf(OK_JSON,  makearray_json($retset));
					return;
				}else{
					echo sprintf(return_error_template_json, NO_RECORD, '"not found any record"');
					return; 
				}
			}else if($op=="count" && isset($_REQUEST["fcid"])){
			// how many user gifted 
				$retnum = $dat->dao->db->get_count($type, array("id"=>$_REQUEST["fcid"]));
				echo sprintf(OK_JSON, '"'.$retnum.'"');
				return;

			}
		}
	

	}
	public function  givegift(){
		//putlog("user:".$_SESSION["user"]." session:".$_SESSION['session']);
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if(!isset($_REQUEST["topdir"]) || !isset($_REQUEST["authorname"]) || !isset($_REQUEST["file"]) || !isset($_REQUEST["commentid"]))

		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
	
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		$id = $dao->give_gift($_REQUEST["topdir"], $_REQUEST['commentid'], $_REQUEST['authorname'], $_REQUEST['file'], $_SESSION["user"]);
		if( $id )
			echo sprintf(OK_JSON, '"'.$id.'"');
		else
			echo sprintf(return_error_template_json, INSERT_FAIL, '"insert error"');
		return;
  	  }
	public function delgift(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if(!isset($_REQUEST["commentid"]))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
	
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		if( $retid = $dao->del_record_by_fields(array("commentid"=>$_REQUEST["commentid"], "whogive"=>$_SESSION["user"]), "commentgift")){
			echo sprintf(OK_JSON, '"'.$retid.'"');
			return;
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"deleting commment gift error"');
			return;
		}

	}

	public function getcommentsuser_json(){
		if( !checkrequestpara(array("tuser"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_comments_by_author($_REQUEST["tuser"]);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"No record found"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;

	}
	public function getcommentdir(){
		if( !checkrequestpara(array("topdir"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_comments_by_fields(array("topdir"=>$_REQUEST["topdir"]));
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"No record found"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;

	}
	public function getcommentln(){
        	if(!checkrequestpara(array("ln", "tp", "fn"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"file shuld be defined"');
			return;	
		}
		$dat = InitPHP::getDao('com');
		$results = $dat->get_comments_by_fields(array("filename"=>$_REQUEST["fn"], "topdir"=>$_REQUEST["tp"], "lineno"=>$_REQUEST["ln"]));
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"look for table failed"');
			return;
		}
		$ret_json = makearray_json($results);
		echo sprintf(OK_JSON, $ret_json);
		return;

    	}
	public function getlatestcoms(){
		$num = 5;
		if( isset($_REQUEST["num"]) && $_REQUEST["num"] <= 10 ){
			$num = $_REQUEST["num"];
		}
		$dat = InitPHP::getDao('com');
		
		$results = $dat->get_all_counted("comments", $num);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"look for table failed"');
			return;
		}
		$ret_json = makearray_json($results);
		echo sprintf(OK_JSON, $ret_json);
		return;

	}
	public function getlatestfcs(){
		$num = 5;
		if( isset($_REQUEST["num"]) && $_REQUEST["num"] <= 10 ){
			$num = $_REQUEST["num"];
		}
		$dat = InitPHP::getDao('com');
		
		$results = $dat->get_all_counted("executionheader", $num);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"look for table failed"');
			return;
		}
		$ret_json = makearray_json($results);
		echo sprintf(OK_JSON, $ret_json);
		return;

	}
	public function getcomments_json(){
		if(!checkrequestpara(array("file", "topdir"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"file shuld be defined"');
			return;	
		}
	/*
		if( !isset($_REQUEST["table"]) ){
			echo sprintf(return_error_template_json, -1, '"table shuld be defined"');
			return;
		}
	*/
		$dat = InitPHP::getDao('com');
		$results = $dat->get_comments_by_fields(array("filename"=>$_REQUEST["file"], "topdir"=>$_REQUEST["topdir"]));
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"look for table failed"');
			return;
		}
		$ret_json = makearray_json($results);
		echo sprintf(OK_JSON, $ret_json);
		return;

	}
    public function  addcomment_json(){
	if( !check_login())
		return;	
	if(!checkrequestpara(array("file", "lineno", "lineid", "comment", "topdir"))){
		echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
		return;
	}
	
	$dao = InitPHP::getDao('com');
	if(empty($dao))
	{
		echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
		return;
	}	 
	if( $dao->isexist(array('lineid'=>$_REQUEST['lineid'], 'author'=>$_SESSION["user"], 'topdir'=>$_REQUEST["topdir"]), "comments")){
		echo sprintf(return_error_template_json, DUPLICATE, '"the submit is duplicated"');
		return;
	}
	$id = $dao-> insertcomment($_REQUEST["file"], $_REQUEST['lineno'], $_REQUEST['lineid'], $_SESSION["user"], $_REQUEST['comment'], $_REQUEST['topdir']);
	if( $id )
		echo sprintf(OK_JSON, '"'.$id.'"');
	else
		echo sprintf(return_error_template_json, INSERT_FAIL, '"insert comment failed"');
	return;
    }
	public function delcomment_json(){
		
		if( !check_login())
			return;
		if(!checkrequestpara(array("id", "topdir"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		$id = $_REQUEST["id"];
		if(empty($dao)){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dao error"');
			return;
		}
		$ret = $dao->del_coments_by_fields(array("id"=>$id, "topdir"=>$_REQUEST["topdir"], "author"=>$_SESSION["user"]));
		if( $ret ){
			$exec = $dao->get_exec_path_by_field("comid", $id);
			//fixme, this should be done by the transaction
			for($i=0; $i<count($exec);$i++){
				$item = $exec[$i];
				// update current node's child's parent
				if( $item["left"] != 0){
					$dao->update_exec_path($item["left"], array("parent"=>$item["parent"]), 0);	

				}
				if( $item["parent"] != 0) {
					$dao->update_exec_path($item["parent"], array("left"=>$item["left"]), 0);		
				}
				// delete current node in the execution path
				$dao->del_exec_path_by_field(array("id"=>$item["id"]));
			}
			echo sprintf(OK_JSON, '"'.$id.'"');
			return;	
		}
		echo sprintf(return_error_template_json, DEL_ERR, '"Delete item '.$id.' error!"');
		return;
		
		
	}
	public function updatecomment_json(){
		if( !check_login()){
			return;
		}
		if(!checkrequestpara(array("id", "comment")))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;

		}
		$id = $_REQUEST["id"];
		$comment = $_REQUEST["comment"];
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dao error"');
			return;
		}
		$ret = $dao->update_comments_by_id($id, $_SESSION["user"], $comment);
		if( !$ret )
		{
			echo sprintf(return_error_template_json, UPDTAE_ERR, '"Update datebase error!"');
			return;

		}
		echo sprintf(OK_JSON, '"'.$id.'"');
		return;		
	}
	private function convertfollower2json($arraydata){
		return makearray_json($arraydata);
	
	}
	// get who is the follower
	public function getfollowee(){
		$who = "";
		if( !checkrequestpara(array("followerid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');		
			return;

		}
		$followerid = $_REQUEST["followerid"];
		$dat = InitPHP::getDao('com');
		$results = $dat->get_followee_by_field("followerid", $followerid);
		if( empty($results) ){
			echo sprintf(OK_JSON, '[]');
			return;
		}
		echo sprintf(OK_JSON, $this->convertfollower2json($results));
		return;

	}
	// get who is the followee
	public function getfollower(){
		$whom = "";
		if( !checkrequestpara(array("tuserid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');		
			return;
		}
		$tuserid = $_REQUEST["tuserid"];

		$dat = InitPHP::getDao('com');
		$results = $dat->get_follower_by_field("tuserid", $tuserid);
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"No record found"');
			return;
		}
		echo sprintf(OK_JSON, $this->convertfollower2json($results));
		return;

	}
	public function checkfaned(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("tuserid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		$followed = 0;
		if( $dao->is_followed($_SESSION["userid"], $_REQUEST["tuserid"]))
			$followed = 1;
		echo sprintf(OK_JSON, "{followed:${followed}}");
		return;
	}
	public function delfollow(){
		if( !isset($_SESSION["userid"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if( !isset($_REQUEST["tuserid"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');		
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		$id = $dao->unlink_follwer($_SESSION["userid"], $_REQUEST["tuserid"]);
		if( $id )
			echo sprintf(OK_JSON, '{followed:0}');
		else
			echo sprintf(return_error_template_json, DEL_ERR, '"insert error"');
		return;

	}
	public function makefollow(){	
		if( !isset($_SESSION["userid"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
		if( !isset($_REQUEST["tuserid"])){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');		
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get dat error"');
			return;
		}	 
	
		$id = $dao->follow_user($_SESSION["userid"], $_REQUEST["tuserid"]);
		if( $id )
			echo sprintf(OK_JSON, "{followed:${id}}");
		else
			echo sprintf(return_error_template_json, INSERT_FAIL, '"insert error"');
		return;
	}

}
?>

