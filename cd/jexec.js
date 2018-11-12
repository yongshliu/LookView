//$(window).load(initForm);

var flowchart_header = 0;

var page_my_favorates = 0;
var page_my_comments = 0;
var flowchart_list = 0;
var flowchart_last_fcid = 0;
var fileinfo_obj =  0;
var  path_displayed = 0;
function cb_jexec(type){
	if( type == "session"){
		if( page_user ){
		}
		else{
		}
	}
	
}

function debug(text){
	util_debug(text);
}
$(document).ready(function(){
	jutil_init(cb_jexec);
	flowchart_header = eval(fc_header);
	$("#login").click(ask_login);
	show_execpath(flowchart_header);
	if( flowchart_header.user == page_user ){
		fresh_mycomments(function(comments){
			init_sellection_dialog_data("com", comments);
		});
		fresh_favors(function(comments){
			init_sellection_dialog_data("fav", comments);
		});
	}
	$("body").on("click", ".fc_item_cmd .cmd", function(e){
		//debug("fc_item_cmd clicked");
		curid = 0;
		fcctl = $(".fc-item.active");
		if( fcctl.length > 0){
			curid = fcctl.attr("id").slice(2);
		}else{
			//debug("no flowchart selected");
			return;
		}
		flowchart_last_fcid = curid;
		if( $(this).hasClass("add") ){
			$("#sel-dialog").attr("data-info", curid);
			$("#sel-dialog").modal("show");
		}else if( $(this).hasClass("del")){
			del_a_flowchart(curid);
		}else if( $(this).hasClass("move-up")){
			//debug("move-up");
			moveup_flowchart(curid);
		}else if( $(this).hasClass("move-down")){
			//debug("move-down");
			movedown_flowchart(curid);
		}
	});
	$("body").on("click", ".nav-fc-item-add", function(e){
		$("#sel-dialog").attr("data-info", 0);
		$("#sel-dialog").modal("show");
	});
	$("body").on("click", ".insert-com", function(e){
		cominfo = eval($(this).attr("data-info"));
		preid = $("#sel-dialog").attr("data-info");
		insert_new_flowchart(preid, cominfo);	
		$("#sel-dialog").modal("hide");
	});
	$("body").on("click", ".fc-item", function(e){
		if( $(this).hasClass("active")){
			return;
		}
		cmdctrl = $(".fc_item_cmd.active");
		if( cmdctrl.length >0 ){
			cmdctrl.removeClass("active");
			cmdctrl.detach();
		}else{
			cmdctrl = $(".fc_item_cmd").clone();
		}
		$(".active").removeClass("active");
		$(this).addClass("active");
		$(this).append(cmdctrl);
		cmdctrl.addClass("active");
		fcid=$(this).attr("id").slice(2);
		flowchart_last_fcid = fcid;
		show_flowchart_com_by_fcid(fcid);
	});
});
function fresh_mycomments(func){
	url = '/index.php?c=com&a=getcommentsuser_json';
	url += '&tuser='+page_user;
	$.post(url, function(data){
		//debug(data);
		if(is_json_str(data)){
			ret_obj = eval(data);
			if( ret_obj.code == -33){
				ask_login();
				return;
			}
			if( ret_obj.err != 0){
				return;
			}
			page_my_comments = ret_obj.ret;
			if( func )
				func(ret_obj.ret);
		}
	});

}

