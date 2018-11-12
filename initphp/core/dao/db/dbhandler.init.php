<?php
if (!defined('IS_INITPHP')) exit('Access Denied!');
/*********************************************************************************
 * InitPHP 3.8.2 国产PHP开发框�?  Dao-ddb 多库-主从-分表解决方案
 *-------------------------------------------------------------------------------
 * 版权所�? CopyRight By initphp.com
 * 您可以自由使用该源码，但是在使用过程中，请保留作者信息。尊重他人劳动成果就是尊重自�?
 *-------------------------------------------------------------------------------
 * $Author:zhuli
 * $Dtime:2013-5-29 
***********************************************************************************/
require_once("driver/dbbase.init.php");
class dbhandlerInit {  
	 
	protected static $dbArr = array(); // 存储 driver，db对象
	public $db = NULL; //DB引擎对象
	protected $driverArr = array(); 
	protected $dbModel = NULL; //DB配置模型，默认为default
	
	/**
	 * 数据库初始化，DB切换入口  
	 * 1. 可以在使用中通过$this->init_db('test')来切换数据库
	 * 2. 该函数是DB默认初始化入�?
	 * 3. 支持多数据库链接，主从，随机分布式数据库
	 * @param obj $db
	 */
	public function init_db($db = '') {
		$InitPHP_conf = InitPHP::getConfig(); 
		$this->dbModel = ($db == '') ? 'default' : $db;  //Db模型
		$driver  = $InitPHP_conf['db']['driver']; //Db引擎
		if (isset(self::$dbArr[$this->dbModel])) {
			return true;
		}
		if (!isset($InitPHP_conf['db'][$this->dbModel])) {
			InitPHP::initError('database confing model {'.$this->dbModel.'} is error!');
		}
		$db_type 	= $InitPHP_conf['db'][$this->dbModel]['db_type'];
		$config 	= $InitPHP_conf['db'][$this->dbModel];
		switch ($db_type) {
			case 1: //主从模型 
				$key = floor(mt_rand(1,(count($config) - 2)));
				self::$dbArr[$this->dbModel]['master']['link_id'] = $this->db_connect($config[0], $driver);
				self::$dbArr[$this->dbModel]['salver']['link_id'] = $this->db_connect($config[$key], $driver);
				break;
			
			case 2: //随机模型
				$key = floor(mt_rand(0,count($config) - 2));
				self::$dbArr[$this->dbModel]['link_id'] = $this->db_connect($config[$key], $driver);
				break;
				
			default: //默认单机模型
				self::$dbArr[$this->dbModel]['link_id'] = $this->db_connect($config[0], $driver);
				break;
		}
		return true;
	}
	
	/**
	 * 获取link_id 数据库链接资源符
	 * @param string $sql SQL语句进行分析
	 * @return object
	 */
	/**
	 * 获取link_id 数据库链接资源符
	 * @param string $sql SQL语句进行分析
	 * @return object
	 */
	protected function get_link_id($sql = "") {
		$InitPHP_conf = InitPHP::getConfig();
		$db_type = $InitPHP_conf['db'][$this->dbModel]['db_type'];
		//如果sql语句为空，则直接返回link_id
		if ($sql == "") {
			$this->db->link_id = self::$dbArr[$this->dbModel]['link_id'];
			return $this->db->link_id;
		}
		if (isset($InitPHP_conf['issqlcontrol']) && $InitPHP_conf['issqlcontrol'] == 1) {
			$InitPHP_conf['sqlcontrolarr'][] = $sql;
			InitPHP::setConfig('sqlcontrolarr', $InitPHP_conf['sqlcontrolarr']);	
		}
		if ($db_type == 1) { //主从 
			if ($this->is_insert($sql)) {
				$this->db->link_id = self::$dbArr[$this->dbModel]['master']['link_id'];
			} else {
				$this->db->link_id = self::$dbArr[$this->dbModel]['salver']['link_id'];
			}
		} else {
			$this->db->link_id = self::$dbArr[$this->dbModel]['link_id'];
		}
		return $this->db->link_id;
	}

