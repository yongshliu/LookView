<?php



class symController extends Controller{
	public function __construct(){
		parent::__construct();
	}

    public $initphp_list = array("getall", "getallpage", "additem", "updateitem", "delitem", "delitemId", "getitemid", "getallwhere");
  
	
	private function buildarray($num, $k, $v){
		
		$i = 0;
		$ret = array();
		for($i=0;$i< (int)$num;$i++){
			$ckey = $k.$i;
			$vkey = $v.$i;
			if( !isset($_REQUEST[$ckey]) )
				return 0;
			if( !isset($_REQUEST[$vkey]) )
				return 0;
			
			$ret[$_REQUEST[$ckey]]=$_REQUEST[$vkey];
		}
		return $ret;
	}
	public function getall(){
		if( !checkrequestpara(array("tbl", "num"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$results;
		$dao = InitPHP::getDao('sym');
		if ((int)$_REQUEST["num"] == 0 || $_REQUEST["num"] == "0"){
			$results = $dao->getAll($_REQUEST["tbl"], NULL);
		}else{

			$fields = buildarray($_REQUEST["num"], "k","v");
			if( $fields ){
				$results = $dao->getAll($_REQUEST["tbl"], $fields);
			}
		}
		if( !empty($results) ){
			echo sprintf(OK_JSON, makearray_json($results));
			return;
			
		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
		return;
	} 
	public function getallpage(){
		if( !checkrequestpara(array("tbl", "num","offset","size"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$results;
		$dao = InitPHP::getDao('sym');
		if ($_REQUEST["num"] == 0){
			$results = $dao->getPage($_REQUEST["tbl"], $_REQUEST["offset"], $_REQUEST["size"],  array());
		}else{

			$fields = buildarray($_REQUEST["num"], "k","v");
			if( $fields ){
				$results = $dao->getAll($_REQUEST["tbl"], $_REQUEST["offset"], $_REQUEST["size"], $fields);
			}
		}
		if( !empty($results) ){
			echo sprintf(OK_JSON, makearray_json($results));
			return;
			
		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
		return;
	} 
	public function getitemid(){
		if( !checkrequestpara(array("tbl", "id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		
		$dao = InitPHP::getDao('sym');
		$results = $dao->getAll($_REQUEST["tbl"], array("id"=>$_REQUEST["id"]));
		if( !empty($results) ){
			echo sprintf(OK_JSON, makearray_json($results));
			return;
			
		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
		return;
	}
	public function getallwhere(){
		if( !checkrequestpara(array("tbl", "num"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		if ($_REQUEST["num"] == 0)
			return getall();
		$dao = InitPHP::getDao('sym');
		$fields = $this->buildarray($_REQUEST["num"], "k","v");
		//var_dump($fields);
		if( $fields ){		
		
			$results = $dao->getAll($_REQUEST["tbl"], $fields);
			if( !empty($results) ){
				echo sprintf(OK_JSON, makearray_json($results));
				return;
			
			}
		}
		echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
		return;
	}
	public function getallcond(){
		if( !checkrequestpara(array("tbl", "col", "val"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$dao = InitPHP::getDao('sym');
		$results = $dao->getAll($_REQUEST["tbl"], array($_REQUEST["col"]=>$_REQUEST["val"]));
		if( empty($results) ){
			echo sprintf(return_error_template_json, NO_RECORD, '"no record found"');
			return;
		}
		echo sprintf(OK_JSON, makearray_json($results));
		return;
	}

	public function additem(){
		//echo file_get_contents('php://input');
		//$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}'; 
		//echo (json_decode($json,true)["a"]);
		
		//$json= json_decode(file_get_contents('php://input'), true);
		// var_dump($_SERVER);
		//return;
		$data = 0;
		if( !checkrequestpara(array("tbl"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		if( stristr($_SERVER['CONTENT_TYPE'], "json") ){
			$data = json_decode(file_get_contents('php://input'), true);
		}else{
		
			$id = 0;
			$data = $this->buildarray($_REQUEST["num"], "k", "v");
		}
		//var_dump($data);
		//return;
		if( $data ){
			$dao = InitPHP::getDao('sym');
			$id = $dao->insert($_REQUEST["tbl"], $data);
		}
		if( $id ){
			echo sprintf(OK_JSON, '"'.$id.'"');
			return;
			
		}
		echo sprintf(return_error_template_json, INSERT_FAIL, '"insert error"');
		return;
	}
	public function updateitem(){
		if( !checkrequestpara(array("tbl", "id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		if( !stristr($_SERVER['CONTENT_TYPE'], "json") ){
			echo sprintf(return_error_template_json, PARA_ERR, '"only support json"');
			return;
		}
		$data = json_decode(file_get_contents('php://input'), true);
		
		$ret= 0;
		//$data = $this->buildarray($_REQUEST["num"], "k", "v");
		//$field = $this->buildarray($_REQUEST["fnum"], "fk", "fv");
		if( $data ){
			$dao = InitPHP::getDao('sym');
			$ret = $dao->update($_REQUEST["tbl"], $data, array("id"=>$_REQUEST["id"]));
		}
		echo sprintf(OK_JSON, '"'.$ret.'"');
		return;
				
	}
	public function delitem(){
		if( !checkrequestpara(array("tbl", "fnum"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$ret= 0;
		$field = $this->buildarray($_REQUEST["num"], "fk", "fv");
		if( $data ){
			$dao = InitPHP::getDao('sym');
			$ret = $dao->delete($_REQUEST["tbl"], $field);
		}
		echo sprintf(OK_JSON, '"'.$ret.'"');
		return;
	}
	public function delitemId(){
		if( !checkrequestpara(array("tbl", "id"))){
			echo sprintf(return_error_template_json, PARA_ERR, '"parameters error"');
			return;
		}
		$ret= 0;
		$dao = InitPHP::getDao('sym');
		$ret = $dao->delete($_REQUEST["tbl"], array("id"=>$_REQUEST["id"]));
		
		echo sprintf(OK_JSON, '"'.$ret.'"');
		return;
	}
}
	
?>

