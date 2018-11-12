<?php 
	define("APP_PATH", dirname(__FILE__));
	header("Content-Type:text/html;charset=utf-8");
	require_once('initphp/initphp.php');
	session_start();
	if( !isset($_REQUEST["id"])){
		echo "parameter invalid";
		return;
	}
	$com = InitPHP::getDao("com");
	if( !$com ){
		echo "internal error by geting dao";
		return;
	}
	$fc = $com->get_all_by_fields(array("id"=>$_REQUEST["id"]), "flowcharts");
	if( !$fc ){
		echo "the id is wrong or deleted";
		return;
	}
	$fc_data = make_json($fc[0]); 
	
?>
<html>
<head>
<title>lookview -  Execution Path</title>
<meta charset="utf-8"></meta>
<script>
	var flowchart_data = '<?php echo $fc_data; ?>';
</script>
</head>
<body
		ng-app="app" 
		ng-controller="AppCtrl"
		mouse-capture
		ng-keydown="keyDown($event)"
		ng-keyup="keyUp($event)"
>
 <?php require_once("header.php"); ?>
<link href="/cd/fuelux.css" rel="stylesheet">

 <div style="margin-left: 10px;">
	<div ng-show="editable">
    			<button
    				ng-click="addNewNode()"
    				title="Add a new node to the chart"
    				>
    				Add Node
				</button>
    			<button
    				ng-click="addNewInputConnector()"
    				ng-disabled="chartViewModel.getSelectedNodes().length == 0"
    				title="Add a new input connector to the selected node"
    				>
    				Add Input Connector
				</button>
    			<button
    				ng-click="addNewOutputConnector()"
    				ng-disabled="chartViewModel.getSelectedNodes().length == 0"
    				title="Add a new output connector to the selected node"
    				>
    				Add Output Connector
				</button>
    			<button
    				ng-click="deleteSelected()"
    				ng-disabled="chartViewModel.getSelectedNodes().length == 0 && chartViewModel.getSelectedConnections().length == 0"
    				title="Delete selected nodes and connections"
    				>
    				Delete Selected
				</button>
			<button
    				ng-click="saveSelected()"
    				title="Upload the data to the server"
    				>
    				Save Data
				</button>
	</div>
	<div>
		{{fc_name}}
	</div>

				<!--
				This custom element defines the flowchart.
				-->
			<div class="draggable-container" style="border: solid 1px blue;padding:5px;" >

			    <flow-chart
		    		style="margin: 5px; width: 100%;"
			      	chart="chartViewModel"
			      	>
			    </flow-chart>
			</div>
		    </div>

<div class="bottom_area"> 
</div>


<div id="sel-dialog" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-dia-title">Selection</h4>
      </div>
      <div class="modal-body" id="my-dia-body">
        <div class="container-fluid">
		<ul class="nav nav-tabs" role="tablist">
 			<li role="presentation" class="active"><a href="#comments4sel" aria-controls="comments4sel" role="tab" data-toggle="tab">My Comments</a></li>
 			<li role="presentation"><a href="#favorates4sel" aria-controls="favorates4sel" role="tab" data-toggle="tab">My Favorate Comments</a></li>
		</ul>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="comments4sel"> loading</div>
			<div role="tabpanel" class="tab-pane" id="favorates4sel">loading...</div>
		</div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- support flowchart including -->
	<link rel="stylesheet" type="text/css" href="angularfc/app.css">
	<!-- Library code. -->
	<script src="angularfc/lib/jquery-2.0.2.js" type="text/javascript"></script>
	<script src="/cd/jutil.js"></script>
	<script src="/cd/bootstrap.js"></script>


	<script src="angularfc/lib/angular.js" type="text/javascript"></script>
	<!-- Flowchart code. -->
	<script src="angularfc/debug.js" type="text/javascript"></script>
	<script src="angularfc/flowchart/svg_class.js" type="text/javascript"></script>
	<script src="angularfc/flowchart/mouse_capture_service.js" type="text/javascript"></script>
	<script src="angularfc/flowchart/dragging_service.js" type="text/javascript"></script>
	<script src="angularfc/flowchart/flowchart_viewmodel.js" type="text/javascript"></script>
	<script src="angularfc/flowchart/flowchart_directive.js" type="text/javascript"></script>
	<!-- App code. -->
	<script src="angularfc/app.js" type="text/javascript"></script>
</body>
</html>


