<?php

class userController extends Controller{
	var $my_key;
	var $my_td;
	var $my_mode;
	var $my_iv_size;
	var $my_iv;
	public function __construct(){
		parent::__construct();
		$this->my_key = "1234567890abcdefg";
		$this->my_td = MCRYPT_RIJNDAEL_256;
		$this->my_mode = MCRYPT_MODE_CBC;
		$this->my_iv_size = mcrypt_get_iv_size($this->my_td, $this->my_mode);
		$this->my_iv = mcrypt_create_iv($this->my_iv_size, MCRYPT_RAND);

	}
    public $initphp_list = array('register', 'infocheck', 'userlogin', 'sessioncheck', 'userlogout', 'getuseradvance', 'updateprofile', 'getprofile',
	'getexecnamebyuser', 'makenewexecpath', 'delexecheaderbyid', 'insertexecpath', 'delexecpath','fcmoveup', 'fcmovedown',
	'getexecpathcombyuser',  'getexecpathcombyhid', 'updateexecheader', 'makenewfc', 'updateflowcharts', 'getfcallbyuserid', "updatefcheader", "delfc");
    public function register(){
        if( !isset($_REQUEST["username"]) || !isset($_REQUEST["pwd"]) || !isset($_REQUEST["email"]))
	{
		echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
		return;
	}
	$dao = InitPHP::getDao('user');
	if(empty($dao))
	{
		echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
		return;
	}	 
	
	$id = $dao-> register(trim($_REQUEST["username"]), trim($_REQUEST['pwd']), trim($_REQUEST['email']));
	if ($id ){
		$session = $dao->createSession($id, $_REQUEST["username"], 30);	
		$_SESSION["user"] = $_REQUEST["username"];	
		$_SESSION["userid"] = $id;
		$_SESSION['session'] = $session['sessionid'];
		$json_ret = '{user:"'.$_SESSION["user"].'"';
		if( $session ){
			$_SESSION['session'] = $session['sessionid'];
			$json_ret .=  ',session:"'.$_SESSION['session'].'"}';
		}	
		else{
			$json_ret .= ',session:""}';
		}
		echo sprintf(OK_JSON, $json_ret);
		return;
	}
	echo sprintf(return_error_template_json, INSERT_FAIL, '"creating new user failed"');
	return;

    }
	public function infocheck(){
		$info = array();
		if( isset($_REQUEST["username"]))
			$info["username"] = $_REQUEST["username"];
		if( isset($_REQUEST["email"]))
			$info["emailaddr"] = $_REQUEST["email"];
		if( count($info) > 0 ){
			$dao = InitPHP::getDao('user');
			if(empty($dao))
			{
				echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
				return;
			}	 
			if( $dao->infocheckok($info)){
				echo sprintf(OK_JSON, '"okay"');
				return;
			}			
		}else{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
	
		}
		echo sprintf(return_error_template_json,DEFINED , '"defined"'); 
		return;

	}
	function my_encrypt($data){
		return $this->hexFromBin(mcrypt_encrypt($this->my_td, $this->my_key, "livyalu", $this->my_mode, $this->my_iv));
	}
	function my_decrypt($secret){
		return trim(mcrypt_decrypt($this->my_td, $this->my_key, $this->binFromHex($secret), $this->my_mode, $this->my_iv));
	}
	function hexFromBin($data){
		return bin2hex($data);
	}
	function binFromHex($data){
		$len = strlen($data);
		return pack("H".$len, $data);
	}
	public function sessioncheck(){
		if( !isset($_REQUEST["session"]) || !isset($_REQUEST["user"]))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$session = trim($_REQUEST["session"]);
		$dao = InitPHP::getDao('user');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
			return;
		}
		$ret = 	$dao->getSession($session);
		if (!$ret )
		{
			echo sprintf(return_error_template_json, NO_SESSION, '"The session is not existed"');
			return;
		}
		if( trim($_REQUEST["user"]) != trim($ret["username"]))
		{
			echo sprintf(return_error_template_json, SESSION_WRONG, '"Session and User doesnt match"');
			return;	
		} 
		
