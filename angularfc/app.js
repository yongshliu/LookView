
//
// Define the 'app' module.
//
var flowchart_obj = eval(flowchart_data);
if( flowchart_obj.fc.length > 5){
	flowchart_obj.fc = eval("("+util_unescape(flowchart_obj.fc)+")");
}
//console.log(JSON.stringify( flowchart_obj.fc, null, 1));

angular.module('app', ['flowChart', ])
//
// Simple service to create a prompt.
//
.factory('prompt', function () {

	/* Uncomment the following to test that the prompt service is working as expected.
	return function () {
		return "Test!";
	}
	*/

	// Return the browsers prompt function.
	return prompt;
})

//
// Application controller.
//
.controller('AppCtrl', ['$scope', 'prompt', function AppCtrl ($scope, prompt) {

	//
	// Code for the delete key.
	//
	var deleteKeyCode = 46;

	//
	// Code for control key.
	//
	var ctrlKeyCode = 17;

	//
	// Set to true when the ctrl key is down.
	//
	var ctrlDown = false;

	//
	// Code for A key.
	//
	var aKeyCode = 65;

	//
	// Code for esc key.
	//
	var escKeyCode = 27;

	//
	// Selects the next node id.
	//
	var nextNodeID = 10;
	
	//
	// Setup the data-model for the chart.
	//
	var chartDataModel = {

		nodes: [
			{
				name: "Example Node 1",
				id: 0,
				x: 0,
				y: 0,
				width: 350,
				inputConnectors: [
					{
						name: "input A",
					},
					
				],
				outputConnectors: [
					{
						name: "out A",
					},
					
				],
			},

			{
				name: "Example Node 2",
				id: 1,
				x: 400,
				y: 200,
				inputConnectors: [
					{
						name: "input A",
					},
					
				],
				outputConnectors: [
					{
						name: "output A",
					},
					
				],
			},

		],

		connections: [
			{
				name:'Connection 1',
				source: {
					nodeID: 0,
					connectorIndex: 0,
				},

				dest: {
					nodeID: 1,
					connectorIndex: 0,
				},
			},
			

		]
	};
	$scope.editable = false; 
	$scope.fc_name = util_unescape(flowchart_obj.name);
	//
	// Event handler for key-down on the flowchart.
	//
	$scope.keyDown = function (evt) {

		if (evt.keyCode === ctrlKeyCode) {

			ctrlDown = true;
			evt.stopPropagation();
			evt.preventDefault();
		}
	};

	//
	// Event handler for key-up on the flowchart.
	//
	$scope.keyUp = function (evt) {

		if (evt.keyCode === deleteKeyCode) {
			//
			// Delete key.
			//
			$scope.chartViewModel.deleteSelected();
		}

		if (evt.keyCode == aKeyCode && ctrlDown) {
			// 
			// Ctrl + A
			//
			$scope.chartViewModel.selectAll();
		}

		if (evt.keyCode == escKeyCode) {
			// Escape.
			$scope.chartViewModel.deselectAll();
		}

		if (evt.keyCode === ctrlKeyCode) {
			ctrlDown = false;

			evt.stopPropagation();
			evt.preventDefault();
		}
	};

	//
	// Add a new node to the chart.
	//
	$scope.addNewNode = function () {
		$("#sel-dialog").attr("data-info", 0);
		$("#sel-dialog").modal("show");
		return;

		var nodeName = prompt("Enter a node name:", " ");
		if (!nodeName) {
			return;
		}

		//
		// Template for a new node.
		//
		var newNodeDataModel = {
			name: nodeName,
			id: nextNodeID++,
			x: 0,
			y: 0,
			inputConnectors: [
				{
					name: "X"
				},
				
			],
			outputConnectors: [ 
				{
					name: "1"
				},
				
			],
		};

		$scope.chartViewModel.addNode(newNodeDataModel);
	};

	//
	// Add an input connector to selected nodes.
	//
	$scope.addNewInputConnector = function () {		
		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		var node = 0;
		if( selectedNodes && selectedNodes.length>0)
			node = selectedNodes[0];
		else
			return;
		if( node.getInputConnectorNum() > 2){ // now let's support one side connector
			alert("too many connectors")
			return;
		}
		var connectorName = prompt("Enter a connector name:", " ");
		if (!connectorName) {
			return;
		}
		node.addInputConnector({
				name: connectorName,
			});

	/*	for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			node.addInputConnector({
				name: connectorName,
			});
		}*/
		
		
	};

	//
	// Add an output connector to selected nodes.
	//
	$scope.addNewOutputConnector = function () {
		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		var node = 0;
		if( selectedNodes && selectedNodes.length>0)
			node = selectedNodes[0];
		else
			return;

		if( node.getOutputConnectorNum() > 2){ // now let's support one side connector
			alert("too many connectors")
			return;
		}

		var connectorName = prompt("Enter a connector name:", " ");
		if (!connectorName) {
			return;
		}
		node.addOutputConnector({
				name: connectorName,
			});
/*
		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			node.addOutputConnector({
				name: connectorName,
			});
		}
*/
	};

	//
	// Delete selected nodes and connections.
	//
	$scope.deleteSelected = function () {

		$scope.chartViewModel.deleteSelected();
	};
	$scope.saveSelected = function(){
		util_debug("saving data");
		if( $scope.chartViewModel){
			var nodes = $scope.chartViewModel.data.nodes;
			for( var i=0; i<nodes.length; i++){
				util_escape(nodes[i].name);
			}
			//$scope.chartViewModel.data.viewWidth = $(".draggable-container").width();
			//$scope.chartViewModel.data.viewHeight = $(".draggable-container").height();
			var json = JSON.stringify($scope.chartViewModel.data, null, 1);
			var jsones = util_escape(json);
			//console.debug(json);
			//console.debug(jsones);
			//console.debug(jsones.replace(/\r\n/g, " "));
			//console.debug(jsones.replace(/\n/g, " "));
			jsones = jsones.replace(/\r\n/g, " ");
			jsones = jsones.replace(/\n/g, " ");
			var url = '/index.php?c=user&a=updateflowcharts';
			url += "&id="+flowchart_obj.id;
			//url += "&fc="+jsones;
			$.post(url, {"fc":jsones}, 
				function(data){
					console.debug(data);	
				});

		}

		

	}

	//
	// Create the view-model for the chart and attach to the scope.
	//
	$scope.updateFcData = function(){
		if( $scope.chartViewModel){
			var json = JSON.stringify($scope.chartViewModel.data, null, 4);
			console.debug(json);
		}
		console.debug("inchanged");
	}
	//$scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
	var EmptyDM = {
		viewHeight:$(".draggable-container").innerHeight(),	
		viewWidth:$(".draggable-container").innerWidth(),
		nodes:[],
		connections:[],
	};
	if( flowchart_obj.fc != ""){
		//console.debug(flowchart_obj.fc);
		if( !flowchart_obj.fc["viewHeight"] ){
			flowchart_obj.fc["viewHeight"] = $(".draggable-container").innerHeight();
			flowchart_obj.fc["viewWidth"] = $(".draggable-container").innerWidth();
		}
		refreshNodeName(flowchart_obj.fc);
		//sleep(10000);
		console.debug("init chart view");	
		$scope.chartViewModel = new flowchart.ChartViewModel(flowchart_obj.fc);
	}
	else
		$scope.chartViewModel = new flowchart.ChartViewModel(EmptyDM);
	
	global_fc_scope = $scope;
	//console.log(page_user_id+","+flowchart_obj.userid);	
	if( page_user_id && page_user_id == flowchart_obj.userid)
		$scope.editable = true;
	//$scope.$watch("$scope.chartViewModel.data", $scope.updateFcData, true);
}])
;
function sleep(ms){
	var now = new Date();
	var exitTime = now.getTime() + ms;
	console.debug(now.getTime() + ", " + exitTime);
	while(true){
		now = new Date();
		if( now.getTime() > exitTime )
			return;
	}
}
///////////////// for the candidate of comments /////////////////
function refreshNodeName(dataModal){
	//	console.debug(dataModal);
	for(var i=0; i<dataModal.nodes.length; i++){
		var node = dataModal.nodes[i];
	 	var url = '/index.php?c=com&a=getcommentid';
		url += '&id='+node.id;
		$.get(url, function(data){
			//console.debug(data);
			//if( !is_json_str(data) ){
				var result = eval(data);
				if( result.code == 0 ){
					node.name = util_unescape(result.ret.comments);
					//console.debug(node.name);
					var dt = new Date(result.ret.datetime);
					var udt = new Date();
					if( result.ret.udatetime != "")
						udt = new Date(result.ret.udatetime);
					console.debug(udt.getTime() + "-"+dt.getTime()+"="+(udt.getTime()-dt.getTime()));
				}
			//}
		});
	
	}	
}
var page_my_favorates = 0;
var page_my_comments = 0;
var global_fc_scope = 0;
function g_user_status_change(state){
	console.log(page_user_id+","+flowchart_obj.userid);	
	if( state == "valid" && global_fc_scope ){
		if( page_user_id == flowchart_obj.userid )
			global_fc_scope.editable = true; 
	}
}
$(document).ready(function(){
	if( global_fc_scope ){
		var www = global_fc_scope.chartViewModel.data.viewWidth;
		var hhh = global_fc_scope.chartViewModel.data.viewHeight;
		//console.debug(www + "," + hhh);
		//console.debug($(".draggable-container").css("width"));
		if( www > $(".draggable-container").width())
			$(".draggable-container").css("width", www);
		if( hhh > $(".draggable-container").height())
			$(".draggable-container").css("height", hhh);
	
	}
});
$("body").on("click", ".insert-com", function(e){
	var cominfo = eval($(this).attr("data-info"));
	var preid = $("#sel-dialog").attr("data-info");
	//insert_new_flowchart(preid, cominfo);	
	$("#sel-dialog").modal("hide");
	var comment = 0;
	if( cominfo.type=="com"){
		comment = find_array_item(page_my_comments, "id", cominfo.comid);
		
	}else if(cominfo.type == "fav"){
		comment = find_array_item(page_my_favorates, "id", cominfo.comid);
		
	}
	if( !comment )
		return;
	//console.debug(global_fc_scope);
	if( global_fc_scope ){
		var newNodeDataModel = {
			name: comment.comments,
			topidr:comment.topdir,
			lineno:comment.lineno,
			filename:comment.filename,
			alink:"/page.php?page=/"+comment.topdir+"/"+comment.filename+"#line"+comment.lineno,
			id: comment.id,
			udatetime:comment.udatetime,
			x: 0,
			y: 0,
			inputConnectors: [
				{
					name: ""
				},
			],
			outputConnectors: [ 
				{
					name: ""
				},
			],
		};
		
		global_fc_scope.chartViewModel.addNode(newNodeDataModel);
		//console.debug(newNodeDataModel);
		//console.log($("<div>yes<p>hello</p></div>").text());
	}
});