function get_com_comobj_by_id(id){
	if( page_my_comments ){
		for(i=0;i<page_my_comments.length;i++){
			if(page_my_comments[i].id == id )
				return page_my_comments[i];
		}
	}
	return 0;

}
function get_fav_comobj_by_id(id){
	if( page_my_favorates ){
		for(i=0;i<page_my_favorates.length;i++){
			if(page_my_favorates[i].id == id )
				return page_my_favorates[i];
		}
	}
	return 0;
}
function fresh_favors(func){
	url = '/index.php?c=com&a=getfavorcombyuser';
	url += '&tuser='+page_user;
	$.post(url, function(data){
		//debug(data);
		if(is_json_str(data)){
			ret_obj = eval(data);
			if( ret_obj.err != 0){
				return;
			}
			page_my_favorates = ret_obj.ret;
			if( func )
				func(page_my_favorates);
		}
	});

}
function show_execpath(header_obj){
	url = '/index.php?c=user&a=getexecpathcombyhid';
	url += '&hid='+header_obj.id;
	$.post(url, function(data){
		//debug(data);
		if( is_json_str(data) ){
			
			path_com = eval(data);
			if(  path_com.err == 0){
				flowchart_list = path_com.ret;
				edit_exec_path(path_com.ret);
				return;
			}			

		}

	});

}
function init_sellection_dialog_data(type, my_coms){
	html  = '<ul class="list-group">';
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
function moveup_flowchart(fcid){
	//debug("del_a_flowchart:"+fcid);
	url = '/index.php?c=user&a=fcmoveup';
	url += '&id='+fcid;
	$.post(url, function(data){
		show_execpath(flowchart_header);
	
	});
	
}

function movedown_flowchart(fcid){
	//debug("del_a_flowchart:"+fcid);
	url = '/index.php?c=user&a=fcmovedown';
	url += '&id='+fcid;
	$.post(url, function(data){
		show_execpath(flowchart_header);
	
	});
	
}
 
function del_a_flowchart(fcid){
	//debug("del_a_flowchart:"+fcid);
	url = '/index.php?c=user&a=delexecpath';
	url += '&id='+fcid;
	$.post(url, function(data){
		show_execpath(flowchart_header);
	
	});
	
}
function insert_new_flowchart(preid, cominfo){
	//util_debug(cominfo);
	parentid = 0;
	nextid = 0;
	comid = 0;
	project = 0;
	if( cominfo.type=="com"){
		comcom = find_array_item(page_my_comments, "id", cominfo.comid);
		if( !comcom )
			return -1;
		comid = comcom.id;
		project = comcom.topdir; 
		
	}else if(cominfo.type == "fav"){
		favcom = find_array_item(page_my_favorates, "id", cominfo.comid);
		if( !favcom )
			return -1;
		comid = favcom.commentid;
		project = favcom.project;
		
	}else{
		return -1;
	}
	if( preid != 0 ){
		preitem = find_array_item(flowchart_list, "id", preid);	
		if(preitem){
			parentid=preitem.parent;
			nextid = preitem.next;
		}
	}else{
		first_item = find_array_item(flowchart_list, "prev", 0);
		if( first_item)
			nextid = first_item.id;
	}
	url = '/index.php?c=user&a=insertexecpath';
	url += '&header='+flowchart_header.id;
	url += '&project='+project;
	url += '&comid='+comid;
	url += '&parent='+parentid;
	url += '&prev='+preid;
	url += '&next='+nextid;
	$.post(url, function(data){
		if( is_json_str(data)){
			//util_debug(data);	
			retobj = eval(data);
			if( retobj.err == 0){
				newid = retobj.ret.id;
				show_execpath(flowchart_header);	
			}	
			
		}
	//	show_execpath(flowchart_header);
		//$(".selection_for_insert").remove();
	});

}
var last_displayed_com_id = 0;
function show_flowchart_com_by_fcid(fcid){
	fcobj = find_array_item(flowchart_list, "id", fcid);
	if( !fcobj ){
		//debug("??? why can't find a flowchart id to show???");
		return;
	}
	turl = "/"+fcobj.project +"/"+ fcobj.filename;	
	//debug(turl);
	util_get(turl, function(data){
		$("#file_wrapper").html(data);
		fileinfo_obj=eval(file_info);
		jfile_init();
		loadcomments(function(){
			init_comment_by_ln(fcobj.lineno);
			show_comment_by_ln(fcobj.lineno);
		});
		jfile_build_cmd_bar($("#fc_file_cmd_bar"));

		window.location.href="#line"+(fcobj.lineno>0?fcobj.lineno-1:0);
		
	});
	//$("#exec_source_frame").attr("src", turl);
}

function edit_exec_path(path){
	if( path ){
		first_level = find_array_items(path, "parent", 0);
		//debug(first_level);
		if( first_level.length > 0){
			html = "";
			header = item = find_array_item(first_level, "prev", 0);
			while(item){
		 		html += '<div class="fc-item" id=fc'+item.id+'>';
				html += util_unescape(item.comments) + '</div>';
				item = find_array_item(first_level, "id", item.next);
			}
			$(".fc_list .nav-vertical-bar").html(html);
			if( $(".fc-item.active").length<1){
				//debug("active fc:"+flowchart_last_fcid);
				activeid = header.id;
				if( item = find_array_item(path, flowchart_last_fcid))
					activeid = item.id;
				$("#fc"+activeid).trigger("click");
				//show_flowchart_com_by_fcid(activeid);	
			}

		}
	}	
}
function exec_edit_name(ctl){
	me = $(ctl);
	if( me.hasClass("editing")){
		ta = $("#exec_edit_name_ta");
		name = ta.val();
		if( check_input_str(name) ){
			idinfo = $(".exec_edit_outline").attr("data-info");
			id = eval(idinfo).id;
			
			url = url = '/index.php?c=user&a=updateexecheader';
			url += '&id='+id;
			url += '&name='+name;
			$.post(url, function(data){
				ret = eval(data);
				if(ret.err == 0){
					ta.attr("readonly", "true");
					me.text("edit");
					me.removeClass("editing");
				}
			});

		}else{
			util_alert("the contents you inputed is including the illegal letter");	
		}

	}else{
		me.addClass("editing");
		me.text("save");
		$("#exec_edit_name_ta").removeAttr("readonly");
	}
	
}
function exec_edit_des(ctl){
	me = $(ctl);
	if( me.hasClass("editing")){
		ta = $("#exec_edit_des_ta");
		name = ta.val();
		if( check_input_str(name) ){
			idinfo = $(".exec_edit_outline").attr("data-info");
			id = eval(idinfo).id;
			
			url = url = '/index.php?c=user&a=updateexecheader';
			url += '&id='+id;
			url += '&des='+name;
			$.post(url, function(data){
				ret = eval(data);
				if(ret.err == 0){
					ta.attr("readonly", "true");
					me.text("edit");
					me.removeClass("editing");
				}
			});

		}else{
			util_alert("the contents you inputed is including the illegal letter");	
		}

	}else{
		me.addClass("editing");
		me.text("save");
		$("#exec_edit_des_ta").removeAttr("readonly");
	}

}
function ask_login(){
	user_login(function(ret){
		if( ret.user!="" && ret.session!=""){
			user = page_user = ret.user;
			session = page_session = ret.session;
		}
		else
			ask_login();
	});	
}


