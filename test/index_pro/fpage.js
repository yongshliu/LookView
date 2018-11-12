 angular.module( 'fpageMain', [ 'ngMaterial' ] )
			
	.controller('fpageCtl', ['$scope', '$mdSidenav', '$http', '$location', '$mdDialog', function($scope, $mdSidenav, $http, $location, $mdDialog) {
		 var reg = new RegExp(/(\?|&)id=([^&]*)(&|$)/);
     		var funcID = $location.absUrl().match(reg)[2];
		console.log(funcID);	
		// common define
		function getTableAll(tbl, func){
			var url = '/index.php?c=sym&a=getall&tbl='+tbl+'&num=0';
			$http({
				"method":"GET",
				"url":url,
			}).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape(tbl, ret.ret);
					if(func )func(ret.ret);
				}
			}, function(err){
				console.log(err);
			});
		}
		function getTableAll_key(tbl, key, val, func){
			var url = '/index.php?c=sym&a=getall&tbl='+tbl+'&num=0';
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getallwhere&tbl='+tbl+'&num=1&k0='+key+'&v0='+val};
			$http(req).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape(tbl, ret.ret);
					if(func )func(ret.ret);
				}
			}, function(err){
				console.log(err);
			});
		}	
		function getTableItem_id(tbl, id, func){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getitemid&tbl='+tbl+'&id='+id}
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape(tbl, ret.ret);
					func(ret.ret[0]);
				}
				}, function(err){
					console.log(err);
			});
		}
		function rmTableItem_id(tbl, id, func){
			var req = { "method": "POST"};			
			req.url = '/index.php?c=sym&a=delitemId&tbl='+tbl+'&id='+id;
			//console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					func(ret.ret);						
				}
			}, function(err){
				console.log(err);
			});
		}
		$scope.funcInfo = {
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
			
		};/*
		$scope.funcNoneDisplayInfo = [
			{"fields":"id", "tip":"id", "val":"", "limit":32},
			{"fields":"fun_snippet", "tip":"程序片段", "val":"", "limit":32},
			{"fields":"user_id", "tip":"user id", "val":"", "limit":32},
			{"fields":"fun_time", "tip":"", "val":"创建时间", "limit":32},			
			{"fields":"fun_last", "tip":"最后修改时间", "val":"", "limit":32},
			{"fields":"mod_id", "tip":"函数所属模块", "val":"", "limit":32},
			{"fields":"def_dep_id", "tip":"函数的宏定义开关", "val":"", "limit":32},
			{"fields":"father_id", "tip":"father node", "val":"", "limit":32},
		];*/
		$scope.editorEnable = true;
		var funcall;
		var funcKey = "";
		$scope.proName = "";
		$scope.modName = "";
		$scope.paraInfo = [];
		$scope.snippetInfo=[];	
		$scope.gvAll = [];
		$scope.projectList = [];
		$scope.modList = [];
		var gvLists = [];
		
		var fetchProName = function(id){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getitemid&tbl=sym_project&id='+id};
			$http(req).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.proName = ret.ret[0].pro_name;
				}
			}, function(err){
				console.log(err);
			});
		}
		var fetchModName = function(id){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getitemid&tbl=sym_ker_module&id='+id};
			$http(req).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.modName = ret.ret[0].mod_name;
				}
			}, function(err){
				console.log(err);
			});
		}
		var getModeList = function(){
			getTableAll("sym_ker_module", function(data){
				$scope.modList = data;
			});
		}
		
		var getProjectList = function(){
			getTableAll("sym_project", function(data){
				$scope.projectList = data;
			});			
		}
		var fetchParas = function(id){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getallwhere&tbl=sym_ker_func_para&num=1&k0=fp_id&v0='+id};
			console.log(req);
			$http(req).then(function(ok){
				console.log(ok);
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.paraInfo = ret.ret;
					tbl_unescape("sym_ker_func_para", $scope.paraInfo);
				}
			}, function(err){
				console.log(err);
			});
		}
		var fetchSnippet = function(id){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getallwhere&tbl=sym_ker_code_snippet&num=1&k0=key&v0='+id};
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					$scope.snippetInfo = ret.ret;
					tbl_unescape("sym_ker_code_snippet", $scope.snippetInfo);
				}
			}, function(err){
				console.log(err);
			});
		}
		
		var getFuncInfo = function(){
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getitemid&tbl=sym_ker_fun&id='+funcID};
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					tbl_unescape("sym_ker_fun", ret.ret);
					var info = funcall = ret.ret[0];
					angular.forEach($scope.funcInfo, function(val, key){
						if(info[key]){
							val.val = info[key];
						}
					});
					fetchParas(info["id"]);
					funcKey = "fun_"+info["id"];
					fetchSnippet(funcKey);
					getCallerList(funcID);
					getCalleeList(funcID);
					getGVList(funcKey);
					if( info["pro_id"] )fetchProName(info["pro_id"]);
					if( info["mod_id"] )fetchModName(info["mod_id"]);
					
				}
			}, function(err){
				console.log(err);
			});
		}
		var fetchGVs = function(list){
			for(var i in list){
				var req = { "method": "GET", "url":'/index.php?c=sym&a=getitemid&tbl=sym_ker_global_var&id='+list[i].gv_id}
				$http(req).then(function(ok){
					var ret = eval(ok.data);
					if( ret.err == 0 ){
						tbl_unescape("sym_ker_global_var", ret.ret);
						$scope.gvAll.push(ret.ret[0]);
					
					}
				}, function(err){
					console.log(err);
				});
			}
			
		}
		var getGVList = function(id){
			$scope.gvAll = [];
			gvLists = [];
			getTableAll_key("sym_ker_gv_map", "key", id, function(data){
				gvLists=data;
				fetchGVs(data);
			});
			/*
			var req = { "method": "GET", "url":'/index.php?c=sym&a=getallwhere&tbl=sym_ker_gv_map&num=1&k0=key&v0='+id};
			
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					gvLists = ret.ret;					
					fetchGVs(gvLists);					
				}
			}, function(err){
				console.log(err);
			});*/
		}
		$scope.allCaller = [];
		$scope.allCallee = [];
		function getCallerList(id){
			$scope.allCaller = [];
			funcMapCallers = [];
			getTableAll_key("sym_func_map", "calleeid", id, function(data){
				funcMapCallers = data;
				for(var i in data){
					getTableItem_id("sym_ker_fun", data[i].callerid, function(caller){
						$scope.allCaller.push(caller);
					});
				}
			});
			
		}
		function getCalleeList(id){
			$scope.allCallee = [];
			funcMapCallees = [];
			getTableAll_key("sym_func_map", "callerid", id, function(data){
				funcMapCallees = data;
				for(var i in data){
					getTableItem_id("sym_ker_fun", data[i].calleeid, function(callee){
						$scope.allCallee.push(callee);
					});
				}
			});
		}
		getFuncInfo();
		// chang func info
		$scope.funChang = 0;
		$scope.onChange = function(field){
			$scope.changeField = field; 
			if( field == "pro_id" )getProjectList();
			else if(field == "mod_id")getModeList();
			$mdDialog.show({
      				controller: DialogController,
      				templateUrl: 'funceditor.html',
      				parent: angular.element(document.body),
      				clickOutsideToClose:true,
      				fullscreen: true,
				scope:$scope,
				preserveScope:true
    			}).then(function() {
     				 
    			}, function() {
     			 	console.log("canceled");
    			});
			
		}
		
		function DialogController($scope, $mdDialog) {
    			$scope.hide = function() {
      				$mdDialog.hide();
    			};

    			$scope.cancel = function() {
      				$mdDialog.cancel();
    			};

   			 $scope.onSave = function(type) {
     				 $mdDialog.hide();
				console.log($scope.funcInfo[type]);
				var req = { "method": "POST"};		
				var data = makeRowInfoCompound($scope.funcInfo);
				tbl_escape_obj("sym_ker_fun",data);	
				req.data = JSON.stringify(data);
				req.url = '/index.php?c=sym&a=updateitem&tbl=sym_ker_fun&id='+funcID;
				console.log(req);
				$http(req).then(function(ok){
					var ret = eval(ok.data);
					if( ret.err == 0 ){						
					}
				}, function(err){
					console.log(err);
				});
    			}
 		 }
		
		// parameters dealing
		
	    function changPara(id){
		var req = { "method": "POST"};			
		//req.data = '{"name":"'+ $scope.paraName + '", "type":"' + $scope.paraType + '", "des":"'+$scope.paraDes+'", "fp_id":"'+$scope.funcNoneDisplayInfo[0].val+'"}';
		var paraNewLine = {"name":$scope.paraName, "type":$scope.paraType, "des":$scope.paraDes, "fp_id":funcID};
		tbl_escape_obj("sym_ker_func_para",paraNewLine);
		console.log(paraNewLine);
		req.data = JSON.stringify(paraNewLine);
		if( id != 0 ){
			req.url = '/index.php?c=sym&a=updateitem&tbl=sym_ker_func_para&id='+id;
		}
		else
			req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_func_para';
		//console.log(req);
		$http(req).then(function(ok){
			var ret = eval(ok.data);
			if( ret.err == 0 ){
				fetchParas(funcID);						
			}
		}, function(err){
			console.log(err);
		});
	    }
		$scope.paraType = "";
		$scope.paraName = "";
		$scope.paraDes = "";
		
		$scope.onUpdatepara = function(index){
			$scope.paraId = $scope.paraInfo[index].id;
			$scope.paraType = $scope.paraInfo[index].type;
			$scope.paraName = $scope.paraInfo[index].name;
			$scope.paraDes = $scope.paraInfo[index].des;
			showUpdateParaDialog();
		}
		$scope.onNewpara = function(){
			$scope.paraType = "";
			$scope.paraName = "";
			$scope.paraDes = "";
			$scope.paraId = 0;
			showUpdateParaDialog();
		}
		function showUpdateParaDialog(){			
			$mdDialog.show({
      				controller: paraNewController,
      				templateUrl: 'paraNew.html',
      				parent: angular.element(document.body),
      				clickOutsideToClose:true,
      				fullscreen: true,
				scope:$scope,
				preserveScope:true
    			}).then(function(answer) {
     				 console.log(answer);
    			}, function() {
     			 	console.log("canceled");
    			});
		}
		function paraNewController($scope, $mdDialog) {
    			$scope.hide = function() {
      				$mdDialog.hide();
    			};

    			$scope.cancel = function() {
      				$mdDialog.cancel();
    			};

   			 $scope.onNewParaSave = function(answer) {
     				 $mdDialog.hide();
				changPara($scope.paraId);
    			}
 		 }
		// snippet
		$scope.pieceTitle = "";
		$scope.pieceChart = "";
		$scope.pieceDes = "";
		var pieceID = 0;
		function changSnippet(id){
			var req = { "method": "POST"};		
			var newPicecOjb = {"title":$scope.pieceTitle, "chart":$scope.pieceChart, "des":$scope.pieceDes, "key":funcKey};	
			tbl_escape_obj("sym_ker_code_snippet", newPicecOjb);
			req.data = JSON.stringify(newPicecOjb);//'{"title":"'+ $scope.pieceTitle + '", "chart":"' + $scope.pieceChart + '", "des":"'+$scope.pieceDes+'", "key":"'+funcKey+'"}';
			if( id != 0 ){
				req.url = '/index.php?c=sym&a=updateitem&tbl=sym_ker_code_snippet&id='+id;
			}
			else
				req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_code_snippet';
			//console.log(req);
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					fetchSnippet(funcKey);						
				}
			}, function(err){
				console.log(err);
			});
	   	 }
		
		
		$scope.onUpdateCodePiece = function(index){
			pieceID = $scope.snippetInfo[index].id;
			$scope.pieceTitle = $scope.snippetInfo[index].title;
			$scope.pieceChart = $scope.snippetInfo[index].chart;
			$scope.pieceDes = $scope.snippetInfo[index].des;
			showPieceDialog();
		}
		$scope.onNewCodePiece = function(){
			pieceID = 0;
			$scope.pieceTitle = "";
			$scope.pieceChart = "";
			$scope.pieceDes = "";
			showPieceDialog();
		}
		function showPieceDialog(){			
			$mdDialog.show({
      				controller: pieceNewController,
      				templateUrl: 'pieceNew.html',
      				parent: angular.element(document.body),
      				clickOutsideToClose:true,
      				fullscreen: true,
				scope:$scope,
				preserveScope:true
    			}).then(function() {
     				 
    			}, function() {
     			 	
    			});
		}
		function pieceNewController($scope, $mdDialog) {
    			$scope.hide = function() {
      				$mdDialog.hide();
    			};

    			$scope.cancel = function() {
      				$mdDialog.cancel();
    			};

   			 $scope.onNewPieceSave = function(answer) {
     				 $mdDialog.hide();
				changSnippet(pieceID);
    			}
 		 }
	
	// Global Variable used
	$scope.newSelectPageTitle = "";
	$scope.gvSelected = 0;
	$scope.gvReadonly = 1;
	$scope.gvAllForSelect = [];
	$scope.selectType = "gv";
	function searchAllGv(){
		var req = { "method": "POST"};			
		req.url = '/index.php?c=sym&a=getall&tbl=sym_ker_global_var&num=0';
		//console.log(req);
		$http(req).then(function(ok){
			var ret = eval(ok.data);
			if( ret.err == 0 ){
				tbl_unescape("sym_ker_global_var", ret.ret);
				$scope.gvAllForSelect = ret.ret;						
			}
		}, function(err){
			console.log(err);
		});
	}
	$scope.onGvRemove = function(index){
		for(var i in gvLists ){
			if( gvLists[i].gv_id == $scope.gvAll[index].id ){
				rmTableItem_id("sym_ker_gv_map", gvLists[i].id, function(data){
					getGVList(funcKey);
				});
				/*var req = { "method": "POST"};			
				req.url = '/index.php?c=sym&a=delitemId&tbl=sym_ker_gv_map&id='+gvLists[i].id;
				//console.log(req);
				$http(req).then(function(ok){
					var ret = eval(ok.data);
					if( ret.err == 0 ){
						if( $scope.gvAll.length == 1 ){
							$scope.gvAll = [];
							gvLists = [];// this should be placed in getGVList
						}
						getGVList(funcKey);						
					}
				}, function(err){
					console.log(err);
				});*/
				return;
			}
		}
	}
	// functions for caller and callee
	$scope.funcAllForSelect = [];	
	funcMapCallers = [];
	funcMapCallees = [];
	$scope.funcSelected = 0;
	function searchAllFunc(){
		getTableAll("sym_ker_fun", function(data){
			$scope.funcAllForSelect = data;
		});
	}
	$scope.onCallerRm = function(index){
		var callerId = 0;
		console.log(index);
		console.log(funcMapCallers);
		console.log($scope.allCaller);
		for(var i in funcMapCallers){
			if($scope.allCaller[index].id == funcMapCallers[i].callerid ){
				callerId = funcMapCallers[i].id;
				break;
			}
		}
		if( callerId == 0) return;
		rmTableItem_id("sym_func_map", callerId, function(data){
			getCallerList(funcID);
		});
	}
	$scope.onCalleeRm = function(index){
		var calleeId = 0;
		for(var i in funcMapCallees){
			if($scope.allCallee[index].id == funcMapCallees[i].calleeid ){
				calleeId = funcMapCallees[i].id;
				break;
			}
		}
		if( calleeId == 0) return;
		rmTableItem_id("sym_func_map", calleeId, function(data){
			getCalleeList(funcID);
		});
	}
	$scope.onAddSelect = function(type){
		
		$scope.selectType = type;
		console.log(type);
		if( type == 'gv' ){
			$scope.gvSelected = 0;
			$scope.newSelectPageTitle = "添加全局变量";
			
			searchAllGv();
		}else if( type == 'caller' ){
			searchAllFunc();
			$scope.funcSelected = 0;
			$scope.newSelectPageTitle = "那个函数调用了此函数";
		}else if( type == 'callee' ){
			searchAllFunc();
			$scope.funcSelected = 0;
			$scope.newSelectPageTitle = "此函数调用了哪个函数";
		}
		$mdDialog.show({
      			controller: addSelectController,
      			templateUrl: 'addSelect.html',
      			parent: angular.element(document.body),
      			clickOutsideToClose:true,
      			fullscreen: true,
			scope:$scope,
			preserveScope:true
    		}).then(function() {
     				 
    		}, function() {
     			 	
    		});
	}
	function addSelectController($scope, $mdDialog) {
    		$scope.hide = function() {
      			$mdDialog.hide();
    		};
 		$scope.cancel = function() {
      			$mdDialog.cancel();
    		};
		$scope.onSelectedSave = function(type) {
			$mdDialog.hide();
			console.log(type);
			var req = { "method": "POST"};
			if( type == 'gv' ){
				console.log($scope.gvSelected);
				if( $scope.gvSelected == 0 )return;
				for(var i in gvLists){
					if( gvLists[i].gv_id == $scope.gvSelected )
						return; //already added
				}
				req.data = '{"key":"'+ funcKey + '", "gv_id":"' + $scope.gvSelected + '", "readonly":"'+$scope.gvReadonly+'"}';		
				req.url = '/index.php?c=sym&a=additem&tbl=sym_ker_gv_map';
			}else if( type == 'caller' ){
				if( $scope.funcSelected == 0 )return;
				for(var i in $scope.allCaller ){
					if( $scope.allCaller[i].callerid == $scope.funcSelected )
						return; // already existed.
				}
				req.data = '{"callerid":"'+ $scope.funcSelected + '", "calleeid":"' + funcID +'"}';		
				req.url = '/index.php?c=sym&a=additem&tbl=sym_func_map';
			}else if( type == 'callee' ){
				if( $scope.funcSelected == 0 )return;
				for(var i in $scope.allCallee ){
					if( $scope.allCallee[i].calleeid == $scope.funcSelected )
						return; // already existed.
				}
				req.data = '{"callerid":"'+ funcID + '", "calleeid":"' + $scope.funcSelected +'"}';		
				req.url = '/index.php?c=sym&a=additem&tbl=sym_func_map';
			}else {
				console.log("type don't support");
				return;
			}				
			
			
			$http(req).then(function(ok){
				var ret = eval(ok.data);
				if( ret.err == 0 ){
					if( type == 'gv' )getGVList(funcKey);	
					else if( type == 'caller' )getCallerList( funcID );
					else if (type == 'callee' ) getCalleeList( funcID );				
				}
			}, function(err){
				console.log(err);
			});
     		}
 	 }	
	
	}]); //controller end

	
