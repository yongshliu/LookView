<?php
/*********************************************************************************
 * InitPHP 3.8.2 国产PHP开发框�?  框架入口文件 核心框架文件
 *-------------------------------------------------------------------------------
 * 版权所�? CopyRight By initphp.com
 * 您可以自由使用该源码，但是在使用过程中，请保留作者信息。尊重他人劳动成果就是尊重自�?
 *-------------------------------------------------------------------------------
 * Author:zhuli Dtime:2014-11-25
 ***********************************************************************************/
require_once('initphp.conf.php'); //导入框架配置�?
require_once('init/core.init.php'); //导入核心类文�?
require_once('init/exception.init.php'); //导入核心类文�?
require_once('init/interceptorInterface.init.php'); //导入拦截器接�?
require_once('init/err_def.php'); //导入拦截器接�?
define("ERROR", "ERROR");
define("WARN", "WARN");
define("DEBUG", "DEBUG");
define("INFO", "INFO");
class InitPHP extends coreInit {

	public static $time;

	/**
	 * debug模式打印所有PHP错误信息
	 */
	private static function isDebug() {
		$InitPHP_conf = InitPHP::getConfig();
		if (isset($InitPHP_conf['is_debug']) && $InitPHP_conf['is_debug'] == true && isset($InitPHP_conf['show_all_error']) && $InitPHP_conf['show_all_error'] == true) {
			error_reporting(E_ALL^E_NOTICE);
		}
	}

	/**
	 * 运行InitPHP开发框�?- 框架运行核心�?
	 * 1. 在index.php中实例化InitPHP启动�?InitPHP::init();
	 * 2. 初始化网站路由，运行框架
	 * 3. 全局使用方法：InitPHP::init(); 
	 * @return object
	 */
	public static function init() {
		self::isDebug();
		try {
			require(INITPHP_PATH . '/init/dispatcher.init.php');
			require(INITPHP_PATH . '/init/run.init.php');
			require(INITPHP_PATH . '/init/interceptor.init.php'); //拦截�?
			$dispacher = InitPHP::loadclass('dispatcherInit');
			$dispacher->dispatcher();
			$run = InitPHP::loadclass('runInit');
			$run->run();
		} catch (exceptionInit $e) {
			exceptionInit::errorTpl($e);
		} catch (Exception $e) {
			exceptionInit::errorTpl($e);
		}
	}

	/**
	 * 命令行模式运行php
	 * 1. 例如�?usr/lib/php /usr/local/web/www/index.php index test sq
	 * 2. index 控制器名�?test Action名称 sql controller/文件夹下的文件名�?
	 * 3. 全局使用方法：InitPHP::cli_init(); 
	 * @return object
	 */
	public static function cli_init($argv) {
		self::isDebug();
		try {
			$InitPHP_conf = InitPHP::getConfig();
			$argv[1] = ($argv[1] == '') ? '' : trim($argv[1]) . $InitPHP_conf['controller']['controller_postfix'];
			$argv[2] = ($argv[2] == '') ? '' : trim($argv[2]) . $InitPHP_conf['controller']['action_postfix'];
			$argv[3] = ($argv[3] == '') ? '' : trim($argv[3]);
			InitPHP::getController($argv[1], $argv[2], $params = array(), $argv[3]);
		} catch (exceptionInit $e) {
			exceptionInit::cliErrorTpl($e);
		} catch (Exception $e) {
			exceptionInit::cliErrorTpl($e);
		}
	}

