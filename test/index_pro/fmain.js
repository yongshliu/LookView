 angular.module( 'ProMain', [ 'ngMaterial' ] )
			.controller("YourController", function YourController($scope){
			$scope.count = 1;
			$scope.raise = function(){
			    $scope.count++;
			}
			} )
	.controller('AppCtl', ['$scope', '$mdSidenav', '$http', '$location', function($scope, $mdSidenav, $http, $location) {
		$http.defaults.headers.post['Content-type']='application/x-www-form-urlencoded;charset=utf-8';
		$scope.currentSideItem = 0;
		$scope.menu=[
			{ name:"项目", link:"pmain.html",img:"", defitem:"prolist"},
			{ name:"模块", link:"mmain.html", img:"", defitem:"modlist"},
			{ name:"函数", link:"fmain.html", img:"", defitem:"funclist"}, 
			{ name:"全局变量", link:"gmain.html", img:"", defitem:"gvlist"},
			{ name:"结构体", link:"smain.html", img:"", defitem:"structlist"},
			{ name:"宏定义", link:"dmain.html", img:"", defitem:"maclist"},			

		];	
				
		$scope.onNav = function(index){
			//console.log(index);
			//window.location = $scope.menu[index].link;
			$scope.currentSideItem = index;
			$scope.currentNavItem = $scope.menu[index].defitem;
		}
		$scope.currentNavItem="prolist";
		var getProjectList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_project&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.projectlist = ret.ret;
					console.log($scope.projectlist);
				}
			}, function(err){
				console.log(err);
			});
		}
		makeJsonContent = function(listarray){
			var tfs = listarray;
			var num = 0;
			var data = "";
			for( var i in tfs ){
				if( tfs[i].val != "" ){
					if( num != 0 )
						data += ",";
					data += '"'+tfs[i].fields + '":"';
					data += tfs[i].val+'"';
					num++;
				}				
			}
			if( num == 0 )
				return 0;
			data = "{"+data+"}";
			return data;
		}
		makeUrl = function(listarray){			
			data = makeJsonContent(listarray);
			console.log(data);
			var req = { "method": "POST", "url":'/index.php?c=sym&a=additem&tbl=sym_ker_fun&num='+num};
			req.data = data;//eval(data);
			return req;
		}
		// projects
		$scope.projectname = "";
		$scope.projectprefix = "";
		$scope.projectlist = [];
		$scope.proreset = function(){
			console.log("reset form");
			$scope.projectname = "";
			$scope.projectprefix = "";
		}
		var getProjectList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_project&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.projectlist = ret.ret;
					console.log($scope.projectlist);
				}
			}, function(err){
				console.log(err);
			});
		}
		getProjectList();
		$scope.prosave = function(){
			console.log("name:"+$scope.projectname);
			console.log("pre:"+$scope.projectprefix);
			var addurl = '/index.php?c=sym&a=additem&tbl=sym_project&num=2&k0=pro_name&k1=pro_prefix&v0=';
				addurl += $scope.projectname + '&v1=' + $scope.projectprefix;
			console.log(addurl);
			$http({
				"method":"POST",
				"url":addurl,
				
			}).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					getProjectList();
					$scope.currentNavItem="prolist";
					$scope.proreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}
		// modules
		$scope.modsall = [];
		$scope.newmodule={
			"mod_name":{"tip":"模块名字", "val":"", "limit":30,"emp":0,"at":1},
			"mod_path":{"tip":"模块路径", "val":"", "limit":256,"emp":0,"at":1},
			"mod_des":{"tip":"模块描述", "val":"", "limit":1024,"emp":1,"at":1},			
			"mod_version":{"tip":"软件版本", "val":"", "limit":32,"emp":1,"at":1},
			"mod_def_dep":{"tip":"模块的宏定义开关", "val":"", "limit":128,"emp":1,"at":1},
			"pro_id":{"tip":"所属项目", "val":"", "limit":32,"emp":1,"at":0},
			"mod_father":{"tip":"所属模块", "val":"", "limit":32,"emp":1,"at":0},
		};
		refreshModList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_ker_module&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_module", ret.ret);
					$scope.modsall = ret.ret;
					console.log($scope.modsall);
				}
			}, function(err){
				console.log(err);
			});
		}
		refreshModList();
		$scope.modreset = function(){
			console.log("reset form");
			for(mod in $scope.newmodule)
				mod.val = "";
		}		
		$scope.modsave = function(){			
			var req = { "method": "POST"};
			var data = makeRowInfoCompound($scope.newmodule);
			tbl_escape_obj("sym_ker_module", data);
			req.data = JSON.stringify(data);
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_module&num='+req.data.length;
			console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					refreshModList();
					$scope.currentNavItem="modlist";
					$scope.modreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}
		// functions
		
		$scope.funcsall = [];
		refreshFuncList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_ker_fun&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_fun", ret.ret);
					$scope.funcsall = ret.ret;
					console.log($scope.funcsall);
				}
			}, function(err){
				console.log(err);
			});
		}
		refreshFuncList();
		ftblfields = ["fun_name", "fun_protype", "fun_des", "fun_algorithm", "fun_father", "fun_para_num",
				"fun_ret", "fun_path", "fun_module", "fun_def_dep", "fun_mach", "fun_version"];
		$scope.newfunc = {
			"fun_name":{"tip":"函数名字", "val":"", "limit":30, "emp":0, "at":1},
			"fun_protype":{"tip":"函数原型", "val":"", "limit":256, "emp":0, "at":1},
			"fun_path":{"tip":"函数定义路径", "val":"", "limit":256, "emp":0, "at":1},
			"fun_des":{"tip":"函数描述", "val":"", "limit":1034, "emp":1, "at":1},
			"fun_ret":{"tip":"函数返回", "val":"", "limit":128, "emp":1, "at":1},
			"fun_para_num":{"tip":"函数参数数量", "val":"", "limit":32,"emp":1, "at":1},
			"fun_algorithm":{"tip":"函数主要算法", "val":"", "limit":1024,"emp":1, "at":1},				
			"mod_id":{"tip":"函数所属模块", "val":"", "limit":32, "emp":1, "at":0},
			"pro_id":{"tip":"函数所属", "val":"", "limit":32, "emp":1, "at":0},
			"def_dep_id":{"tip":"函数的宏定义开关", "val":"", "limit":32,"emp":1, "at":0},
			"fun_mach":{"tip":"函数的所属cpu类型", "val":"", "limit":32,"emp":1, "at":1},
			"fun_version":{"tip":"软件版本", "val":"", "limit":32, "emp":1, "at":1},
			"father_id":{"tip":"father node", "val":"", "limit":32, "emp":1, "at":0},
			"api":{"tip":"api函数", "val":"", "limit":1, "emp":1, "at":0},
			
		};
		/*$scope.onFunc = function(id){
			window.location = "fpage.html?id="+id;
		}*/
		$scope.funcreset = function(){
			console.log("reset form");
			for(fun in $scope.newfunc){				
				$scope.newfunc[fun].val = "";
			}
		}
		
		$scope.funcsave = function(){			
			var req = { "method": "POST"};	
			var data = makeRowInfoCompound($scope.newfunc);
			tbl_escape_obj("sym_ker_fun", data);
			req.data = JSON.stringify(data);		
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_fun&num='+req.data.length;
			console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					refreshFuncList();
					$scope.currentNavItem="funclist";
					$scope.funcreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}
		// global variable
		
		$scope.gvsall = [];
		refreshGvList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_ker_global_var&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_global_var", ret.ret);
					$scope.gvsall = ret.ret;
					console.log($scope.gvsall);
				}
			}, function(err){
				console.log(err);
			});
		}
		refreshGvList();
		
		$scope.newgv = [
			{"fields":"gv_name", "tip":"全局变量名字", "val":"", "limit":30},
			{"fields":"gv_protype", "tip":"全局变量原型", "val":"", "limit":32},
			{"fields":"gv_path", "tip":"全局变量定义路径", "val":"", "limit":26},
			{"fields":"gv_des", "tip":"全局变量描述", "val":"", "limit":1024},
			{"fields":"gv_type", "tip":"全局变量类型", "val":"", "limit":16},
			{"fields":"gv_module", "tip":"所属模块", "val":"", "limit":32},			
			{"fields":"gv_def_dep", "tip":"宏定义开关", "val":"", "limit":32},
			{"fields":"gv_mach", "tip":"所属cpu类型", "val":"", "limit":32},
			{"fields":"gv_version", "tip":"软件版本", "val":"", "limit":32},
			
		];
		$scope.gvreset = function(){
			console.log("reset form");
			for(i in $scope.newgv)
				$scope.newgv[i].val = "";
		}
		
		$scope.gvsave = function(){			
			var req = { "method": "POST"};
			var data = makeRowInfo($scope.newgv);
			tbl_escape_obj("sym_ker_global_var", data);
			req.data = JSON.stringify(data);	
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_global_var&num='+req.data.length;
			console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					refreshGvList();
					$scope.currentNavItem="gvlist";
					$scope.gvreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}

		// structure
		
		$scope.structsall = [];
		refreshStructList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_ker_structure&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_structure", ret.ret);
					$scope.structsall = ret.ret;					
				}
			}, function(err){
				console.log(err);
			});
		}
		refreshStructList();
		
		$scope.newstruct = [
			{"fields":"strct_name", "tip":"结构体名字", "val":"", "limit":30},
			{"fields":"strct_protype", "tip":"结构体原型", "val":"", "limit":32},
			{"fields":"strct_path", "tip":"结构体定义路径", "val":"", "limit":26},
			{"fields":"strct_des", "tip":"结构体描述", "val":"", "limit":1024},
			{"fields":"strct_module", "tip":"所属模块", "val":"", "limit":32},			
			{"fields":"strct_def_dep", "tip":"宏定义开关", "val":"", "limit":32},
			{"fields":"strct_mach", "tip":"所属cpu类型", "val":"", "limit":32},
			{"fields":"strct_version", "tip":"软件版本", "val":"", "limit":32},
			
		];
		$scope.streset = function(){
			console.log("reset form");
			for(i in $scope.newstruct)
				$scope.newstruct[i].val = "";
		}
		
		$scope.stsave = function(){			
			var req = { "method": "POST"};
			var data = makeRowInfo($scope.newstruct);
			tbl_escape_obj("sym_ker_structure", data);
			req.data = JSON.stringify(data);
			//req.data = makeJsonContent($scope.newstruct);
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_structure&num='+req.data.length;
			console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					refreshStructList();
					$scope.currentNavItem="structlist";
					$scope.gvreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}
		// macro define
		
		$scope.macsall = [];
		refreshMacList = function(){
			var url = '/index.php?c=sym&a=getall&tbl=sym_ker_macro&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_macro", ret.ret);
					$scope.macsall = ret.ret;
					console.log($scope.macsall);
				}
			}, function(err){
				console.log(err);
			});
		}
		refreshMacList();
		
		$scope.newmac = [
			{"fields":"macro_name", "tip":"结构体名字", "val":"", "limit":30},
			{"fields":"mac_protype", "tip":"结构体原型", "val":"", "limit":32},
			{"fields":"mac_path", "tip":"定义路径", "val":"", "limit":26},
			{"fields":"mac_des", "tip":"结构体描述", "val":"", "limit":1024},
			{"fields":"mac_module", "tip":"所属模块", "val":"", "limit":32},			
			{"fields":"mac_def_dep", "tip":"宏定义开关", "val":"", "limit":32},
			{"fields":"mac_mach", "tip":"所属cpu类型", "val":"", "limit":32},
			{"fields":"mac_version", "tip":"软件版本", "val":"", "limit":32},
			
		];
		$scope.macreset = function(){
			console.log("reset form");
			for(i in $scope.newmac)
				$scope.newmac[i].val = "";
		}
		
		$scope.macsave = function(){			
			var req = { "method": "POST"};
			var data = makeRowInfo($scope.newmac);
			tbl_escape_obj("sym_ker_macro", data);
			req.data = JSON.stringify(data);
			//req.data = makeJsonContent($scope.newmac);
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_macro&num='+req.data.length;
			console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					refreshMacList();
					$scope.currentNavItem="maclist";
					$scope.macreset();
				}
			}, function(err){
				console.log(err);
			});
		
		}
		
  		
	}]);
	

