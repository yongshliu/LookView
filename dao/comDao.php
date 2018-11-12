<?php
    
    class comDao extends Dao{
       private $my_datebase = NULL;
	private $my_porject = NULL;
	private $comment_gift_field = NULL;
	private $comment_favor_field = NULL;
	private $exec_path_field = NULL;
       public function test(){
           return $this->dao->db->get_all('titles');
       }
	public function set_table($project){
		$this->my_project = $project;
	}
	public function __construct(){
		parent::__construct();
		$this->comment_gift_field= array("id", "project", "commentid", "authorname", "file", "whogive", "time");
		$this->comment_favor_field= array("id", "project", "commentid", "whofavor", "file", "favorwho", "time");
		$this->follower_field= array("id", "followerid", "tuserid", "time");
	//	$this->exec_path_field= array("id", "username", "header", "");

		$this->my_project = "linuxkernel";
		$this->connectdatebase();
	}
	public function del_record_by_fields($data, $table){
		if(!$this->my_datebase){
			return 0;
		}
		return $this->dao->db->delete_by_field($data, $table);
	}
	private function check_permission($action)
	{
		if($action == 'add')
		{
			;
		}
		else if($action == 'update')
		{
			;
		}
		else if($action == 'list')
		{
			;
		}
		else if($action == 'del')
		{
			;
		}
		return 1; // default would return 0 as failed. but now for test. 
	}
       private function connectdatebase($action)
       {
		$dbname = CUR_DBNAME;
		if(!$this->check_permission($action))
		{
			InitPHP::error_page("you don't have the  right to operate this");
			return 0;
		}

		if (empty($this->my_datebase))
		{
			$this->my_datebase= $this->init_db($dbname);
		
			if(empty($this->my_datebase))
			{
				InitPHP::error_page("connecting datebase(${dbname}) filed.");
				return 0;
			}
		}
		return 1;
	}
	public function isexist($data, $table){
		if( !$this->my_datebase){
			return 0;
		}
		return $this->dao->db->get_one_by_field($data, $table);
	/*
		$tmp = array();
		$sql = "select * from ".$table." where ";
		foreach($data as $key=>$val){
			$tmp[] = " `".$key."`='".$val."' ";
		}
		$sql .= implode("AND", $tmp);
		putlog($sql);
		$ret = $this->dao->db->get_all_sql($sql);
		if( $ret )
			return true;
		else
			return false;
*/
	}
	public function get_all_project(){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "select * from projects";
		return $this->dao->db->get_all_sql($sql);
	}
	public function get_project_by_fields($fields){
		if( !$this->my_datebase)
		{
			return 0;
		}
		$sql = "SELECT * from projects where ";
		foreach($fields as $key=>$val){
			$sql .= "`". ${key}."`='".${val}."'";
			if( ++$i != count($fields))
				$sql .=" AND ";
		}
		return $this->dao->db->get_all_sql($sql);

	}
	// insert a record and return the id
       public function insertcomment($filename, $lineno, $lineid, $author, $comment, $topdir, $object="", $gift=0, $replyto="")
       {
		if( !$this->my_datebase)
		{
			return 0;
		}
		$data = array('filename'=>$filename, 'lineno'=>$lineno, 'lineid'=>$lineid, 'object'=>$object, 'topdir'=>$topdir, 'replyto'=>$replyto, 'author'=>$author, 'comments'=>$comment);
		try{
			return $this->dao->db->insert($data, "comments");
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
       }
	public function get_sel_by_fields($sel, $fields, $table){
		if( !$this->my_datebase)
		{
			return 0;
		}
		$len = count($sel);
		if ( $len == 0)
			$selected = "*";
		else{
			$sellected = "";
			for($j=0;$j<$len;$j++){
				$selected .= $sel[$j];
				if( $j != $len-1 )
					$selected .=",";
			}
		}
		
		if( count($fields) == 0)
			$sql = "select ${selected} from ${table}";
		else{
			$sql = "SELECT ${selected} from ${table} where ";
			foreach($fields as $key=>$val){
				$sql .= "`". ${key}."`='".${val}."'";
				if( ++$i != count($fields))
					$sql .=" AND ";
			}
		}
		//putlog($sql);
		return $this->dao->db->get_all_sql($sql);// the return is an array which can be accessed at once.

	}
	public function get_all_counted($table, $num=10, $sort="DESC", $order="id"){
		if( !$this->my_datebase)
		{
			return 0;
		}
		$sql = "select * from ${table} ORDER by ${order} ${sort} limit ${num}";
		return $this->dao->db->get_all_sql($sql);
	}
	public function get_all_by_fields($fields, $table){
		if( !$this->my_datebase)
		{
			return 0;
		}
		if( count($fields) == 0)
			$sql = "select * from ${table}";
		else{
			$sql = "SELECT * from ${table} where ";
			foreach($fields as $key=>$val){
				$sql .= "`". ${key}."`='".${val}."'";
				if( ++$i != count($fields))
					$sql .=" AND ";
			}
		}
		//putlog($sql);
		return $this->dao->db->get_all_sql($sql);// the return is an array which can be accessed at once.
		

	}

	public function get_comments_by_fields($fields)
	{
		//putlog($sql);
		return $this->get_all_by_fields($fields, "comments");
	
	}
	public function del_coments_by_fields($fields){
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->delete_by_field($fields, "comments");

	}
	public function del_by_id($id, $table)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->delete_by_field(array("id"=>$id), $table);
	}
	public function get_comments_by_author($author)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql('SELECT * from comments where author="'.$author.'" ORDER BY id DESC');

	}
	public function update_comments_by_id($id, $user, $comment)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$sql = sprintf('UPDATE comments SET comments="%s" where id =%d and author="%s"', $comment, $id, $user);
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	}
	public function give_gift($topdir, $commentid, $authorname, $file, $whogive)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$result = $this->dao->db->query("SELECT * from commentgift where whogive='${whogive}' and commentid=${commentid} and topdir='${topdir}'");
		if( $result && $result->num_rows != 0){
			return 0;
		}
		$data = array('topdir'=>$topdir, 'commentid'=>$commentid, 'authorname'=>$authorname, 'file'=>$file, 'whogive'=>$whogive);
		try{
			return $this->dao->db->insert($data, 'commentgift');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	// get all the gift or favor happend in the specified file regarding to the $type
	public function get_com_gf_by_file($topdir, $file, $type){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "";
		if( $type == "gift"){
			$sql = "select commentid, whogive from commentgift where commentgift.file='${file}' and commentgift.topdir='${topdir}'";
		}else{
			$sql = "select commentid, whofavor from commentfavor where commentfavor.file='${file}' and commentfavor.topdir='${topdir}'";
		}
		//putlog($sql);
		return $this->dao->db->get_all_sql($sql);	
		
	}	
	public function get_gift_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT * from commentgift where ${field}='${val}'");

	}
	public function cancel_favor($whofavor, $commentid)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->delete_by_field(array("whofavor"=>$whofavor, "commentid"=>$commentid), "comments");

	}
	public function log_favor($favorwho, $whofavor, $topdir, $file, $commentid)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$result = $this->dao->db->query("SELECT * from commentfavor where whofavor='${whofavor}' and commentid=${commentid} and topdir='${topdir}'");
		if( $result && $result->num_rows != 0){
			return 0;
		}

		$data = array('favorwho'=>$favorwho, 'whofavor'=>$whofavor, 'topdir'=>$topdir, 'file'=>$file, 'commentid'=>$commentid);
		try{
			return $this->dao->db->insert($data, 'commentfavor');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_favor_com_by_filed($field, $val){
		if( !$this->my_datebase)
		{
			return 0;
		}

		$sql = "SELECT commentfavor.*, comments.lineno, comments.author, comments.comments ";
		$sql .= "from commentfavor, comments where commentfavor.${field}='".${val}."' and commentfavor.commentid = comments.id ";
		//putlog($sql);
		return $this->dao->db->get_all_sql($sql);

	}
	public function get_favor_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT * from commentfavor where ${field}='${val}'");

	}
	public function is_followed($followerid, $tuserid){
		if(!$this->my_datebase){
			return 0;
		}
		$sql = "SELECT * from follower where tuserid=${tuserid} and followerid=${followerid}";
		//putlog($sql);
		$result = $this->dao->db->query($sql);
		if( $result && $result->num_rows != 0){
			return 1;
		}
		return 0;
	}
	public function follow_user($followerid, $tuserid){
		if(!$this->my_datebase){
			return 0;
		}
		if( $this->is_followed($followerid, $tuserid) )
			return -1;
		$newfollow = array('followerid'=>$followerid, 'tuserid'=>$tuserid);
		try{
			return $this->dao->db->insert($newfollow, 'follower');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
		
	}
	public function unlink_follwer($followerid, $tuserid){
		return $this->del_record_by_fields(array("followerid"=>$followerid, "tuserid"=>$tuserid), "follower");
	}
	public function get_followee_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT user.username as tuser, follower.* from user, follower where follower.followerid=user.id and ${field}='${val}'");

	}

	public function get_follower_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		if( !in_array($field, $this->follower_field))
		{
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT * from follower where ${field}='${val}'");

	}
	public function delink_follower_by_file($field, $val)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->delete_by_field(array($field=>"${val}"), "follower");

	}
	public function count_by_field($array, $table){
		if( !$this->my_datebase){
			return 0;
		}
		return $this->dao->db->get_count($table, $array);
		
	}
	/************ execution path *****************/
	public function get_exec_header_by_user($user){
		if(!$this->my_datebase){
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT executionheader.* from executionheader, user where executionheader.userid=user.id and user.username='${user}'");

	}
	public function get_exec_header_all_by_userid($userid){
		if(!$this->my_datebase){
			return 0;
		}
		//$sql = "select executionheader.*, 
	}
	public function get_exec_header_by_field($field, $val){
		if(!$this->my_datebase){
			return 0;
		}
		$sql = "SELECT executionheader.*, user.username as username from executionheader, user where user.id=executionheader.userid and executionheader.${field}='${val}'";
		return $this->dao->db->get_all_sql($sql);

	}
	public function del_exec_header_by_field($array){
		return $this->del_record_by_fields($array, 'executionheader');
	}
	public function  update_exec_header($id, $data, $userid){
		if( !$this->my_datebase){
			return 0;
		}
		$update = "";
		$i = 0;
		foreach($data as $key=>$val){
			$update .= "`". ${key}."`='".${val}."'";
			if( ++$i != count($data))
				$update .=", ";
		}
		if( $user )
			$sql = sprintf("UPDATE executionheader SET ${update} where `id` =${id} AND `userid`=\"${userid}\"");
		else
			$sql = sprintf("UPDATE executionheader SET ${update} where `id` =${id}");
		//putlog($sql);
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	}

	public function create_exec_path($data){
		if(!$this->my_datebase){
			return 0;
		}
		//$data = array('name'=>$name, 'user'=>$user, 'des'=>$des);
		try{
			return $this->dao->db->insert($data, 'executionheader');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	
	public function insert_exec_path($user, $header, $project, $comid, $parent, $prev, $next){
		if( !$this->my_datebase){
			return 0;
		}
		//$data = array('username'=>$user, 'header'=>$header, 'project'=>$project, 'comid'=>$comid, 'comuser'=>$comuser, "parent"=>$parent, "left"=>$left, "right"=>$right);
		$sql = "CALL flowchart_insert('{$user}', $header, '{$project}', $comid, $parent, $prev, $next, @errret);";	
		try{
			$ret = $this->dao->db->query($sql);
			if($ret ){
				$vals = $this->dao->db->fetch_assoc($ret);
				return $vals["errcode"];
			}
			else
				return 0;
			//return $this->dao->db->insert_id();
		}
                catch(Exception $e){
			//InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}

	public function  update_exec_path($id, $data, $user){
		if( !$this->my_datebase){
			return 0;
		}
		$update = "";
		$i = 0;
		foreach($data as $key=>$val){
			$update .= "`". ${key}."`='".${val}."'";
			if( ++$i != count($data))
				$update .=", ";
		}
		if( $user )
			$sql = sprintf("UPDATE flowchart SET ${update} where id =${id} AND user=\"${user}\"");
		else
			$sql = sprintf("UPDATE flowchart SET ${update} where id =${id}");
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	}
	public function del_flowchart_by_header($header, $user){
		if( !$this->my_datebase){
			return 0;
		}
		return $this->del_record_by_fields(array("header"=>$header, "username"=>$user), 'flowchart');

	}
	public function del_flowchart_by_id($id, $user){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "CALL flowchart_del('{$user}', $id);";	
		try{
			$ret = $this->dao->db->query($sql);
			if($ret ){
				$vals = $this->dao->db->fetch_assoc($ret);
				return $vals["delid"];
			}
			else
				return 0;
			//return $this->dao->db->insert_id();
		}
                catch(Exception $e){
			//InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
	}
	public function flowchart_moveup($id, $user){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "CALL flowchart_moveup('{$user}', $id);";	
		//putlog($sql);
		try{
			$ret = $this->dao->db->query($sql);
			if($ret ){
				$vals = $this->dao->db->fetch_assoc($ret);
				return $vals["movret"];
			}
			else
				return 0;
			//return $this->dao->db->insert_id();
		}
                catch(Exception $e){
			//InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function flowchart_movedown($id, $user){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "CALL flowchart_movedown('{$user}', $id);";	
		//putlog($sql);
		try{
			$ret = $this->dao->db->query($sql);
			if($ret ){
				$vals = $this->dao->db->fetch_assoc($ret);
				return $vals["movret"];
			}
			else
				return 0;
			//return $this->dao->db->insert_id();
		}
                catch(Exception $e){
			//InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_exec_path_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		/*
		if( !in_array($field, $this->comment_gift_field))
		{
			return 0;
		}*/
		return $this->dao->db->get_all_sql("SELECT * from flowchart where ${field}='${val}'");

	}
	public function get_exec_path_com_by_field($field, $val){
		if( !$this->my_datebase ){
			return 0;
		}
		//dd$sql = "SELECT *, executionpath.id as pid from executionpath, comments where executionpath.${field}='".${val}."' and executionpath.comid = comments.id";
		$sql = "SELECT flowchart.*, comments.filename, comments.lineno, comments.author, comments.comments, comments.topdir ";
		$sql .="from flowchart, comments where flowchart.${field}='".${val}."' and flowchart.comid = comments.id ";
		$sql .= " order by parent";
		return $this->dao->db->get_all_sql($sql);
	}
	public function insert_flowchart_gift_favor($whodid, $flowchartid, $table){
		if( !$this->my_datebase)
		{
			return 0;
		}
		// self can favor self
		$usercount = $this->dao->db->get_count("executionheader", array("id"=>$flowchartid, "userid"=>$whodid)) ;
		if( $usercount >0)
			return 0;
		// cant fan twice
		$fccount = $this->dao->db->get_count($table, array("flowchartid"=>$flowchartid, "whodid"=>$whodid));
		if( $fccount >0 )
			return 0;
		$data = array('flowchartid'=>$flowchartid, 'whodid'=>$whodid);
		try{
			return $this->dao->db->insert($data, $table);
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
		
	}	
	public function fetch_flowchart_state_tuser($tuser, $whodid, $table){
		if( !$this->my_datebase)
		{
			return 0;
		}
		$sql = "select user.id from user where username='${tuser}'";
		$tuserinfo = $this->dao->db->get_all_sql($sql);
		if( count($tuserinfo) < 1 ){
			return 0;
		}
		$tuserid = $tuserinfo[0]["id"];
		if( $table == "flowchartgift")
			$sql = "select flowchartgift.* from flowchartgift, executionheader where flowchartgift.whodid=${whodid} and executionheader.userid=${tuserid} and flowchartgift.flowchartid=executionheader.id";
		else
			$sql = "select flowchartfavor.* from flowchartfavor, executionheader where flowchartfavor.whodid=${whodid} and executionheader.userid=${tuserid} and flowchartfavor.flowchartid=executionheader.id";
		return $this->dao->db->get_all_sql($sql);
			
	}
	
}

?>