	/**
	 * 启动RPC服务
	 * 1. 最好只支持内网服务器之间的服务调用
	 * 2. 开启RPC调用后，不同的程序可以直接调用Service的方法�?
	 * 3. 返回code=405  ：调用失败，调用失败原因和调用的方式有关�?
	 * 4. 返回code=200 : 调用成功，返回业务结�?
	 * 5. 返回code=500 : 业务层面抛出异常
	 *
	 */
	public static function rpc_init() {
		self::isDebug();
		$ret = array();
		$params = json_decode(urldecode($_POST['params']), true);
		if (!is_array($params) || !$params['class'] || !$params['method']) {
			return InitPHP::rpc_ret(405, "params is error");
		}
		$class = $params['class']; //类名�?
		$method = $params['method']; //方法名称
		$path = $params['path']; //方法名称
		$args = $params['args'];  //参数数组
		//判断是否允许访问
		$InitPHP_conf = InitPHP::getConfig();
		$fullClass = ($path != "") ? rtrim($path, '/') . '/' . $class : $class;
		if (!isset($InitPHP_conf['provider']['allow']) || !in_array($fullClass, $InitPHP_conf['provider']['allow'])) {
			return InitPHP::rpc_ret(405, "This class is not allow to access");
		}
		//判断IP地址
		$ipLib = InitPHP::getLibrarys("ip");
		$ip = $ipLib->get_ip();
		$isAllowIp = true;
		if (isset($InitPHP_conf['provider']['allow_ip']) && is_array($InitPHP_conf['provider']['allow_ip'])) {
			$isAllowIp = false;
			foreach ($InitPHP_conf['provider']['allow_ip'] as $v) {
				if ($ip == $v) {
					$isAllowIp = true;
					break;
				} else {
					//IP段匹�?
					if ($ipLib->ip_in_range($ip, $v) == true) {
						$isAllowIp = true;
						break;
					}
				}
			}
		}
		if ($isAllowIp == false) {
			return InitPHP::rpc_ret(405, "This ip address is not allow to access");
		}
		//判断类是否存�?
		$obj = InitPHP::getService($class, $path);
		if (!$obj) {
			return InitPHP::rpc_ret(405, "can not find this class");
		}
		//调用方法
		$InitPHP_conf = InitPHP::getConfig();
		$classFullName = $class . $InitPHP_conf['service']['service_postfix'];
		if (!method_exists($obj, $method)) {
			return InitPHP::rpc_ret(405, "can not find this method");
		}
		$method = new ReflectionMethod($classFullName, $method);
		if (!$method || !$method->isPublic()) {
			return InitPHP::rpc_ret(405, "can not find this method");
		}
		try {
			if ($args == "" || !is_array($args)) {
				$result = $method->invoke($obj);
			} else {
				$result = $method->invokeArgs($obj, $args); //有参数的调用方式
			}
			return InitPHP::rpc_ret(200, "SUCCESS", $result);
		} catch (Exception  $e) {
			return InitPHP::rpc_ret(500, "Exception", $e->getMessage());
		}
	}

	/**
	 * RPC 返回结果
	 * @param $code 错误�?
	 * @param $msg	错误信息
	 * @param $data 错误内容
	 */
	public static function rpc_ret($code, $msg, $data = null) {
		$ret = array();
		$ret['code'] = $code;
		$ret['msg'] = $msg;
		$ret['data'] = $data;
		exit(json_encode($ret));
	}

