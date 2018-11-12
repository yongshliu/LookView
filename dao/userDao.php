<?php
    class userDao extends Dao{
	private $my_datebase = NULL;
	private $my_mode;
	private $my_key;
	private $my_td;
	public function __construct(){
		parent::__construct();
		$this->my_mode = MCRYPT_MODE_CBC;
		$this->my_key = "123456EBC7890abcdefg";
		$this->my_td = MCRYPT_RIJNDAEL_256;
		$this->connectdatebase();
				
	}
	private function connectdatebase($action)
       {
		 $dbname = CUR_DBNAME;	
		if (empty($this->my_datebase))
		{
			$this->my_datebase = $this->init_db($dbname);
		
			if(empty($this->my_datebase))
			{
				InitPHP::error_page("connecting datebase(${dbname}) filed.");
				return 0;
			}
		}
		return 1;
	}
	private function encrypt_str($str, $iv){
		$session = hexFromBin(mcrypt_encrypt($this->my_td, $this->my_key, $str, $this->my_mode, $iv));

	}
	public function make_email_validation_info($email){
		if( !$this->my_datebase){
			return 0;
		}
		$userinfo = $this->dao->db->get_all_sql("SELECT * from user where emailaddr='${email}'");
		if( !$userinfo ){
			return 0;
		}
		$random = rand();
		
		$ret = sprintf("%d#%s#%s#%s#%s#%s", $userinfo[0]["id"], $userinfo[0]["username"], $userinfo[0]["emailaddr"], $userinfo[0]["timestamp"], time(), $random);
		$ret = hexFromBin(mcrypt_encrypt($this->my_td, $this->my_key, $ret, $this->my_mode, 0));
		return $ret;

	}

	public function verify_validation($encrypted){
		$data = trim(mcrypt_decrypt($this->my_td, $this->my_key, binFromHex($encrypted), $this->my_mode, 0));
		$userinfo = split("#", $data);
		// 0->id, 1->username, 2->emailaddr, 3-> timestamp, 4->time, 5->random
		if( !$this->my_datebase){
			return 0;
		}
		if( time() - $userinfo[4] >3600){ // one hour
			return 0;
		}
		$email = $userinfo[2];
		$result = $this->dao->db->get_all_sql("SELECT * from user where emailaddr='${email}'");
		if( !$result || $result[0]["username"] != $userinfo[1]){
			return 0;
		}
		return $userinfo;
	}
	public function pwd_reset($userinfo, $pwd){
		if( !$this->my_datebase){
			return 0;
		}
		if( time() - $userinfo[4] >7200){ // two hours
			return 0;
		}
		$sql = sprintf("UPDATE user SET password=\"${pwd}\" where id=${userinfo[0]} and emailaddr=\"${userinfo[2]}\"");
		return $this->dao->db->query($sql);
	}

       public function test(){
           return $this->dao->db->get_all('titles');
       }

	/* 
		the userid and username is regarding to the user datebase
		the $day is expiring time.
	*/
	public function createSession($userid, $username, $day){
		$ret = 0;
		if( !$this->my_datebase){
			return $ret;
		}
		$iv_size = mcrypt_get_iv_size($this->my_td, $this->my_mode);
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	        $time = time();// unit is 's'
		$expire = $time + $day*24*60*60;
		$random = rand();	
		$data = sprintf("%d:%s:%d:%d:%d%s", $userid, $username, $day, $time, $expire, $random);
		$session = hexFromBin(mcrypt_encrypt($this->my_td, $this->my_key, $data, $this->my_mode, iv));
		
		$dataInsert = array('userid'=>$userid, 'username'=>$username, 'expire'=>$expire, 'key'=>$this->my_key, 'iv'=>hexFromBin($iv), 'sessionid'=>$session);
		try{
			$this->dao->db->insert($dataInsert, 'session');
		}
               	catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}
		return $dataInsert;


	}
	/*
	*in the datebase, each username could have multiple regarding session
	*/
	public function getSessionByUser($username){
		$ret = 0;
		if( !$this->my_datebase){
			return $ret;
		}
		return $this->dao->db->get_all_sql("SELECT * from session where username='${username}'");
	}
	/*
	* the datebase would save the only one instance regarding to the seesionID 
	*/
	public function getSession($sessionID){
		$ret = 0;
		if( !$this->my_datebase){
			return $ret;
		}
		$result = $this->dao->db->query("SELECT * from session where sessionid='${sessionID}'");
		if( !$result ){
			$this->close();
			return $ret;
		}
		if( $result->num_rows == 0)
			return $ret;
		if( $row = $result->fetch_assoc() ){
			$ret = $row;
							
		} 
		return $ret;

	}
	// the info is a array
	public function infocheckok($info){
		if( !is_array($info) || empty($info) ){
			return 0;
		}
		if( !$this->my_datebase){
			return $ret;
		}
		//putLog("len =". count($info));
		foreach( $info as $k => $v){
			$result = $this->dao->db->query("SELECT * from user where ${k}='${v}'");
			if( $result ){
				if($result->num_rows > 0){
					return 0;
				}
			}
		}
		return 1;
	}
	public function checkpwdok($user, $pwd){
		$ret = 0;
		if( !$this->my_datebase){
			return $ret;
		}
		$result = $this->dao->db->query("SELECT * from user where username='${user}'");
		if( !$result ){
			return $ret;
		}
		if( $result->num_rows == 0)
			return $ret;
		if( $row = $result->fetch_assoc() ){
			if( $row['password'] == $pwd )
				$ret = $row;				
		} 
		$result->close();
		return $ret;
	
	}
	public function get_user_id($user){
		if( !$this->my_datebase ){
			return 0;
		}
		$sql = "select id from user where username='${user}'";
		$result = $this->dao->db->query($sql);
		if( $result->num_rows == 0 )
			return 0;
		$row = $result->fetch_assoc();
		return $row["id"];	
	}
	public function get_user_advance($userid){
		if( !$this->my_datebase ){
			return 0;
		}	
		try{
			$sql = "SELECT * from profile where profile.userid=${userid}";
			//putlog($sql);
			$result = $this->dao->db->query($sql);
			if( $result->num_rows == 0)
				return 0;
			if( $row = $result->fetch_assoc() ){
				return $row;
			}


		}
		catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_profiles($user){
		if( !$this->my_datebase ){
			return 0;
		}	
		try{
			$sql = "SELECT user.id, user.username, user.emailaddr, profile.city, profile.business, profile.male, profile.phoneno, profile.shortdes, profile.longdes FROM user, profile WHERE user.username='${user}' and profile.userid=user.id";
			//putlog($sql);
			$result = $this->dao->db->query($sql);
			if( $result->num_rows == 0)
				return 0;
			if( $row = $result->fetch_assoc()){
				return $row;
			}


		}
		catch(Exception $e){
			InitPHP::error_page("get_profiles exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_profile($user){
		if( !$this->my_datebase ){
			return 0;
		}	
		try{
			$result = $this->dao->db->query("SELECT username, emailaddr, timestamp from user where username='${user}'");
			if( $result->num_rows == 0)
				return 0;
			if( $row = $result->fetch_assoc() ){
				return $row;
			}


		}
		catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function get_all_field($fields, $cond, $table){
		if( !$this->my_datebase){
			return 0;
		}
		$fs = "";
		$i = 0;
		foreach($fields as $val){
			$fs .= ${val};
			if( ++$i != count($fields))
				$fs .=", ";
		}
		$where = $this->dao->db->build_where($cond);
		$sql = "SELECT ${fs} from ${table} ${where}";
		//putlog($sql);
		try{
			$result = $this->dao->db->query($sql);
			if( $result->num_rows == 0)
				return 0;
			while ($row = $this->dao->db->fetch_assoc($result)) {
				$temp[] = $row;
			}

			return $temp;
		}
                catch(Exception $e){
			InitPHP::error_page("getting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function new_item($data, $table){
		if( !$this->my_datebase){
			return 0;
		}
	
		try{
			$id = $this->dao->db->insert($data, $table);
			return $id;
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function update_table($data, $cond, $table){
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
		$condition = "";
		$i = 0;
		foreach($cond as $key=>$val){
			$condition .= "`".${key}."`='".${val}."'";
			if( ++$i != count($cond))
				$condition .=" and ";
		}
		$sql = sprintf("UPDATE ${table} SET ${update} where ${condition}");
		//putlog($sql);
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	
	}
	public function update_profile_by_fields($userid, $fields){
		if( !$this->my_datebase){
			return 0;
		}
		$update = "";
		$i = 0;
		foreach($fields as $key=>$val){
			$update .= "`". ${key}."`='".${val}."'";
			if( ++$i != count($fields))
				$update .=", ";
		}
		$sql = sprintf("UPDATE profile SET ${update} where userid=\"${userid}\"");
		// the author should be authenticated to invoid of missing operation to cause the data of other user to be updated
		return $this->dao->db->query($sql);

	}
	public function count_by_field($array, $table){
		if( !$this->my_datebase){
			return 0;
		}
		return $this->dao->db->get_count($table, $array);
		
	}
	
	public function register($username, $password, $email)
	{
		if( !$this->my_datebase){
			return 0;
		}
		$data = array('username'=>$username,  'password'=>$password, 'emailaddr'=>$email);
		try{
			$id = $this->dao->db->insert($data, 'user');
			if( $id ){
				$this->dao->db->insert(array('userid'=>$id), 'profile');
				return $id;
			}
		}
                catch(Exception $e){
			InitPHP::error_page("inserting exception:".$e->getMessage());
                        return 0;
		}

	}
	public function count_be_liked_flowchart($userid){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "select count(*) as count from executionheader, flowchartgift where executionheader.userid=${userid} and flowchartgift.flowchartid=executionheader.id";
		$result = $this->dao->db->query($sql);
		$count =  $result->fetch_assoc();
		return $count["count"];

	}
	public function count_be_favored_flowchart($userid){
		if( !$this->my_datebase){
			return 0;
		}
		$sql = "select count(*) as count from executionheader, flowchartfavor where executionheader.userid=${userid} and flowchartfavor.flowchartid=executionheader.id";
		//putlog($sql);
		$result = $this->dao->db->query($sql);
		$count =  $result->fetch_assoc();
		return $count["count"];
	
	}
}

?>