	/**
	 * 每次query执行完毕后，都会将默认的link_id指向默认数据库链接地址
	 * @return object
	 */
	protected function set_default_link_id() {
		if (isset(self::$dbArr['default'])) {
			$this->dbModel = 'default';
			$this->db->link_id = self::$dbArr[$this->dbModel]['link_id'];
			return true;
		}
		return false;
	}
	
	/**
	 * DB链接器，主要用来链接数据�?
	 * 1. config 必要的参数：host、username、password�?
	 * database、charset、pconnect
	 * 2. dirver 默认如果是mysql?��接，可以不填写，如果填写了driver，则会使用不同的数据库类型，例如：mysqli
	 * 3. $this->db 是db类对象，单例
	 * @param array $config
	 * @return object
	 */
	private function db_connect($config, $driver) {
		$host      = $config['host'];
		$user      = $config['username'];
		$password  = $config['password'];
		$database  = $config['database'];
		$charset   = $config['charset'];
		$pconnect  = $config['pconnect'];
		$driver    = (!isset($driver)) ? 'mysql' : $driver;
		if ($this->db == NULL) {
			$this->db  = $this->get_db_driver($driver); //DB对象
		}
		return $this->db->connect($host, $user, $password, $database, $charset, $pconnect);
	}
	
	/**
	 * 获取数组引擎对象
	 * @param string $driver  暂时只支持mysql
	 * @return object
	 */
	private function get_db_driver($driver) {
		$file  = $driver . '.init.php';
		$class = $driver . 'Init'; 
		require(INITPHP_PATH . '/core/dao/db/driver/' . $file);
		return InitPHP::loadclass($class);
	}
		
	/**
	 * SQL分析�?
	 * @param  string $sql SQL语句
	 * @return bool
	 */
	private function is_insert($sql) {
		$sql = trim($sql);
		$sql_temp = strtoupper(substr($sql, 0, 6));
		if ($sql_temp == 'SELECT') return false;
		return true;
	}
	
	/**
	 * 按月分表-分库方法
	 * 1. 当数据表数据量过大的时候，可以根据按月分表的方法来进行分表
	 * 2. 按月分库会根据当前的时间来决定是几月份的数据
	 * 3. 按月分库$defaultId，可以自定义填入月份，例如：get_mon_table('test', 2),则返�?test_02
	 * Dao中使用方法：$this->dao->db->month_identify($tbl, $defaultId = '')
	 * @param string $tbl
	 * @param string $defaultId
	 */
	public function month_identify($tbl, $defaultId = '') {
		if (empty ( $defaultId )) {
			$mon = sprintf ( '%02d', date ( 'm', InitPHP::getTime() ));
			return $tbl . '_' . $mon;
		} else {
			return $tbl . '_' . sprintf ( '%02d', $defaultId );
		}
	}
	
	/**
	 * 根据数值来确�?�分�?分库方法
	 * 1. 可以自定义分�?分库的模板前缀$tbl变量
	 * 2. 可以自定义截取长�?
	 * 3. 一般可以根据用户UID来获取分表或者分�?
	 * Dao中使用方法：$this->dao->db->num_identify($num, $tbl, $default = 1)
	 * @param int $num     数�?
	 * @param string $tbl  模板前缀
	 * @param int $default 默认截取长度
	 */
	public function num_identify($num, $tbl, $default = 1) {
		$num = (string) $num;
		$len = strlen($num);
		if ($len >= $default)
			$str = substr($num, $len - $default, $default);
		else
			$str = str_pad($num, $default, '0', STR_PAD_LEFT); 
		return $tbl . '_' . $str;
	}
	
	/**
	 * 求余数的方式获取分表-分库方法
	 * 1. 求余方式余数比较少，适合小型的分表法
	 * 2. 可以自定义求余除�?
	 * Dao中使用方法：$this->dao->db->fmod_identify($num, $tbl, $default = 7)
	 * @param int $num
	 * @param string $tbl
	 * @param int $default
	 * @return 
	 */
	public function fmod_identify($num, $tbl, $default = 7) {
		return $tbl . '_' . fmod($num, $default);
	}
	
}