	/**
	 * 框架加载文件函数 - ?��心加载�?
	 * 1. 自定义文件路径，加载文件
	 * 2. 自定义文件路径数组，自动查询，找到文件返回TRUE，找不到返回false
	 * 3. 只需要文件名，import会自动加上APP_PATH
	 * 全局使用方法：InitPHP::import($filename, $pathArr);
	 * @param $filename 文件名称
	 * @param $pathArr  文件路径
	 * @return file
	 */
	public static function import($filename_old, array $pathArr = array()) {
		$filename = InitPHP::getAppPath($filename_old);
                //echo $filename.'<br>';
		$temp_name = md5($filename);
		if (isset(parent::$instance['importfile'][$temp_name])) return true; //已经加载该文件，则不重复加载
		if (@is_readable($filename) == true && empty($pathArr)) {
			require($filename);
			parent::$instance['importfile'][$temp_name] = true; //设置已加�?
			return true;
		} else {
			/* 自动搜索文件�?*/
			foreach ($pathArr as $val) {
				$new_filename = rtrim($val, '/') . '/' . $filename_old;
				$new_filename = InitPHP::getAppPath($new_filename);
				if (isset(parent::$instance['importfile'][$temp_name])) return true;
				if (@is_readable($new_filename)) {
					require($new_filename);// 载入文件
					parent::$instance['importfile'][$temp_name] = true;
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 框架实例化php类函数，单例模式
	 * 1. 单例模式-单例 实例化一�?
	 * 2. 可强制重新实例化
	 * 全局使用方法：InitPHP::loadclass($classname, $force = false)
	 * @param string $classname
	 * @return object
	 */
	public static function loadclass($classname, $force = false) {
                //echo $classname."<br>";
		if (preg_match('/[^a-z0-9\-_.]/i', $classname)) InitPHP::initError('invalid classname');
		if ($force == true) unset(parent::$instance['loadclass'][$classname]);
		if (!isset(parent::$instance['loadclass'][$classname])) {
			if (!class_exists($classname)) InitPHP::initError($classname . ' is not exist!');
			$Init_class = new $classname;
			parent::$instance['loadclass'][$classname] = $Init_class;
		}
		return parent::$instance['loadclass'][$classname];
	}

	/**
	 * 框架hook插件机制
	 * 1. 采用钩子挂载机制，一个钩子上可以挂载多个执行
	 * 2. hook机制需要配置框架配置文件运�?
	 * 全局使用方法：InitPHP::hook($hookname, $data = '');
	 * @param string $hookname 挂钩名称
	 * @param string $data   传递的参数
	 * @return
	 */
	public static function hook($hookname, $data = '') {
		$InitPHP_conf = InitPHP::getConfig();
		$hookconfig = $InitPHP_conf['hook']['path'] . '/' . $InitPHP_conf['hook']['config']; //配置文件
		$hookconfig = InitPHP::getAppPath($hookconfig);
		if (!isset(parent::$instance['inithookconfig']) && file_exists($hookconfig)) {
			parent::$instance['inithookconfig'] = require_once($hookconfig);
		}
		if (!isset(parent::$instance['inithookconfig'][$hookname])) return false;
		if (!is_array(parent::$instance['inithookconfig'][$hookname])) {
			self::_hook(parent::$instance['inithookconfig'][$hookname][0], parent::$instance['inithookconfig'][$hookname][1], $data);
		} else {
			foreach (parent::$instance['inithookconfig'][$hookname] as $v) {
				self::_hook($v[0], $v[1], $data);
			}
		}
	}

	/**
	 *	框架hook插件机制-私有
	 *  @param  string $class  钩子的类�?
	 *  @param  array  $function  钩子方法名称
	 *  @param  string $data 传递的参数
	 *  @return object
	 */
	private static function _hook($class, $function, $data = '') {
		$InitPHP_conf = InitPHP::getConfig();
		if (preg_match('/[^a-z0-9\-_.]/i', $class)) return false;
		$file_name  = $InitPHP_conf['hook']['path'] . '/' . $class . $InitPHP_conf['hook']['file_postfix'];
		$file_name  = InitPHP::getAppPath($file_name);
		$class_name = $class . $InitPHP_conf['hook']['class_postfix']; //类名
		if (!file_exists($file_name)) return false;
		if (!isset(parent::$instance['inithook'][$class_name])) {
			require_once($file_name);
			if (!class_exists($class_name)) return false;
			$init_class = new $class_name;
			parent::$instance['inithook'][$class_name] = $init_class;
		}
		if (!method_exists($class_name, $function)) return false;
		return parent::$instance['inithook'][$class_name]->$function($data);
	}

	/**
	 * XSS过滤，输出内容过�?
	 * 1. 框架支持全局XSS过滤机制-全局开启将消耗PHP运行
	 * 2. 手动添加XSS过滤函数，在模板页面中直接调�?
	 * 全局使用方法：InitPHP::output($string, $type = 'encode');
	 * @param string $string  需要过滤的字符�?
	 * @param string $type    encode HTML处理 | decode 反处�?
	 * @return string
	 */
	public static function output($string, $type = 'encode') {
		$html = array("&", '"', "'", "<", ">", "%3C", "%3E");
		$html_code = array("&amp;", "&quot;", "&#039;", "&lt;", "&gt;", "&lt;", "&gt;");
		if ($type == 'encode') {
			if (function_exists('htmlspecialchars')) return htmlspecialchars($string);
			$str = str_replace($html, $html_code, $string);
		} else {
			if (function_exists('htmlspecialchars_decode')) return htmlspecialchars_decode($string);
			$str = str_replace($html_code, $html, $string);
		}
		return $str;
	}

	/**
	 * 获取Service-实例并且单例模式获取Service
	 * 1.单例模式获取
	 * 2.可以选定对应Service路径path
	 * 3. service需要在配置文件中配置参数，$path对应service目录中的子目�?
	 * 全局使用方法：InitPHP::getService($servicename, $path = '')
	 * @param string $servicename 服务名称
	 * @param string $path 模块名称
	 * @return object
	 */
	public static function getService($servicename, $path = '') {
		$InitPHP_conf = InitPHP::getConfig();
		$path  = ($path == '') ? '' : $path . '/';
		$class = $servicename . $InitPHP_conf['service']['service_postfix'];
		$file  = rtrim($InitPHP_conf['service']['path'], '/') . '/' . $path . $class . '.php';
		if (!InitPHP::import($file)) return false;
		return InitPHP::loadclass($class);
	}

	/**
	 * 静�?方式�?用扩展库中的�?
	 * 单例模式，和$this->getLibrary方法是一样的
	 * 全局使用方法：InitPHP::getLibrarys("curl")
	 * @param $className 例如调用curlInit类，�?className = curl，不需要后缀 Init
	 * @return object
	 */
	public static function getLibrarys($className) {
		$classPath = INITPHP_PATH . "/library/" . $className . '.init.php';
		$classFullName = $className . "Init";
		if (!file_exists($classPath)) InitPHP::initError('file '. $className . '.php is not exist!');
		if (!isset(parent::$instance['initphp']['l'][$classFullName])) {
			require_once($classPath);
			if (!class_exists($classFullName)) InitPHP::initError('class' . $classFullName . ' is not exist!');
			$initClass = new $classFullName;
			parent::$instance['initphp']['l'][$classFullName] = $initClass;
		}
		return parent::$instance['initphp']['l'][$classFullName];
	}

	/**
	 * 静态方式调用工具库中的�?
	 * 单例模式，和$this->getUtil方法是一样的
	 * 全局使用方法：InitPHP::getUtils("queue")
	 * @param $className 例如调用queueInit类，�?className = queue，不需要后缀 Init
	 * @return object
	 */
	public static function getUtils($className) {
		$classPath = INITPHP_PATH . "/core/util/" . $className . '.init.php';
		$classFullName = $className . "Init";
		if (!file_exists($classPath)) InitPHP::initError('file '. $className . '.php is not exist!');
		if (!isset(parent::$instance['initphp']['u'][$classFullName])) {
			require_once($classPath);
			if (!class_exists($classFullName)) InitPHP::initError('class' . $classFullName . ' is not exist!');
			$initClass = new $classFullName;
			parent::$instance['initphp']['u'][$classFullName] = $initClass;
		}
		return parent::$instance['initphp']['u'][$classFullName];
	}

	/**
	 * 通过工具库中的日志类来记录日�?
	 * 全局使用方法：InitPHP::log("queue")
	 * @param  string  $message  日志信息
	 * @param  string  $log_type 日志类型   ERROR  WARN  DEBUG  IN
	 */
	public static function log($message, $log_type = 'DEBUG') {
		$log = InitPHP::getUtils("log"); //获取logInit对象实例
		$log->write($message, $log_type);
	}

	/**
	 * 调用远程内网Service服务
	 * 1. 如果调用成功，则返回结果
	 * 2. 如果业务层异常，则抛�?Exception 异常信息，需要外部捕获处�?
	 * 3. 调用服务异常，则抛出 exceptionInit 异常信息，需要外部捕获处�?
	 * @param $class 类名称，例如userService，则user
	 * @param $method 方法名称，例�?getUse
	 * @param $args 参数，按照参数排�?
	 * @param $group 参数，分组参�?
	 * @param $path Service的模块名�?
	 * @param $timeout 最长请求时�?
	 */
	public static function getRemoteService($class, $method, $args = array(), $group = "default",  $path = "", $timeout = 5) {
		$InitPHP_conf = InitPHP::getConfig();
		if (!isset($InitPHP_conf['customer']) || !isset($InitPHP_conf['customer'][$group])) {
			throw new exceptionInit("Please check your config:InitPHP_conf['customer']!", 405);
		}
		$i = rand(0,(count($InitPHP_conf['customer'][$group]['host']) - 1));
		$host = $InitPHP_conf['customer'][$group]['host'][$i];
		$file = $InitPHP_conf['customer'][$group]['file'];
		$url = "http://" . $host ."/" . ltrim($file, "/");
		$classPath = INITPHP_PATH . "/library/curl.init.php";
		require_once($classPath);
		$curl = new curlInit();
		$temp = array(
			"class" => $class,
			"method" => $method,
			"args" => $args,
			"path" => $path
		);
		$params = urlencode(json_encode($temp));
		try {
			$json = $curl->post($url, array("params" => $params), null, $timeout);
		} catch (Exception $e) {
			throw new exceptionInit("Curl call fail!", 405);
		}
		$ret = json_decode($json, true);
		//服务层调用失败，抛出exceptionInit异常
		if (!ret) {
			throw new exceptionInit("Rpc call fail!", 405);
		}
		if ($ret["code"] == 405) {
			throw new exceptionInit($ret['msg'], 405);
		}
		//业务层抛出异�?
		if ($ret['code'] == 500) {
			throw new Exception($ret['data'], 500);
		}
		return $ret['data'];
	}

	/**
	 * 获取Dao-实例并且单例模式获取Dao
	 * 1.单例模式获取
	 * 2.可以选定Dao路径path
	 * 3. dao需要在配置文件中配置参数，$path对应dao目录中的子目�?
	 * 全局使用方法：InitPHP::getDao($daoname, $path = '')
	 * @param string $daoname 服务名称
	 * @param string $path 模块名称
	 * @return object
	 */
	public static function getDao($daoname, $path = '') {
		$InitPHP_conf = InitPHP::getConfig();
		$path  = ($path == '') ? '' : $path . '/';
		$class = $daoname . $InitPHP_conf['dao']['dao_postfix'];
		$file  = rtrim($InitPHP_conf['dao']['path'], '/') . '/' . $path . $class . '.php';
                //echo 'dao name:'.$class.' path: '.$file.'<br>';
		if (!InitPHP::import($file)) return false;
                //echo 'load okay.<br>';
		$obj = InitPHP::loadclass($class);
		return $obj;
	}

	/**
	 * 组装URL
	 * default：index.php?m=user&c=index&a=run
	 * rewrite�?user/index/run/?id=100
	 * path: /user/index/run/id/100
	 * html: user-index-run.htm?uid=100
	 * 全局使用方法：InitPHP::url('user|delete', array('id' => 100))
	 * @param String $action  m,c,a参数，一般写�?cms|user|add 这样的m|c|a结构
	 * @param array  $params  URL中其它参�?
	 * @param String $baseUrl 是否有默认URL，如果有，则
	 */
	public static function url($action, $params = array(), $baseUrl = '') {
		$InitPHP_conf = InitPHP::getConfig();
		$action = explode("|", $action);
		$baseUrl = ($baseUrl == '') ? rtrim($InitPHP_conf['url'], "/") . "/" : $baseUrl;
		$ismodule = $InitPHP_conf['ismodule'];
		switch ($InitPHP_conf['isuri']) {

			case 'rewrite' :
				$actionStr = implode('/', $action);
				$paramsStr = '';
				if ($params) {
					$paramsStr = '?' . http_build_query($params);
				}
				return $baseUrl . $actionStr . $paramsStr;
				break;
					
			case 'path' :
				$actionStr = implode('/', $action);
				$paramsStr = '';
				if ($params) {
					foreach ($params as $k => $v) {
						$paramsStr .= $k . '/' . $v . '/';
					}
					$paramsStr = '/' . $paramsStr;
				}
				return $baseUrl . $actionStr . $paramsStr;
				break;

			case 'html' :
				$actionStr = implode('-', $action);
				$actionStr = $actionStr . '.htm';
				$paramsStr = '';
				if ($params) {
					$paramsStr = '?' . http_build_query($params);
				}
				return $baseUrl . $actionStr . $paramsStr;
				break;
					
			default:
				$actionStr = '';
				if ($ismodule === true) {
					$actionStr .= 'm=' . $action[0];
					$actionStr .= '&c=' . $action[1];
					$actionStr .= '&a=' . $action[2] . '&';
				} else {
					$actionStr .= 'c=' . $action[0];
					$actionStr .= '&a=' . $action[1] . '&';
				}
				$actionStr = '?' . $actionStr;
				$paramsStr = '';
				if ($params) {
					$paramsStr = http_build_query($params);
				}
				return $baseUrl . $actionStr . $paramsStr;
				break;
		}
	}

	/**
	 * 获取时间�?
	 * 1. 静态时间戳函数
	 * 全局使用方法：InitPHP::getTime();
	 * @param $msg
	 * @return html
	 */
	public static function getTime() {
		if (self::$time > 0) return self::$time;
		self::$time = time();
		return self::$time;
	}

	/**
	 * 框架控制访问器，主要用来控制是否有权限访问该模块
	 * 1. InitPHP 页面访问主要通过3个参数来实现，m=模型，c=控制器，a=Action。m模型需要在应用开启模型的情况下执�?
	 * 2. $config是用户具体业务逻辑中，包含的用户访问权限白名单，我们根据白名单列表去判断用户是否具备权�?
	 * 3. 具备访问权限，返回true，否则false
	 * 4. 返回false之后的具体业务逻辑需要用户自己做相应处理
	 * 5. 开�?InitPHP_conf['ismodule']配置结构
	 * array(
	 * 	'模型名称' => array(
	 *       '控制器名�? => array('run', 'test', 'Action名称')
	 * 	)
	 * )
	 * 6. 关闭$InitPHP_conf['ismodule']配置结构
	 * array(
	 *    '控制器名�? => array('run', 'Action名称')
	 * )
	 * 7. 默认为空，则全部有权�?
	 * @param array $config
	 */
	public static function acl($config = array()) {
		$InitPHP_conf = InitPHP::getConfig();
		if (!is_array($config) || empty($config)) return true;
		$c = ($_GET['c']) ? $_GET['c'] : $InitPHP_conf['controller']['default_controller'];
		$a = ($_GET['a']) ? $_GET['a'] : $InitPHP_conf['controller']['default_action'];
		if ($InitPHP_conf['ismodule']) {
			$m = $_GET['m'];
			if (isset($config[$m]) && isset($config[$m][$c]) && in_array($a, $config[$c])) {
				return true;
			}
			return false;
		} else {
			if (isset($config[$c]) && in_array($a, $config[$c]))
			return true;
			return false;
		}
	}

	/**
	 * 获取全局配置文件
	 * 全局使用方法：InitPHP::getConfig('controller.path')
	 * @param string $path 获取的配置路�?多级用点号分�?
	 * @return mixed
	 */
	public static function getConfig($path='') {
		global $InitPHP_conf;
		if (empty($path)) return $InitPHP_conf;
		$tmp = $InitPHP_conf;
		$paths = explode('.', $path);
		foreach ($paths as $item) {
			$tmp = $tmp[$item];
		}
		return $tmp;
	}

	/**
	 * 设置配置文件，框架意外慎用！
	 * @param $key
	 * @param $value
	 */
	public static function setConfig($key, $value) {
		global $InitPHP_conf;
		$InitPHP_conf[$key] = $value;
		return $InitPHP_conf;
	}

	/**
	 * 获取项目路径
	 * 全局使用方法：InitPHP::getAppPath('data/file.php')
	 * @param $path
	 * @return String
	 */
	public static function getAppPath($path = '') {
		$tag = "INITPHP_OUT_PATH:";
		$ret = strstr($path, $tag);
		if ($ret != false) {
			return ltrim($path, $tag);
		}
		if (!defined('APP_PATH')) return $path;
		return rtrim(APP_PATH, '/') . '/' . $path;
	}

	/**
	 * 框架错误机制
	 * 1. 框架的错误信息输出函数，尽量不要使用在项目中
	 * 全局使用方法：InitPHP::initError($msg)
	 * @param $msg
	 * @return html
	 */
	public static function initError($msg, $code = 10000) {
		throw new exceptionInit($msg, $code);
	}

	/**
	 * 调用其它Controller中的方法
	 * 1. 一般不建议采用Controller调用另外一个Controller中的方法
	 * 2. 该函数可以用于接口聚集，将各种接口聚集到一个接口中使用
	 * 全局使用方法：InitPHP::getController($controllerName, $functionName)
	 * @param $controllerName 控制器名�?
	 * @param $functionName   方法名称
	 * @param $params         方法参数
	 * @param $controllerPath 控制器文件夹名称,例如在控制器文件夹目录中，还有一层目录，user/则，该参数需要填�?
	 * @return
	 */
	public static function getController($controllerName, $functionName, $params = array(), $controllerPath = '') {
		$InitPHP_conf = InitPHP::getConfig();
		$controllerPath = ($controllerPath == '') ? '' : rtrim($controllerPath, '/') . '/';
		$path = rtrim($InitPHP_conf['controller']['path'], '/') . '/' . $controllerPath . $controllerName . '.php';
		if (!InitPHP::import($path)) {
			$controllerName = ucfirst($controllerName);
			$path = rtrim($InitPHP_conf['controller']['path'], '/') . '/' . $controllerPath . $controllerName . '.php';
			InitPHP::import($path);
		}
		$controller = InitPHP::loadclass($controllerName);
		if (!$controller)
		return InitPHP::initError('can not loadclass : ' . $controllerName);
		if (!method_exists($controller, $functionName))
		return InitPHP::initError('function is not exists : ' . $controllerName);
		if (!$params) {
			$controller->$functionName();
		} else {
			call_user_func_array(array($controller, $functionName), $params);
		}
	}

	/**
	 * 返回404错误页面
	 */
	public static function return404() {
		header('HTTP/1.1 404 Not Found');
		header("status: 404 Not Found");
		self::_error_page("404 Not Found");
		exit;
	}

	/**
	 * 返回405错误页面
	 */
	public static function return405() {
		header('HTTP/1.1 405 Method not allowed');
		header("status: 405 Method not allowed");
		self::_error_page("405 Method not allowed");
		exit;
	}

	/**
	 * 返回500错误页面
	 */
	public static function return500() {
		header('HTTP/1.1 500 Internal Server Error');
		header("status: 500 Internal Server Error");
		self::_error_page("500 Internal Server Error");
		exit;
	}
	
	
        public static function error_page($msg){
		self::_error_page($msg);
	}
	private static function _error_page($msg) {
		$html = "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">
		<html>
		<head><title>".$msg."</title></head>
		<body bgcolor=\"white\">
		<h1>".$msg."</h1>
		<p>The requested URL was ".$msg." on this server. Sorry for the inconvenience.<br/>
		Please report this message and include the following information to us.<br/>
		Thank you very much!</p>
		<table>
		<tr>
		<td>Date:</td>
		<td>".date("Y-m-d H:i:s")."</td>
		</tr>
		</table>
		<hr/>Powered by InitPHP/3.8</body>
		</html>";
		echo $html;
	}

}

/**
 * 控制器Controller基类
 * 1. 每个控制器都需要继承这个基�?
 * 2. 通过继承这个基类，就可以直接调用框架中的方法
 * 3. 控制器中可以直接调用$this->contorller �?$this->vie
 * @author zhuli
 */
class Controller extends coreInit {

	/**
	 * @var controllerInit
	 */
	protected $controller;

	/**
	 * @var viewInit
	 */
	protected $view;

	/**
	 * 初始�?
	 */
	public function __construct() {
		parent::__construct();
		$InitPHP_conf = InitPHP::getConfig();
		$this->controller = $this->load('controller', 'c'); //导入Controller
		$this->view       = $this->load('view', 'v'); //导入View
		$this->view->set_template_config($InitPHP_conf['template']); //设置模板
		$this->view->assign('init_token', $this->controller->get_token()); //全局输出init_token标记
		//注册全局变量，这样在Service和Dao中通过$this->common也能调用Controller中的�?
		$this->register_global('common', $this->controller);
		session_start();
	}
}

/**
 * 服务Service基类
 * 1. 每个Service都需要继承这个基�?
 * 2. 通过继承这个基类，就可以直接调用框架中的方法
 * 3. Service中可以直接调�?this->service
 * @author zhuli
 */
class Service extends coreInit {

	/**
	 * @var serviceInit
	 */
	protected $service;

	/**
	 * 初始�?
	 */
	public function __construct() {
		parent::__construct();
		$this->service = $this->load('service', 's'); //导入Service
	}
}

/**
 * 数据层Dao基类
 * 1. 每个Dao都需要继承这个基�?
 * 2. 通过继承这个基类，就可以直接调用框架中的方法
 * 3. Dao中可以直接调�?this->dao
 * 4. $this->dao->db DB方法�?
 * 5. $this->dao->cache Cache方法�?
 * @author zhuli
 */
class Dao extends coreInit {

	/**
	 * @var daoInit
	 */
	protected $dao;

	/**
	 * 初始�?
	 */
	public function __construct() {
		$this->dao = $this->load('dao', 'd'); //导入D
		$this->dao->run_db(); //初始化db
		$this->dao->run_cache(); //初始化cahce
	}
	public function __destruct(){
	//	$this->dao->db->close();
	}

	/**
	 * 分库初始化DB
	 * 如果有多数据库链接的情况下，会调用该函数来自动切换DB link
	 * @param string $db
	 * @return dbInit
	 */
	public function init_db($db = 'default') {
		$this->dao->db->init_db($db);
		return $this->dao->db;
	}
}