		if ( time() > $ret["expire"])
		{
			echo sprintf(return_error_template_json, SESSION_EXPIRE, '"Session is expired"');
			return;		
		}
		$_SESSION["user"] = $ret['username'];
		$_SESSION["userid"] = $ret['userid'];
		$_SESSION['session'] = $ret['sessionid'];
		//putlog("user:".$_SESSION["user"]." session:".$_SESSION['session']);

		echo sprintf(OK_JSON, make_json(array("userid"=>$_SESSION["userid"], "session"=>$_SESSION["session"])));
		return;
 
	}
	public function getuseradvance(){
		if( !checkrequestpara(array("userid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}

		$userid = $_REQUEST["userid"];
		$dao = InitPHP::getDao('user');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
			return;
		}	
		if( $ret = $dao->get_user_advance($userid)){
			$json_ret = make_json($ret);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;

	}
	public function getprofile(){
		if( !checkrequestpara(array("tuser"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
/*
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;
		}
*/
		$user = $_REQUEST["tuser"];
		$dao = InitPHP::getDao('user');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
			return;
		}	
		if( $profile = $dao->get_profiles($user)){
			$profile["comtotal"]=$dao->count_by_field(array("author"=>"${user}"), comments);
			$profile["byfavortotal"]=$dao->count_by_field(array("favorwho"=>"${user}"), commentfavor);
			$profile["favortotal"]=$dao->count_by_field(array("whofavor"=>"${user}"), commentfavor);
			$profile["combeliked"]=$dao->count_by_field(array("authorname"=>"${user}"), commentgift);
			$profile["pagetotal"]=$dao->count_by_field(array("user"=>"${user}"), pagehistory);
			$profile["execflowtotal"]=$dao->count_by_field(array("userid"=>$profile["id"]), executionheader);
			$profile["followtotal"]=$dao->count_by_field(array("followerid"=>$profile["id"]), follower);
			$profile["byfollowtotal"]=$dao->count_by_field(array("tuserid"=>$profile["id"]), follower);
			$profile["visitingusertotal"]=$dao->count_by_field(array("tuser"=>"${user}"), tuserhistory);
			$profile["flowchartliked"]=$dao->count_be_liked_flowchart($profile["id"]);
			$profile["flowchartfavored"]=$dao->count_be_favored_flowchart($profile["id"]);
			$json_ret = make_json($profile);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;
	

	}
	public function updateprofile(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("userid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$userid = $_REQUEST["userid"];
		$fields = array();
		if( isset($_REQUEST["city"]))
			$fields["city"] = $_REQUEST["city"];
		if( isset($_REQUEST["business"]))
			$fields["business"] = $_REQUEST["business"];
		if( isset($_REQUEST["male"]))
			$fields["male"] = $_REQUEST["male"];
		if( isset($_REQUEST["phoneno"]))
			$fields["phoneno"] = $_REQUEST["phoneno"];
		if( isset($_REQUEST["shortdes"]))
			$fields["shortdes"] = $_REQUEST["shortdes"];
		if( isset($_REQUEST["longdes"]))
			$fields["longdes"] = $_REQUEST["longdes"];
		if( count($fields) > 0){
			$dao = InitPHP::getDao('user');
			if(empty($dao))
			{
				echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
				return;
			}
			$retid = $dao->update_profile_by_fields($userid, $fields);
			if( $retid ){
				echo sprintf(OK_JSON, '"'.$retid.'"');
				return;
			}
			echo sprintf(return_error_template_json, UPDTAE_ERR, '"Update datebase error!"');
			return;

		}
		echo sprintf(return_error_template_json, PARA_ERR, '"no available parameter"');
		return;
	}
	public function userlogout(){
		session_unset();
		session_destroy();
	}
	public function userlogin(){
		if( !isset($_REQUEST["username"]) || !isset($_REQUEST["pwd"]))
		{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$username = $_REQUEST["username"];
		$dao = InitPHP::getDao('user');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"get user dao error"');
			return;
		}	 
/*		// test encrypt
		$secret = $this->my_encrypt("livylau");//mcrypt_encrypt($this->my_td, $this->my_key, "livyalu", $this->my_mode, $this->my_iv);
		$data = $this->my_decrypt($secret);//mcrypt_decrypt( $this->my_td, $this->my_key, $this->binFromHex($this->hexFromBin($secret)), $this->my_mode, $this->my_iv);
		$json_ret = '{';
		$json_ret .= 'td:"'.$this->my_td.'",mode:"'.$this->my_mode.'",ivsize:"'.$this->my_iv_size.'",iv:"'.bin2hex($this->my_iv).'",';
		$json_ret .= 'data:"'.trim($data).'",secret:"'.bin2hex($secret).'"}';
*/	
		if( $ret = $dao-> checkpwdok($username, $_REQUEST['pwd'])){
			$_SESSION["user"] = $ret['username'];
			$_SESSION["userid"] = $ret['id'];
			$session = $dao->createSession($ret['id'], $ret['username'], 30);	
			$json_ret = '{user:"'.$_SESSION["user"].'",id:'.$ret['id'];

			if( $session ){
				$_SESSION['session'] = $session['sessionid'];
				$json_ret .=  ',session:"'.$_SESSION['session'].'"}';
			}	
			else{
				$json_ret .= ',session:""}';
			}
			echo sprintf(OK_JSON, $json_ret);
		}
		else
			echo sprintf(return_error_template_json, PWDERR, '"failed"');
		return;

	}
    public function funcs(){
        echo 'Function sets supported in this install are : <br/>';
        $extensions = get_loaded_extensions();
        foreach($extensions as $each_ext)
        {
                echo "$each_ext <br />";
                echo '<ul>';
                $ext_funcs = get_extension_funcs($each_ext);
                foreach($ext_funcs as $func)
                {
                    echo"<li> $func </li>";
                }
                echo '</ul>';
        }
    }
    public function sessiontest(){
        session_start();
        if(isset($_POST['userid']) && isset($_POST['password'])){
            $userid = $_POST['userid'];
            $pwd = $_POST['password'];
            if( $userid == 'user' && $pwd == 'password'){
                echo "welcome $userid to this site";
                 $_SESSION['valid_user'] = $userid;
            }else
                 echo "you need to input 'user' and 'password' for this test";
            exit();
        }
        if(isset($_GET['p'])){
            $p = $_GET['p'];
            if($p == 'logout'){
                unset($_SESSION['valid_user']);
                session_destroy();
                echo "logged out";
            }
            exit();
        }
        if(isset($_SESSION['valid_user'])){
            echo "you are logged in as:". $_SESSION["valid_user"]. "<br>";
            echo '<a href="?c=user&a=sessiontest&p=logout"> log out</a><br/>';
            exit();
        }
        echo '<form method="post" action="?c=user&a=sessiontest">';
        echo '<table>';
        echo '<tr><td>Userid(user):</td>';
        echo '<td><input type="text" name="userid"></td></tr>';
        echo '<tr><td>Password(password):</td><td><input type="password" name="password"></td></tr>';
        echo '<tr><td colspan="2" align="center">';
        echo '<input type="submit" value="log in"></td></tr>';
        echo '</table></form>';
        
    }
	/********** execution path *******************/
     	public function getexecnamebyuser(){
		$user = "";
		if( !checkrequestpara(array("tuser"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$user = $_REQUEST["tuser"];	
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		if( $exec = $dao->get_exec_header_by_user($user)){
			$json_ret =makearray_json($exec);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(OK_JSON, '[]');
		return;

		
	}
	public function delfc(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}	 
		$id = $dao->del_record_by_fields(array("id"=>$_REQUEST["id"], "userid"=>$_SESSION["userid"]), "flowcharts");
		echo sprintf(OK_JSON, '"delete okay"');
		
	}
	public function makenewfc(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		$executionname = trim($_SESSION["user"]).date("---");
		if( isset($_REQUEST["name"]) ){
			$executionname = trim($_REQUEST["name"]);
			
		}
		else{
			echo sprintf(return_error_template_json, PARA_ERR, '"Need a name"');
			return;	
		}
		$des = "";
		if( isset($_REQUEST["des"]) )
			$des = $_REQUEST["des"];
		$kw="";
		if( isset($_REQUEST["kw"]))
			$kw = $_REQUEST["kw"];
		$dao = InitPHP::getDao('user');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}	 
		$id = $dao->new_item(array("userid"=>$_SESSION["userid"], "name"=>$executionname, "des"=>$des, "keywords"=>$kw), "flowcharts");
		if( $id ){
			$json_ret = '{id:'.$id.',name:"'.$executionname.'"}';
			echo sprintf(OK_JSON, $json_ret);
			return;
		}else{
			echo sprintf(return_error_template_json, INSERT_FAIL, '"Creating new execution path failed"');
			return;
		}	
	}
	
	public function makenewexecpath(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		$executionname = trim($_SESSION["user"]).date("---");
		if( isset($_REQUEST["name"]) ){
			$executionname = trim($_REQUEST["name"]);
			
		}
		else{
			echo sprintf(return_error_template_json, PARA_ERR, '"Need a name"');
			return;	
		}
		
		$des = "";
		if( isset($_REQUEST["des"]) )
			$des = $_REQUEST["des"];
		$kw="";
		if( isset($_REQUEST["kw"]))
			$kw = $_REQUEST["kw"];
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}	 
		$id = $dao->create_exec_path(array("userid"=>$_SESSION["userid"], "name"=>$executionname, "des"=>$des, "keywords"=>$kw));
		if( $id ){
			$json_ret = '{id:'.$id.',name:"'.$executionname.'"}';
			echo sprintf(OK_JSON, $json_ret);
			return;
		}else{
			echo sprintf(return_error_template_json, INSERT_FAIL, '"Creating new execution path failed"');
			return;
		}	
	}
	public function updateexecheader(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$data = array();
		if( isset($_REQUEST["name"]) ){
			$data['name'] = $_REQUEST["name"];
		}
		if( isset($_REQUEST["des"])){
			$data['des'] = $_REQUEST["des"];
		}
		if( count($data)>0){
			$dao = InitPHP::getDao('com');
			if(empty($dao))
			{
				echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
				return;
			}
			$id = $dao->update_exec_header($_REQUEST["id"], $data, $_SESSION["userid"]);
			if ($id ){
				echo sprintf(OK_JSON, '"updated good"');
				return;	
			}

		}
		echo sprintf(return_error_template_json, UPDTAE_ERR, '"upate execution header failed"');
		return;	

	}
	public function delexecheaderbyid(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}

		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		$execnames = $dao->get_exec_header_by_field("id", $_REQUEST["id"]);
		if (!$execnames ){
			echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
			return;	
		}
		$dao->del_exec_header_by_field(array("id"=>$_REQUEST["id"], "userid"=>$_SESSION["userid"]));	
		$dao->del_flowchart_by_header($execnames[0]["id"], $_SESSION["user"]);
		echo sprintf(OK_JSON, '"delete okay"');
		
	}

	public function insertexecpath(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("header", "project", "comid"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;

		}
		// try to make the request synced over the time or network jam, it's better to handle the path-chain on server side.
		// so the first priority to handle if the parent is existed and then for the left;
		// fixme, next we should handle all this in transaction
		$parent = isset($_REQUEST["parent"])?$_REQUEST["parent"]:0;
		$prev = isset($_REQUEST["prev"])?$_REQUEST["prev"]:0;
		$next = isset($_REQUEST["next"])?$_REQUEST["next"]:0;
		$id = $dao->insert_exec_path($_SESSION["user"], $_REQUEST["header"], $_REQUEST["project"],  $_REQUEST["comid"], $parent, $prev, $next);
		if($id){
		
			$json_ret = "({id:${id} })";
			echo sprintf(OK_JSON, $json_ret);
		}else{
			echo sprintf(return_error_template_json, INSERT_FAIL, '"inserting execution path failed"');
			return;
		}		
	}
	public function getexecpathbyid(){
		$id = "";
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$id = $_REQUEST["id"];
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		if( $execpath = $dao->get_exec_path_by_field("id", $id)){
			$json_ret = makearray_json($execpath);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;
	}

	public function getexecpathcombyhid(){
		$hid = "";
		if( isset($_REQUEST["hid"])){
			$hid = $_REQUEST["hid"];	
		}else{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		if( $execpath = $dao->get_exec_path_com_by_field("header", $hid)){
			$json_ret = makearray_json($execpath);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;

		
	}

	public function getexecpathcombyuser(){
		$user = "";
		if( isset($_REQUESST["user"])){
			$user = $_REQUEST["user"];	
		}else if( isset($_SESSION["user"])){
			$user = $_SESSION["user"];
		}else{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		if( $execpath = $dao->get_exec_path_com_by_field("user", $user)){
			$json_ret = makearray_json($execpath);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;

		
	}
	public function getexecpathbyuser(){
		$user = "";
		if( isset($_REQUESST["user"])){
			$user = $_REQUEST["user"];	
		}else if( isset($_SESSION["user"])){
			$user = $_SESSION["user"];
		}else{
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if(empty($dao))
		{
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;
		}
		if( $execpath = $dao->get_exec_path_by_field("user", $user)){
			$json_ret = makearray_json($execpath);
			echo sprintf(OK_JSON, $json_ret);
			return;

		}

		echo sprintf(return_error_template_json, NO_RECORD, '"no available data"');
		return;

	}
	public function delexecpath(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;

		}
		if($dao->del_flowchart_by_id($_REQUEST["id"], $_SESSION["user"])){
			echo sprintf(OK_JSON, '"delete okay"');
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"delete error"');
		}
		return;

	}
	public function fcmoveup(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;

		}
		if($dao->flowchart_moveup($_REQUEST["id"], $_SESSION["user"])){
			echo sprintf(OK_JSON, '"flowchart move-up okay"');
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"flowchart moveup failed"');
		}
		return;

	}
	public function fcmovedown(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;

		}
		if($dao->flowchart_movedown($_REQUEST["id"], $_SESSION["user"])){
			echo sprintf(OK_JSON, '"flowchart move-down okay"');
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"flowchart movedown failed"');
		}
		return;

	}
	public function getfcallbyuserid(){
		if( !checkrequestpara(array("tuser"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('user');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;

		}
		if($results = $dao->get_all_field(array("id", "userid", "name", "des", "keywords", "time"), array("userid"=>$_REQUEST["tuser"]), "flowcharts")){
			echo sprintf(OK_JSON, makearray_json($results));
		}else{
			echo sprintf(return_error_template_json, DEL_ERR, '"get flowcharts heads failed"');
		}
		return;
	
	}
	public function updateflowcharts(){
		if(!isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
	
		}
		if( !checkrequestpara(array("id", "fc"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;

		}
		$dao = InitPHP::getDao('user');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;	
		}
		$id = $dao->update_table(array("fc"=>$_REQUEST["fc"]), array("id"=>$_REQUEST["id"], "userid"=>$_SESSION["userid"]), "flowcharts");
		echo sprintf(OK_JSON, '"flowcharts update ok"');

	}
	public function updateexecpath(){
		if( !isset($_SESSION["user"])){
			echo sprintf(return_error_template_json, NEEDLOGIN, '"please log in"');
			return;	
		}
		if( !checkrequestpara(array("id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('com');
		if( empty($dao) ){
			echo sprintf(return_error_template_json, GET_DAO_ERR, '"getting user dao error"');
			return;	
		}
		$update = array();
		if (isset($_REQUEST["parent"]))
			$update["parent"] = $_REQUEST["parent"];
		if (isset($_REQUEST["left"]))
			$update["left"] = $_REQUEST["left"];
		if (isset($_REQUEST["right"]))
			$update["right"] = $_REQUEST["right"];
		if( count($update) > 0)
			$dao->update_exec_path($_REQUEST["id"], $update, $_SESSION["user"]);
	
	}
}

?>
