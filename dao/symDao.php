<?php
    
    class symDao extends Dao{
       private $my_datebase = NULL;
	    
	
	public function __construct(){
		parent::__construct();		
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
	public function update($table, $data, $where){
		if( !$this->my_datebase){
			return 0;
		}
		//$update = "";
		//$i = 0;
		//foreach($data as $key=>$val){
		//	$update .= "`". ${key}."`='".${val}."'";
		//	if( ++$i != count($data))
		//		$update .=", ";
		//}
		return $this->dao->db->update_by_field($data, $where, $table);
		$whr = $dao->dao->db->build_where($where);
		$update = $dao->dao->db->build_update($data);
		$sql = "UPDATE ${table} ${update} ${whr}";
		
		//putlog($sql);
		return $this->dao->db->query($sql);		
	}
	public function delete($table, $fields){
		if( !$this->my_datebase){
			return 0;
		}		
		//svar_dump($fields);
		return $this->dao->db->delete_by_field($fields, $table);
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
	}	
	public function insert($table, $data){
		if( !$this->my_datebase){
			//puglog("inserrt");
			return 0;
		}
		try{
			return $this->dao->db->insert($data, $table);
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
	}
	public function getAll($table, $fields){
		if( !$this->my_datebase){
			return 0;
		}	
		$where ="";
		if( $fields )	
			$where = $this->dao->db->build_where($fields);
		$sql = sprintf("SELECT * FROM %s %s", $table, $where);
                //putlog($sql);
		$result = $this->dao->db->get_all_sql($sql);
		return $result;
	}
	public function getPage($table, $fields, $offset, $num){
		if( !$this->my_datebase){
			return 0;
		}
		return $this->dao->db->get_all($table, $num, $offset, $fields);
	}
}
?>
