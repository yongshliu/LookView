<?php
    
    class linuxkernelDao extends Dao{
       private $my_datebase = NULL;
	private $comment_gift_field = NULL;
	private $comment_favor_field = NULL;
       public function test(){
           return $this->dao->db->get_all('titles');
       }
	public function __construct(){
		parent::__construct();
		$this->comment_gift_field= array("id", "project", "commentid", "authorname", "file", "whogive", "time");
		$this->comment_favor_field= array("id", "project", "commentid", "whofavor", "file", "favorwho", "time");

		$this->connectdatebase();
		
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
		if(!$this->check_permission($action))
		{
			InitPHP::error_page("you don't have the  right to operate this");
			return 0;
		}

		if (empty($this->my_datebase))
		{
			$this->my_datebase= $this->init_db("linux");
		
			if(empty($this->my_datebase))
			{
				InitPHP::error_page("connecting datebase(linux) filed.");
				return 0;
			}
		}
		return 1;
	}
	// insert a record and return the id
       public function insertcomment($filename, $lineno, $lineid, $author, $comment, $object="", $parentid=0, $gift=0, $replyto="")
       {
		if( !$this->my_datebase)
		{
			return 0;
		}
		$data = array('filename'=>$filename, 'lineno'=>$lineno, 'lineid'=>$lineid, 'object'=>$object, 'parentid'=>$parentid, 'replyto'=>$replyto, 'author'=>$author, 'comments'=>$comment);
		try{
			return $this->dao->db->insert($data, 'kernel318');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
       }
	public function get_comments_by_filename($filename)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql('SELECT * from kernel318 where filename="'.$filename.'"');

	
	}
	public function del_by_id($id)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->delete_by_field(array("id"=>$id), "comments");
	}
	public function get_comments_by_author($author)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		return $this->dao->db->get_all_sql('SELECT * from kernel318 where author="'.$author.'"');

	}
	public function update_comments_by_id($id, $comment)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$sql = sprintf('UPDATE kernel318 SET comments="%s" where id =%d', $comment, $id);
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	}
	public function give_gift($project, $commentid, $authorname, $file, $whogive)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$result = $this->dao->db->query("SELECT * from commentgift where whogive='${whogive}' and commentid=${commentid} and project='${project}'");
		if( $result && $result->num_rows != 0){
			return 0;
		}

		$data = array('project'=>$project, 'commentid'=>$commentid, 'authorname'=>$authorname, 'file'=>$file, 'whogive'=>$whogive);
		try{
			return $this->dao->db->insert($data, 'commentgift');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	
	public function get_gift_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		if( !in_array($field, $this->comment_gift_field))
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
		return $this->dao->db->delete_by_field(array("whofavor"=>$whofavor, "commentid"=>$commentid), "kernel318");

	}
	public function log_favor($favorwho, $whofavor, $project, $file, $commentid)
	{
		if(!$this->my_datebase)
		{
			return 0;
		}
		$result = $this->dao->db->query("SELECT * from commentfavor where whofavor='${whofavor}' and commentid=${commentid} and project='${project}'");
		if( $result && $result->num_rows != 0){
			return 0;
		}

		$data = array('favorwho'=>$favorwho, 'whofavor'=>$whofavor, 'project'=>$project, 'file'=>$file, 'commentid'=>$commentid);
		try{
			return $this->dao->db->insert($data, 'commentfavor');
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_favor_by_field($field, $val)
	{
		if( !$this->my_datebase)
		{
			return 0;
		}
		if( !in_array($field, $this->comment_favor_field))
		{
			return 0;
		}
		return $this->dao->db->get_all_sql("SELECT * from commentfavor where ${field}='${val}'");

	}

}

?>