fresh_mycomments(function(comments){
			init_sellection_dialog_data("com", comments);
		});
fresh_favors(function(comments){
			init_sellection_dialog_data("fav", comments);
		});

function init_sellection_dialog_data(type, my_coms){
	var html  = '<ul class="list-group">';
	if( my_coms.length == 0){
		html += '<li class="list-group-item">No record found</li>';
		html += '</ul>';
		if( type == "com"){
			$("#comments4sel").html(html);
		}else if(type == "fav"){
			$("#favorates4sel").html(html);
		}
		return;
	}
	for(i=0;i<my_coms.length;i++){
		html += '<li class="list-group-item" >';
		html += '<h4>'+util_unescape(my_coms[i].comments)+'</h4>';
		html += '<h6>'+my_coms[i].filename+'  '+my_coms[i].lineno + '<button type=button class="btn btn-primary insert-com" data-info=({comid:'+my_coms[i].id+',type:"'+type+'"})>Insert</button></h6>';
		if( type == "fav" ){
			html += '<h6>'+my_coms[i].author+'<h6>';
		html += '</li>';
		}
	}
	html += '</ul>';
	if( type == "com"){
		$("#comments4sel").html(html);
	}else if(type == "fav"){
		$("#favorates4sel").html(html);
	}

}
function fresh_mycomments(func){
	var url = '/index.php?c=com&a=getcommentsuser_json';
	url += '&tuser='+page_user;
	$.post(url, function(data){
		//debug(data);
		if(is_json_str(data)){
			var ret_obj = eval(data);
			if( ret_obj.code == -33){
				ask_login();
				return;
			}
			if( ret_obj.err != 0){
				if( ret_obj.code == -6)
					ret_obj.ret = [];
				else
					return;
			}
			page_my_comments = ret_obj.ret;
			//for(var i = 0; i < ret_obj.ret.length; i++){
			//	ret_obj.ret[i].comments = util_unescape(ret_obj.ret[i].comments);
			//}
			if( func )
				func(ret_obj.ret);
		}
	});

}

function fresh_favors(func){
	var url = '/index.php?c=com&a=getfavorcombyuser';
	url += '&tuser='+page_user;
	$.post(url, function(data){
		//debug(data);
		if(is_json_str(data)){
			var ret_obj = eval(data);
			if( ret_obj.err != 0){
				if( ret_obj.code == -6)
					ret_obj.ret=[];
				else
					return;
			}
			page_my_favorates = ret_obj.ret;
 		//	for(var i = 0; i < ret_obj.ret.length; i++){
		//		ret_obj.ret[i].comments = util_unescape(ret_obj.ret[i].comments);
		//	}

			if( func )
				func(page_my_favorates);
		}
	});

}
