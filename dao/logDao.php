<?php
    class logDao extends Dao{
	var  $mydatebase = 0;
	public function __construct(){
		parent::__construct();		
	}
	private function connectdatebase($action)
       	{	
		$dbname = CUR_DBNAME;

		if (empty($this->mydatebase))
		{
			$this->mydatebase = $this->init_db($dbname);
		
			if(empty($this->mydatebase))
			{
				InitPHP::error_page("connecting datebase(${dbname}) failed.");
				return 0;
			}
		}
		return 1;
	}

	public function putLog($log)
	{
		if( !$this->connectdatebase()){
			return $ret;
		}
		$data = array('log'=>$log);
		try{
			return $this->dao->db->insert($data, 'log');
		}
                catch(Exception $e){
			InitPHP::error_page("log inserting exception:".$e->getMessage());
                        return 0;
		}

	}

}

?>
