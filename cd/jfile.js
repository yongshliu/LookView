var local_comments_set = 0;
var fileinfo_obj = 0;
var display_area_width = 0;
var local_favors_obj = 0;
var local_gifts_obj = 0;
var project_file_tree_obj = 0;
function set_display_width(width){
	//debug("width:"+width);
	display_area_width=width;
	jfile_adjust(width);
}

function jfile_adjust(){
	if( display_area_width > 800){
		$(".com_header").addClass("com_header_big");
		$(".linecomments_div").addClass("linecomments_div_big");
		$(".com_bottom").addClass("com_bottom_big");
		$(".div_line_contents").css("width", "1000px");
		
	}else{
		$(".com_header").removeClass("com_header_big");
		$(".linecomments_div").removeClass("linecomments_div_big");
		$(".com_bottom").removeClass("com_bottom_big");
		$(".div_line_contents").css("width", "770px");

	}
}
var jfile_caller_cb = 0;
var jfile_g_symbols_obj = new Object();
var jfile_g_symbols_index_obj = 0; 
function jfile_init(cb){
	handle_contents();
	jfile_fetch_g_index_file(function(obj){
		if( cb )
			cb("gsready");
	});
	$(".multi_def").click(function(e){
		e.preventDefault();
		on_multiple_def($(this));
	});
		
	if(cb)
		jfile_caller_cb = cb;

	$("div").on("mouseenter", ".com_div",function(e){
		$(this).find(".dlc_cmd").addClass("active");
	});
	$("div").on("mouseleave", ".com_div",function(e){
		//debug("mouse going off");
		$(this).find(".dlc_cmd").removeClass("active");
	});
	$('<span class="glyphicon glyphicon-pencil"></span>').replaceAll($(".a_ln img"));
	$("body").on("mouseenter", ".dir_content_div", function(e){
		//$(this).find(".a_code_tag").css({"overflow":"visible", "text-overflow":"", "-o-text-overflow":""});
	});
	$("body").on("mouseleave", ".dir_content_div", function(e){
		//$(this).find(".a_code_tag").css({"overflow":"hidden", "text-overflow":"ellipsis", "-o-text-overflow":"ellipsis"});
	});
	if( fileinfo_obj.folder ){ 
		$(".dir_content_div").attr({"data-toggle":"tooltip", "data-placement":"top","title":"Tooltip on top"});
		$(".dir_content_div").attr("title", function(index, oldval){
			return $(this).find(".a_code_tag").text();
		});
		$(function () {
  			$('[data-toggle="tooltip"]').tooltip();
		});
	}	
	var project_tree = $("#project-tree");
	if( project_tree.length>0){
		
		load_project_file_tree(function(data){
			$("#project-tree").tree({"dataSource":project_tree_data_source});
		});
		$("#project-tree").on('selected.fu.tree', function(e, data){
			util_debug(data);
			if( data.target.type == "item"){
				goto_url(fileinfo_obj.topdir+"/"+data.target.path);	
			}
			//util_debug(e);
		});
	}
	$("body").on("keyup", ".commenttext_t", function(){
		if( $(this).val().length > 1300){
			$(this).val($(this).val().slice(0, 1300));
		}
		//util_debug(util_escape( $(this).val()));
	});
}
function handle_contents(){

	fileinfo_obj = eval(file_info);

	$(".a_code_tag").attr("href", function(index, oldval){
		attr = pageinfo_obj.base + fileinfo_obj.topdir +"/";
		attr += oldval;
		return attr;
	});
	loadcomments();
}

function project_tree_data_source(parent, callback){
	//util_debug("prject_tree_data_source+");
	var ret = 0;
	//util_debug(parent);
	if( !project_file_tree_obj){
		util_debug("project_file_tree_obj not initialized");
		return 0;
	}
	if( !parent || !parent.text){
		cbdata = [{text:fileinfo_obj.project,type:"folder", "attr":{"hasChildren":"true"}, path:0}];
		callback({data:cbdata});
	}
	else{
		var subfolder = [];
		var folderobj = get_project_tree_by_path(parent.path);
		if( folderobj ){
			for(var i=0;i<folderobj.length;i++){
				var itemobj = new Object();
				itemobj.text = folderobj[i].n;
				itemobj.type = folderobj[i].t=="f"?"item":"folder";
				itemobj.path = folderobj[i].p;	
				subfolder.push(itemobj);
			} 		
		}
		util_debug(subfolder);
		callback({data:subfolder});
	}
	return ret;
	
}
function get_project_tree_by_path(path){
	if( !path )
		return project_file_tree_obj;
	var pathsplit = path.split("/");
	var headobj = project_file_tree_obj;
	for(var i=1;i<pathsplit.length;i++){
		util_debug(pathsplit[i]);
		var oldhead = headobj;
		for(var j=0;j<headobj.length;j++){
			if( headobj[j].n == pathsplit[i] ){
				headobj = headobj[j].s;
				break;
			}
		}
		if( oldhead == headobj ){
			util_debug("get_project_tree_by_path, don't found:"+path);
			return 0;
		}
	}
	return headobj;
}
function get_gift_i_did(func){
	url = "/index.php?c=com&a=getcomgift";
	url += "&op=fw";
	url += "&who="+page_user;
	url += "&topdir="+fileinfo_obj.topdir;
	url += "&file="+fileinfo_obj.path;
	$.post(url, function(data){
		//util_debug("get_gift_i_did");
		//util_debug(data);
		if( func )
			func(data);
	});

}
function get_favor_i_did(func){
	url = "/index.php?c=com&a=getcomfavor";
	url += "&op=fw";
	url += "&who="+page_user;
	url += "&topdir="+fileinfo_obj.topdir;
	url += "&file="+fileinfo_obj.path;
	$.post(url, function(data){
		//util_debug("get_favor_i_did");
		//util_debug(data);
		if( func )
			func(data);
	});
}
function count_com_gift_by_comid(comid){
	if( local_gifts_obj && local_gifts_obj[comid]){
		return local_gifts_obj[comid].length;	
	}
	return 0;

}
function is_com_gifted(comid){
	if( !page_user)
		return 0;
	if( local_gifts_obj && local_gifts_obj[comid]){
		for(var i=0;i<local_gifts_obj[comid].length;i++){
			if( local_gifts_obj[comid][i].whogive == page_user ){
				return local_gifts_obj[comid][i];
			}
		}
	}
	return 0;
}
function count_com_favor_by_comid(comid){
	if( local_favors_obj && local_favors_obj[comid]){
		return local_favors_obj[comid].length;	
	}
	return 0;

}

function is_com_favored(comid){
	if( !page_user)
		return 0;
	if( local_favors_obj && local_favors_obj[comid]){
		for(var i=0; i<local_favors_obj[comid].length;i++){
			if(local_favors_obj[comid][i].whofavor==page_user )
				return local_favors_obj[comid][i];
		}

	}
	return 0;
}
function jfile_build_cmd_bar(container){
	url = '/file_cmd_bar.html';
	util_get(url, function(data){
		container.html(data);
		document.getElementById("global_symbol_search_input").onkeyup = on_global_symbol_search_keyup;
		document.getElementById("lss_input").onkeyup = on_local_symbol_serach_keyup;
		document.getElementById("pfs_input").onkeyup = on_project_file_search_keyup;
		set_file_path(fileinfo_obj, pageinfo_obj);
		load_project_file_list();
		//load_project_file_list(build_project_files_div);
		if( local_symbol_set){
			local_symbols_obj = eval(local_symbol_set);
			build_local_symbol_div(local_symbols_obj);
		}
		bind_all_event();
	});
	//util_debug(container.width());
}
function bind_all_event(){
	$("#page_unfold_all").click(function(e){
		//debug("click to show all the comments");
		e.preventDefault();
		show_all_comments();
	});

	$("#page_fold_all").click(function(e){
		e.preventDefault();
		fold_all_comments();
	});
	$("#page_unfold_mine").click(function(e){
		fold_my_comments();
	});
	$("#page_fold_mine").click(function(e){
		unfold_my_comments();
	});
	
	globalsymsdisplaytimeout = 0;
	globalsymsdispear=0;
	$("#global_symbol_search_input").blur(function(e){
		globalsymsdisplaytimeout = setTimeout(function(){
			$("#global_symbols_sel_div").css("display", "none");
			$("#global_symbol_search_input").val("");
			globalsymsdisplaytimeout = 0;
	
		}, 300);
	});
	$("#global_symbols_sel_div").click(function(e){
		if( globalsymsdisplaytimeout){
			clearTimeout(globalsymsdisplaytimeout);
			globalsymsdisplaytimeout = 0;
			globalsymsdispear = 1;
		}
	});
	$(".global_symbol span").click(function(e){
		$("#global_symbols_sel_div").css("display", "none");
		$("#global_symbol_search_input").val("");
	
	});
	$(".pc_local_symbols").click(function(e){
		$(".pc_tab_active").removeClass("pc_tab_active");
		$(".pc_local_symbols").addClass("pc_tab_active");
		$(".pc_conts_active").removeClass("pc_conts_active");
		$(".localsymbolsaside").addClass("pc_conts_active");
	})
	$(".pc_files").click(function(e){
		$(".pc_tab_active").removeClass("pc_tab_active");
		$(".pc_files").addClass("pc_tab_active");
		$(".pc_conts_active").removeClass("pc_conts_active");
		$(".pc_files_list").addClass("pc_conts_active");
	});
	$("#show-code-tree").click(function(e){
		$("#project-tree-container").modal("show");
	});

}
function set_file_path(fi, pi){
	// fi is fileinfo, pi is pageinfo
	//show_in_test(fi.path);
	filepath = fi.path.split('/');
	filepath_html ='<ol class="breadcrumb">';
	filepath_html +='<li>File:</li>';
	filepath_link = pi.base + fi.topdir;
	for(i=0; i<filepath.length;i++){
		filepath_link += '/' + filepath[i];
		href = filepath_link;
		if( i == filepath.length-1){
			filepath_html +='<li class="active">' + filepath[i] + "</li>";
		} else {
		
			href += '/' + foler_index_file_name;
			filepath_html += "<li><a class=\"file_path_a\" href="+href+">" + filepath[i] + '</a></li>';	
		}
	}
	filepath_html += '</ol>';
	$("#file_path_div").html(filepath_html);

}
function global_symbol_input_lose_focus(e){
	$("#global_symbols_sel_div").css("display", "none");
	$("#global_symbol_search_input").val("");

}
var g_symble_timeout_handle = 0;
function timeout_handle_global_symbol_search(){
	g_symble_timeout_handle = 0;
	util_debug("gstimer fired");
	var input = document.getElementById("global_symbol_search_input");
	var text = input.value;
	text = text.trim();
	text = text.toLowerCase();
	var html = " ";
	if( text.length == 0){
		$("#global_symbols_sel_div").css("display", "none");
		return;
	}	
	jfile_get_g_symbols(text, function(symbols){
		display_global_symbols(text, symbols);

	});
	

}
function on_global_symbol_search_keyup(e)
{
	if( g_symble_timeout_handle ){
		clearTimeout(g_symble_timeout_handle);
	}
	g_symble_timeout_handle=setTimeout(timeout_handle_global_symbol_search, 200);
}

function display_global_symbols(text, symbols_obj){
	var html = "";
	urlbase = pageinfo_obj.base + fileinfo_obj.topdir + "/";
	for(i=0;i<symbols_obj.length;i++){
		key = symbols_obj[i].tag;
		//show_in_test(symbols_obj.length+":"+key + ":"+symbols_obj[i].ref.length);
		symtext = key.toLowerCase();
		if(text.length ==0  || symtext.indexOf(text) != -1){
			syms = symbols_obj[i].ref;
			for(j=0;j<syms.length;j++){
			// we found one
		   		html += "<div class=panel-body><a class=\"a_global_symbol\"  href=\"";
		   		html += urlbase + syms[j].fp+"#line" + syms[j].ln + "\"><span class=badge>";
		  		html += key + "</span>";
		 		html += '     <span class="ctd">'+syms[j].ki + '</span>';
				html += '<span>      <i>'+syms[j].fp + '</i></span></a></div>';
			}
		}

	}
	$("#global_symbols_sel_div").html(html);
	/*
	$(".a_global_symbol").click(function(e){
		e.preventDefault();
		window.location.href = pageinfo_obj.base+fileinfo_obj.topdir + "/" + $(this).attr("href");
	});*/
	$("#global_symbols_sel_div").css("display", "block");
}
var project_files_list_obj = 0;
function load_project_file_list(cb){
	url = fileinfo_obj.topdir + '/filelist.f';
	util_get(url, function(data){
		if( is_json_str(data)){
			project_files_list_obj = eval(data);
			if( cb )
				cb(project_files_list_obj);
		}
	});
	
}
function load_project_file_tree(cb){
	var url = fileinfo_obj.topdir+'/filetree.f';
	util_get(url, function(data){
		if( is_json_str(data)){
			project_file_tree_obj = eval(data);
			//util_debug(project_file_tree_obj);
			if( cb )
				cb(project_file_tree_obj);
		}
	});
}
function display_project_files(){
	if( !project_files_list_obj )
		load_project_file_list(build_project_files_div);
	else
		build_project_files_div(project_files_list_obj);
}
function build_project_files_div(files_obj, type){
	var html = "";
	util_debug("build_project_files_div+"+type);
	if( type == "list" ){
		html += build_project_files_list(files_obj);
	}else	{
		for(key in files_obj){
			fo = files_obj[key];
			html +=	build_project_files_list(fo);
		}
	}
	
	$("#pf_list_div").html(html);
		
}
function build_project_files_list(flist){
	urlbase = '/page.php?page=/'+fileinfo_obj.topdir + '/';
	var html = "";
	for(var i=0;i<flist.length;i++){
		html += '<div class="panel-body"><a role="button" href="';
		html += urlbase+flist[i][1]+'"><span class="label label-default">'+flist[i][0]+'</span>   '+flist[i][1]+'</a>';
		html += '</div>';
	}
	return html;

}
function on_project_file_search_keyup(e){
	if( !project_files_list_obj )
		return;
	input_obj = document.getElementById("pfs_input");
	text = input_obj.value;
   	text = text.trim();
	text = text.toLowerCase();
	var obj_set;
	if( text == "" ){
		//build_project_files_div(project_files_list_obj);
		return;
	}	
	if( text.length == 1){
		obj_set = project_files_list_obj[text];		
		
	}else{
		var key  = text[0];
		if(project_files_list_obj[key]){
			obj_set = search_array_txt(text, project_files_list_obj[key], function(obj){
				return obj[0];
			});
		}
	}
	//debug(obj_set.length);
	if( obj_set && obj_set.length>0){
		build_project_files_div(obj_set, "list");
		return;

	}else{
		$("#pf_list_div").html('<div class="panel-body">空</div>');	
	}
}
function build_local_symbol_div(obj_set){
	html = "";
	if( obj_set.length <1 )
		return;
	for(i=0;i<obj_set.length;i++){
		html += '<div class="panel-body"><a role="button" href="';
		html += '#line'+obj_set[i].ln + '">';
		html += obj_set[i].name + '</a>';
		html += '</div>';
	}
	//debug(html);
	$("#lss_list_div").html(html);

}

function on_local_symbol_serach_keyup(e){
	if( !local_symbols_obj)
		return;
	var input_obj = document.getElementById("lss_input");
	var text = input_obj.value;
	text = text.trim();
	text = text.toLowerCase();
	if( text == ""){
		build_local_symbol_div(local_symbols_obj);
		return;
	}
	else{
		obj_set = search_array_txt(text, local_symbols_obj, function(obj){
			return obj.name;
		});
		if( obj_set && obj_set.length>0){
			build_local_symbol_div(obj_set);
		}
		else{
				$("#lss_list_div").html('<div class="panel-body">Not found</div>');	
		}
	}
}
function search_array_txt(text, data_set, obj_func){
	if( !data_set || !obj_func)
		return 0;
		var keynum
	retobj_set = new Array();
	for(i=0;i<data_set.length;i++){		
		ttext = obj_func(data_set[i]);
		if(text.length ==0  || ttext.indexOf(text) != -1){
			// we found one
			retobj_set.push(data_set[i]);
		}
	}
	return retobj_set;// numcheck.test(keychar);

}

//////////////
function jfile_fetch_g_index_file(cb){
	if(fileinfo_obj.topdir.charAt(0) != "/" )
		url = "/" + fileinfo_obj.topdir + "/g_tag/";
	else
		url = fileinfo_obj.topdir + "/g_tag/";

	url += "tindex.f"; 
	util_get(url, function(data){
		if( is_json_str(data)){
			//util_debug(data);
			jfile_g_symbols_index_obj = eval(data);	
			if( cb )
				cb(jfile_g_symbols_index_obj);
			//debug(data);
		}	
	});

}

function jfile_get_g_symbols(text, cb){
	var url="";
	var ltext = text.toLowerCase();
	var filter_file = new RegExp("[a-z_]");
	var file_name = ltext.charAt(0);
	if( !jfile_g_symbols_index_obj){
		// fetch again;
		jfile_fetch_g_index_file(function(obj){
			jfile_get_g_symbols(text, cb);	
		});
		return 0;
	}
	if( !filter_file.test(file_name))
		file_name =  "other";
	else{
		if( jfile_g_symbols_index_obj.flist[file_name] ){
			var filelist = jfile_g_symbols_index_obj.flist[file_name];
			for(var i =0; i< filelist.length;i++){
				if( str_compare(ltext, filelist[i][0]) == 0){
					file_name = filelist[i][0];
					break;
				}else if( str_compare(ltext, filelist[i][0]) < 0){
					file_name = filelist[i-1][0];
					break;
				}else{
					file_name = filelist[i][0];
				}
			}
		}
	}
	//util_debug(file_name);
	if( jfile_g_symbols_obj[file_name]){
		if(cb)
			cb(jfile_g_symbols_obj[file_name]);
		return 1;
	}
	if( fileinfo_obj.topdir){
		if(fileinfo_obj.topdir.charAt(0) != "/" )
			url = "/" + fileinfo_obj.topdir + "/g_tag/";
		else
			url = fileinfo_obj.topdir + "/g_tag/";
	} 
	else{ //  do nothing
		return 0;
	}
	url += file_name;
	util_get(url, function(data){
		//debug(data);
		jfile_g_symbols_obj[file_name] = eval(data);
		if(cb)
			cb(jfile_g_symbols_obj[file_name]);
	});
	
	return 1;
	
}
function on_multiple_def(ctlobj){
	text = ctlobj.text();
	on_multi_list_close();
	jfile_get_g_symbols(text, function(syms){
		urlbase = "/page.php?page=/"+fileinfo_obj.topdir + "/";

		html = '<div id="multi_def_sym_list">';
			html += '<div class="mdst_title">';
				html += '<span class="mdst_sym">'+text+'</span>';
				html += '<span class="hypertext mdst_close" onclick=on_multi_list_close(this)>close</span>';
			html += '</div>';
		for(i=0;i<syms.length;i++){
			if( text == syms[i].tag){
				sym=syms[i].ref;
				for(j=0;j<sym.length;j++){
					html += '<div class=mdst_syminfo >';
		 			html += '<span>'+sym[j].ki + '</span>';
					html += "<a class=\"hypertext\"  href=\"";
		   			html += urlbase + sym[j].fp+"#line" + sym[j].ln + "\" onclick=on_multi_def_a(this)>";
					html += sym[j].fp;
					html += '</a>';
					html += '</div>';
					
				}
				break;
			}
		}
		html += '</div>';
		$(html).insertAfter(ctlobj);
		//$("#multi_def_sym_list").css({"top":100, "left":ctlobj.offset().left});
		//debug(ctlobj.offset().left+":"+ctlobj.offset().top+":"+ctlobj.scrollTop());
	});
}
function on_multi_list_close(ctl){
	obj = $("#multi_def_sym_list");
	if(obj.length >0 )
		obj.remove();
}
function on_multi_def_a(ctl){
	on_multi_list_close();
}
function overload_click(ctl){
	cl = $(ctl).attr("class");
	//debug($(ctl).attr("nodeName"));
	if( cl == "dir_content_img"){
		$(ctl).next().trigger("click");
	} else if( cl == "a_code_tag" ){
		;
	} else if( cl  == "a_ln" ){
		toggle_comment_by_linectl($(ctl).parents(".div_line"));
	} else
		;//debug("strange! this is an unknown class in overload_click");
}
function overload_a(e){
	e.preventDefault();
	//window.location.href = pageinfo_obj.base+fileinfo_obj.topdir + "/" + $(this).attr("href");
	goto_url(fileinfo_obj.topdir + "/" + $(this).attr("href"));

}
function loadcomment_by_ln(ln, func){
	url = '/index.php?c=com&a=getcommentln';
	url += '&fn='+fileinfo_obj.path;
	url += '&tp='+fileinfo_obj.topdir;
	url += '&ln='+ln;
	$.post(url, function(data){
		if( !is_json_str(data) ){
			return;
		}
		result = eval(data);
		if( result.code == -6 ){
			//debug(ln + " no comments");
			if( local_comments_set )
				local_comments_set[ln] = 0;
		}else if( result.err == 0){
			coms = new Array();
			for(i=0;i<result.ret.length;i++){
				coms.push(result.ret[i]);
			}
			if( !local_comments_set )
				local_comments_set = new Array();
			local_comments_set[ln] = coms;
		}
		if( func )
			func(ln);
	});

}
function load_dependent_info(func){
	if( func )
		func();
}
function loadcomments(func){
	load_dependent_info(function(){

	loadgifts(function(){
		loadfavors(function(){			
			url = '/index.php?c=com&a=getcomments_json';
			url += '&file='+fileinfo_obj.path;
			url += '&topdir='+fileinfo_obj.topdir;
			$.post(url, function(data){
				if( !is_json_str(data) ){
					//debug("getting comemnts failed");
					return;
				}
				result = eval(data);	
				if( result.err ==0 ){
					local_comments_set = new Array();
					for(i=0; i<result.ret.length; i++){
						if(!local_comments_set[result.ret[i].lineno]){
							local_comments_set[result.ret[i].lineno] = new Array();
						}
						local_comments_set[result.ret[i].lineno].push(result.ret[i]);
						spanobj = $("#l"+result.ret[i].lineno).find(".a_ln span");
						spanobj.removeClass("glyphicon-pencil");
						spanobj.addClass("glyphicon-comment");
					}	
					if( func){
						func();
					}

				}
				
			});
		});
	});
	});

}

function find_comments_by_id(comid){
	//util_debug("find_comments_by_id:"+comid);
	if( local_comments_set ){
		for(var i in local_comments_set){
			//util_debug("comment["+i+"]");
			//util_debug(local_comments_set[i]);
			for(comment in local_comments_set[i]){
				//util_debug(local_comments_set[i][comment]);
				if(local_comments_set[i][comment].id == comid)
					return local_comments_set[i][comment];
			}
		}
	}
	return 0;
}
function get_comments_by_ln(ln){
	if( local_comments_set && local_comments_set[ln] )
		return local_comments_set[ln];
	return 0;	
}
function show_comment_by_ln(ln){
	obj = $("#c"+ln);
	//if( obj.length<1)
	init_comment_by_ln(ln);
	obj = $("#c"+ln);
	if( obj.length<1){
		//debug("show "+ln+"line no record");
		return false;
	}
	obj.siblings(".dl_wrapper").addClass("dlw_active");
	obj.parents(".div_line").addClass("dl_active");
	spanicon =$("#l"+ln).find(".a_ln .glyphicon");
	spanicon.removeClass("glyphicon-pencil");
	spanicon.addClass("glyphicon-remove-circle");
	
	obj.collapse("show");
	return true;

}
function hide_comment_by_ln(ln){
	obj = $("#c"+ln);
	if( obj.length>0){
		obj.collapse("hide");
		dlobj = obj.parents(".div_line");
		dlobj.children(".dl_wrapper").removeClass("dlw_active");
		dlobj.removeClass("dl_active");
		dlobj.find(".dad_cmd").collapse("hide");
	}
	spanicon =$("#l"+ln).find(".a_ln .glyphicon");
	spanicon.removeClass("glyphicon-remove-circle");
	spanicon.addClass("glyphicon-pencil");


}
function toggle_comment_by_linectl(ctl){
	data_info=ctl.attr("data-info");
	datainfo_obj=eval(data_info);
	if( $("#c"+datainfo_obj.ln).length<1)
		init_comment_by_ln(datainfo_obj.ln);
	if( ctl.hasClass("dl_active")){
		hide_comment_by_ln(datainfo_obj.ln);
	}else{
		show_comment_by_ln(datainfo_obj.ln);	
	}
}
function remove_comment_by_ln(ln){
	obj = $("#c"+ln);
	if( obj.length>0){
		obj.collapse("hide");
		dlobj = obj.parents(".div_line");
		dlobj.children(".dl_wrapper").removeClass("dlw_active");
		dlobj.removeClass("dl_active");
		obj.remove();
	}
}

function init_comment_by_linectl(ctl){
	data_info = ctl.attr("data-info");
	datainfo_obj = eval(data_info);
	build_comment_by_ln(datainfo_obj.ln);

}
function on_dlcbock_click(ctl){
	debug("	on_dlcbock_click" + ctl);
	if( $(ctl).hasClass("comdiv")){
		;
	}else{
		$(ctl).children(".collapse").collapse("show");	
	}

}
function init_comment_by_ln(ln){
	
	remove_comment_by_ln(ln);
	com_html = build_comment_by_ln(ln);
	div_line = $("#l"+ln);
	$(com_html).appendTo(div_line);
	if( $("#newcom"+ln).length>0 )
		make_rich_editor("newcom"+ln);
	var comments = get_comments_by_ln(ln);
	//debug(comments);
	for(var i=0; comments && i<comments.length;i++){
		if( page_session && page_user == comments[i].author){
			var reditor = make_rich_editor("ta"+comments[i].id);
		}else{
			var reditor = make_raw_rich_editor("ta"+comments[i].id);
			reditor.readOnly(true);
		} 
	}
}
function make_author_dropdown(comins){
	urlbase = '/user.php?tuser='+comins.author;
	author_html = 'by  <div class="com_author btn-group">';
 	author_html +='<a type="button" class="btn btn-danger" href="'+urlbase+'">'+comins.author+'</a>';
	author_html += '<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
	author_html += ' <span class="caret"></span>';
	author_html += '</button>';
 	author_html += '<ul class="dropdown-menu">';
   	author_html += '<li><a href="'+urlbase+'&what=profile">基本信息</a></li>';
   	author_html += '<li><a href="'+urlbase+'&what=comments">所有评论</a></li>';
	author_html += '<li><a href="'+urlbase+'&what=favorates">用户收藏</a></li>';
	author_html += '<li><a href="'+urlbase+'&what=follows">用户关注</a></li>';
	author_html += '<li><a href="'+urlbase+'&what=flowchart">程序流程</a></li>';
   	author_html +='<li role="separator" class="divider"></li>';
	author_html +='</ul></div>';
	return author_html;

}
function make_com_info(comment){
	var html = "";
	html += "<div class=com-info-status>";
	html += '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>'+count_com_gift_by_comid(comment.id) +'</span>';
	html += '<span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>'+count_com_favor_by_comid(comment.id) +'</span>';
	html += '</div>';
	return html;
}
function build_comment_by_ln(ln){
	var html = "";
	//html += '<div class="list-group">';
	var user_commented = 0;
	var comments = get_comments_by_ln(ln);
	html += '<div class="dl_c panel-collapse collapse" id="c'+ln+'">';
	debug(comments);
	if( comments ){
		for(i=0; i< comments.length; i++){
			html += build_comment_div(comments[i], false);
			if(page_user && page_user == comments[i].author )
				user_commented = 1;	
		}
		
	}		
	if( !user_commented ){
		
		if( page_user && page_session )
		{
			html +=  '<div class="divadd dlc_block" onclick=on_dlcbock_click(this)>';
			html += '<textarea class="commenttext_t" id="newcom'+ln+'" name="commenttext_name" onkeyup="adjusttaheight(this)" placeholder="add comments..."> </textarea>';
			html += '<div class="dad_cmd collapse">';
			html += '<nav class="navbar navbar-default">';
			html  += '<div class="container-fluid">';
    			html += '<ul class="nav navbar-nav navbar-right">';
			html += '<li><button type="button" class="btn btn-default" ln='+ln+' onclick=com_clear(this)>取消</button></li>';
			html += '<li><button type="button" class="btn btn-default" ln='+ln+' onclick=com_add(this)>确定</button></li>';
			html += '</ul>';
			html += '</div></nav>';
			html += '</div>';
 		  //	html += '<div class="comcmds"><span class="hypertext comclear" onclick=com_clear(this)>clear</span>        <span class="hypertext comadd" onclick=com_add(this)>save</span></div>';
			html += '</div>';
		}else
		{
			html += '<div class="login_to_comment dlc_block">please <span class="hypertext" onclick=on_login_to_comment(this)>登录</span> to comment </div>';	
		}
	}
	//html +='</div>'; // listgroup
	html += '</div>'; // the outter div
	return html;
}

function build_comment_div(comment, replace){
	if( replace == undefined )
		replace = false;
	var commentid = comment.id;
	var html =  '<div id="comdiv' + commentid + '" class="com_div dlc_block">';
	if( page_session && page_user == comment.author)
	{
		html += '<textarea class="commenttext_t", name="commenttext_name" id="ta'+ commentid + '" readonly=true onkeyup="adjusttaheight(this)" data-id='+commentid;
		html +=' author="'+ comment.author+'" >'+ util_unescape(comment.comments) + '</textarea>';
		html += '<div>';
		html += make_author_dropdown(comment);
		html += make_com_info(comment);
		html += '<div class="btn-group dlc_cmd" role="group" aria-label="...">';
		html += '<button type="button" class="btn btn-default edit" data-id='+commentid+' onclick=com_edit(this)>编辑</button>';
		html += '<button type="button" class="btn btn-default" data-id='+commentid+' onclick=com_del(this)>删除</button>';
		html += '</div>';
		html += '</div>'; // class comcmds
	}
	else{ // not user self
		html += '<textarea class="commenttext_p", id="ta'+ commentid + '" readonly=true, data-id='+commentid +' onkeyup="adjusttaheight(this)" author="'+comment.author+'">'+ util_unescape(comment.comments) + '</textarea>';
		html += '<div>';
		html += make_author_dropdown(comment);
		html += make_com_info(comment);
		html += '<div class="btn-group dlc_cmd" role="group" aria-label="...">';
		if( is_com_gifted(commentid) ){
			html += '<button type="button" class="btn btn-default" onclick=com_ungift(this)>取消赞</button>';
		}else{
			html += '<button type="button" class="btn btn-default" onclick=com_gift(this)>赞</button>';
		}
		if( is_com_favored(commentid) ){
			html += '<button type="button" class="btn btn-default" data-id='+commentid+' onclick=com_unfavorate(this)>取消收藏</button>';
		}else{
			html += '<button type="button" class="btn btn-default" data-id='+commentid+' onclick=com_favorate(this)>收藏</button>';
		}
		html += '</div>'; // class  of group
		html += '</div>'; // class of cmd
	}
		
	html += '</div>'; //list item
	if( replace ){
		var oldctl = $("#comdiv"+commentid );
		$(html).replaceAll(oldctl);
	}
	return html;	
}
function adjust_comment_ta(){
	tas = document.getElementsByName("commenttext_name");
	for(i=0;i<tas.length;i++)
		adjusttaheight(tas[i]);
	tas = document.getElementsByName("commenttext_p");
	for(i=0;i<tas.length;i++)
		adjusttaheight(tas[i]);



}
function adjusttaheight(ctl){
	//default height = 30px;
	old=ctl.scrollHeight ;
	if (ctl.scrollHeight < 30 )
		$(ctl).height(30);
	else
		$(ctl).height(ctl.scrollHeight);
	//debug("scrollheight:"+ctl.scrollHeight +"old:"+old);
}
function on_login_to_comment(ctl){
	//
	on_login(ctl);
}
function fresh_favor_by_comid(comid, func){
	var url = "/index.php?c=com&a=getcomfavor";
	url += "&op=ci";
	url += "&comid="+comid;

	$.post(url, function(data){
		//util_debug("fresh_favor_by_comid");
		//util_debug(data);
		if( !is_json_str(data)){
			return 0;
		}
		result = eval(data);
		if( result.err == 0){
			if( !local_favors_obj )
				local_favors_obj = new Array();
			local_favors_obj[comid] = new Array();
			for(var i=0; i< result.ret.length; i++)
				local_favors_obj[comid].push(result.ret[i]);	
				
		}
		if( func != undefined )
			func();
		
	});
	return 1;

}
function loadfavors(func){
	var url = "/index.php?c=com&a=getcomfavor";
	url += "&op=file";
	url += "&topdir="+fileinfo_obj.topdir;
	url += "&file="+fileinfo_obj.path;

	$.post(url, function(data){
		//util_debug("loadfavors");
		//util_debug(data);
		if( !is_json_str(data)){
			return 0;
		}
		result = eval(data);
		if( result.err == 0){
			var retobj = result.ret;
			local_favors_obj = new Array();
			for(var i=0;i<retobj.length;i++){
				var comid = retobj[i].commentid;
				if( !local_favors_obj[comid])
					local_favors_obj[comid] = new Array();
				local_favors_obj[comid].push(retobj[i]);	
				
			}
		}
		if( func != undefined )
			func( result.err );
		
	});
	return 1;
}
function fresh_gift_by_comid(comid, func){
	var url = "/index.php?c=com&a=getcomgift";
	url += "&op=ci";
	url += "&comid="+comid;

	$.post(url, function(data){
		//util_debug("fresh_gift_by_comid");
		//util_debug(data);
		if( !is_json_str(data)){
			return 0;
		}
		result = eval(data);
		if( result.err == 0){
			if( !local_gifts_obj )
				local_gifts_obj = new Array();
			local_gifts_obj[comid] = new Array();
			for(var i=0; i< result.ret.length; i++)
				local_gifts_obj[comid].push(result.ret[i]);	
			//util_debug(local_gifts_obj[comid]);
				
		}
		if( func != undefined )
			func();
		
	});
	return 1;

}

function loadgifts(func){
	var url = "/index.php?c=com&a=getcomgift";
	url += "&op=file";
	url += "&topdir="+fileinfo_obj.topdir;
	url += "&file="+fileinfo_obj.path;
	$.post(url, function(data){
		//util_debug("loadgifts");
		//util_debug(data);
		if( !is_json_str(data)){
			//debug("getting gifts failed");
			return 0;
		}
		result = eval(data);
		if( result.err == 0){
			var retobj = result.ret;
			local_gifts_obj = new Array();
			for(var i=0;i<retobj.length;i++){
				var comid = retobj[i].commentid;
				if( !local_gifts_obj[comid] )
					local_gifts_obj[comid] = new Array();
				local_gifts_obj[comid].push(retobj[i]);	
				
			}

		}
		if( func )
			func(result.err);
		
	});
	return 1;
}


function com_add(ctl){
	ln = $(ctl).attr("ln");
	div_add = $(ctl).parents(".divadd");
	//comments_obj = div_add.children(".commenttext_t");
	comments = $("#newcom"+ln).wysiwyg("shell").getHTML(); 
	if( comments ==""){
		//comments_obj.attr("placeholder", "please input your comments");
		return;
	}
	div_line = $(ctl).parents(".div_line");
	datainfo=eval(div_line.attr("data-info"));
	//debug(fileinfo_obj.path);
	url = '/index.php?c=com&a=addcomment_json';
	url += '&file='+fileinfo_obj.path;
	url += '&topdir='+fileinfo_obj.topdir;
	url += '&lineno=' + datainfo.ln;
	url += '&lineid=' + datainfo.id;
	url += '&comment=' + util_escape(comments);
	util_debug(util_escape(comments));
	$.post(url, function(data){
		debug(data);
		if( !is_json_str(data) ){
			//debug("com add error");
			return;
		}
		result = eval(data);	
		debug("step following in");
		if( result.err == 0 ){
			loadcomment_by_ln(datainfo.ln, function(){
				//init_comment_by_ln(datainfo.ln);
				show_comment_by_ln(datainfo.ln);
			});

		}else if(result.coce == -33 ){
			ask_login();
		}
	});
	
	
}
function com_close(ctl){
	$(ctl).parent().parent().removeClass("div_line_active");
	$(ctl).parent().remove();
}
function com_clear(ctl){
	var ln = $(ctl).attr("ln");
	//$(ctl).parents(".divadd").children(".commenttext_t").val("");
	$("#newcom"+ln).wysiwyg("shell").setHTML("");
	$(ctl).parents(".dad_cmd").collapse("hide");
	//$(".commenttext", $(ctl).parent().parent()).text("");
	
}
function com_unfavorate(ctl){
	if( page_user && page_session ){
		comblock = $(ctl).parents(".dlc_block");
		comobj = comblock.find(".commenttext_p");
		commentid = comobj.attr("data-id");
		author = comobj.attr("author");
		url = '/index.php?c=com&a=delfavor';
		url += '&commentid=' + commentid;

		$.post(url, function(data){
			//debug(data);
			if( is_json_str(data) ){
				if( eval(data).err == 0){
					fresh_favor_by_comid(commentid, function(){
						var newcom = find_comments_by_id(commentid);	
						if( newcom )
							build_comment_div(newcom, true);
					});
				}		
			}
		});	
	}

}
function com_favorate(ctl){
	if( page_user && page_session ){
		comblock = $(ctl).parents(".dlc_block");
		comobj = comblock.find(".commenttext_p");
		commentid = comobj.attr("data-id");
		author = comobj.attr("author");
		url = '/index.php?c=com&a=addfavor';
		url += '&favorwho=' + author;
		url += '&commentid=' + commentid;
		url += '&topdir=' + fileinfo_obj.topdir;
		url += '&file=' + fileinfo_obj.path;

		$.post(url, function(data){
			//debug(data);
			if( is_json_str(data) ){
				if( eval(data).err == 0){
					fresh_favor_by_comid(commentid, function(){
						var newcom = find_comments_by_id(commentid);	
						if( newcom )
							build_comment_div(newcom, true);
					});
				}		
			}
		});	
	}
}
function com_ungift(ctl){
	if( page_user && page_session ){
		comblock = $(ctl).parents(".dlc_block");
		comobj = comblock.find(".commenttext_p");
		commentid = comobj.attr("data-id");
		url = '/index.php?c=com&a=delgift';
		url += '&commentid=' + commentid;

		$.post(url, function(data){
			//debug(data);
			if( is_json_str(data) ){
				if( eval(data).err == 0){
					fresh_gift_by_comid(commentid, function(){
						var newcom = find_comments_by_id(commentid);	
						if( newcom )
							build_comment_div(newcom, true);
					});
				}	
			}
		});
	}
}

function com_gift(ctl){
	if( page_user && page_session ){
		comblock = $(ctl).parents(".dlc_block");
		comobj = comblock.find(".commenttext_p");
		commentid = comobj.attr("data-id");
		author = comobj.attr("author");
		url = '/index.php?c=com&a=givegift';
		url += '&authorname=' + author;
		url += '&commentid=' + commentid;
		url += '&topdir=' + fileinfo_obj.topdir;
		url += '&file=' + fileinfo_obj.path;

		$.post(url, function(data){
			debug(data);
			if( is_json_str(data) ){
				if( eval(data).err == 0){
					fresh_gift_by_comid(commentid, function(){
						var newcom = find_comments_by_id(commentid);	
						if( newcom )
							build_comment_div(newcom, true);
					});
				}	
			}
		});
	}
}
function com_edit(ctl){
	var data_id = $(ctl).attr("data-id");
	if($(ctl).hasClass("edit")){
		$(ctl).text("保存");
		$(ctl).removeClass("edit");
		$("#ta"+data_id).wysiwyg('shell').readOnly(false);
		 //$(ctl).parents(".div_line").find(".commenttext_t").removeAttr("readonly");
		
	}else{
		div_line = $(ctl).parents(".div_line");
		comments_obj =  div_line.find(".commenttext_t");
		datainfo = eval(div_line.attr("data-info"));
		comments = $("#ta"+data_id).wysiwyg('shell').getHTML();
		if( comments == ""){
			init_comment_by_ln(datainfo.ln);
			return;
		}
		$("#ta"+data_id).wysiwyg('shell').readOnly(true);
		$(ctl).addClass("edit");
			//com_add(ctl);
		url = '/index.php?c=com&a=updatecomment_json';
		url += '&id=' + data_id;
		url += '&comment=' + util_escape(comments);
		//util_debug(util_escape(comments));
		$.post(url, function(data){
			//debug(data);
			result = eval(data);	
			if( result.err == 0){
				loadcomment_by_ln(datainfo.ln, function(){
					//init_comment_by_ln(datainfo.ln);
					show_comment_by_ln(datainfo.ln);
				});
			}else{
				init_comment_by_ln(datainfo.ln);
			}
		});
	}
	
}
function com_del(ctl){
	data_id = $(ctl).attr("data-id");
	information = "are you sure to delete this comment?";
	information += "\n this deletion will impact on the execution path!";
	if( window.confirm(information) ){
		//com_add(ctl);
		url = '/index.php?c=com&a=delcomment_json';
		url += '&id=' + data_id;
		url += '&topdir='+fileinfo_obj.topdir;
		$.post(url, function(data){
			//debug(data);
			if( !is_json_str(data) ){
				//debug("deleting comments failed");
				return;
			}
			result = eval(data);	
			if(result.err == 0){
				//$("#comdiv"+data_id).remove();
				ln = eval($(ctl).parents(".div_line").attr("data-info")).ln;
				loadcomment_by_ln(ln, function(){
				//	init_comment_by_ln(ln);
					show_comment_by_ln(ln);
				
				});
			}
		
		});
	}
}

function fold_all_comments(){
	if( local_comments_set ){
		for(ln in local_comments_set){
			hide_comment_by_ln(ln);
		}	
	}
}
function show_all_comments(){
	if( local_comments_set ){
		for(ln in local_comments_set){
			//debug("show all comments:"+ln);
			show_comment_by_ln(ln);
		}	
	}

}

function ask_login(){
	user_login(function(ret){
		if( ret.user=="" && ret.session==""){
		 	ask_login();
		}
	});	
}

function make_raw_rich_editor(eleid){
	var option = {
        element: eleid, // or: document.getElementById('editor0')
        onKeyPress: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        //if( typeof console != 'undefined' )
                          //  console.log( 'RAW: '+character+' key pressed' );
                    },
        onSelection: function( collapsed, rect, nodes, rightclick ) {
                       // if( typeof console != 'undefined' && rect )
                        //    console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
                    },
        onPlaceholder: function( visible ) {
                        //if( typeof console != 'undefined' )
                         //   console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
                    }
    };
    var wysiwygeditor = wysiwyg( option );
    return wysiwygeditor;
    //wysiwygeditor.setHTML( '<html>' );
}
function make_rich_editor(eleid){
	var index = 0;
	var element = $("#"+eleid);
 	var richeditor = $(element).wysiwyg({
            'class': index == 0 ? 'fake-bootstrap' : (index == 1 ? 'fake-uikit' : 'some-more-classes'),
            // 'selection'|'top'|'top-selection'|'bottom'|'bottom-selection'
            toolbar: index == 0 ? 'top-selection' : (index == 1 ? 'bottom-focus' : 'selection'),
            buttons: {
                // Dummy-HTML-Plugin
                dummybutton1: index != 1 ? false : {
                    html: $('<input id="submit" type="button" value="Submit" />').click(function() {
                                alert( 'Submit form' );
                            }),
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                // Dummy-Button-Plugin
                dummybutton2: index != 1 ? false : {
                    title: 'Dummy',
                    image: '\uf1e7',
                    click: function( $button ) {
                                // We simply make 'bold'
                                if( $(element).wysiwyg('shell').getSelectedHTML() )
                                    $(element).wysiwyg('shell').bold();
                                else
                                    alert( 'No text selected' );
                           },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                // Smiley plugin
                smilies: {
                    title: 'Smilies',
                    image: '\uf118', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    popup: function( $popup, $button ) {
                            var list_smilies = [
                                    '<img src="smiley/afraid.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/amorous.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/angel.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/angry.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/bored.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/cold.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/confused.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/cross.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/crying.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/devil.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/disappointed.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/dont-know.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/drool.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/embarrassed.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/excited.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/excruciating.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/eyeroll.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/happy.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/hot.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/hug-left.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/hug-right.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/hungry.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/invincible.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/kiss.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/lying.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/meeting.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/nerdy.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/neutral.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/party.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/pirate.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/pissed-off.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/question.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/sad.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/shame.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/shocked.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/shut-mouth.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/sick.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/silent.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/sleeping.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/sleepy.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/stressed.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/thinking.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/tongue.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/uhm-yeah.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/wink.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/working.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/bathing.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/beer.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/boy.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/camera.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/chilli.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/cigarette.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/cinema.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/coffee.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/girl.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/console.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/grumpy.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/in_love.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/internet.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/lamp.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/mobile.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/mrgreen.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/musical-note.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/music.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/phone.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/plate.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/restroom.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/rose.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/search.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/shopping.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/star.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/studying.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/suit.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/surfing.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/thunder.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/tv.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/typing.png" width="16" height="16" alt="" />',
                                    '<img src="smiley/writing.png" width="16" height="16" alt="" />'
                            ];
                            var $smilies = $('<div/>').addClass('wysiwyg-plugin-smilies')
                                                      .attr('unselectable','on');
                            $.each( list_smilies, function(index,smiley) {
                                if( index != 0 )
                                    $smilies.append(' ');
                                var $image = $(smiley).attr('unselectable','on');
                                // Append smiley
                                var imagehtml = ' '+$('<div/>').append($image.clone()).html()+' ';
                                $image
                                    .css({ cursor: 'pointer' })
                                    .click(function(event) {
                                        $(element).wysiwyg('shell').insertHTML(imagehtml); // .closePopup(); - do not close the popup
                                    })
                                    .appendTo( $smilies );
                            });
                            var $container = $(element).wysiwyg('container');
                            $smilies.css({ maxWidth: parseInt($container.width()*0.95)+'px' });
                            $popup.append( $smilies );
                            // Smilies do not close on click, so force the popup-position to cover the toolbar
                            var $toolbar = $button.parents( '.wysiwyg-toolbar' );
                            if( ! $toolbar.length ) // selection toolbar?
                                return ;
                            return { // this prevents applying default position
                                left: parseInt( ($toolbar.outerWidth() - $popup.outerWidth()) / 2 ),
                                top: $toolbar.hasClass('wysiwyg-toolbar-bottom') ? ($container.outerHeight() - parseInt($button.outerHeight()/4)) : (parseInt($button.outerHeight()/4) - $popup.height())
                            };
                           },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: index == 2 ? true : false    // wanted on selection
                },
                insertimage: {
                    title: 'Insert image',
                    image: '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    //showselection: index == 2 ? true : false    // wanted on selection
                },/*
                insertvideo: {
                    title: 'Insert video',
                    image: '\uf03d', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: index == 2 ? true : false    // wanted on selection
                },*/
                insertlink: {
                    title: 'Insert link',
                    image: '\uf08e' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                // Fontname plugin
                fontname: index == 1 ? false : {
                    title: 'Font',
                    image: '\uf031', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    popup: function( $popup, $button ) {
                            var list_fontnames = {
                                    // Name : Font
                                    'Arial, Helvetica' : 'Arial,Helvetica',
                                    'Verdana'          : 'Verdana,Geneva',
                                    'Georgia'          : 'Georgia',
                                    'Courier New'      : 'Courier New,Courier',
                                    'Times New Roman'  : 'Times New Roman,Times'
                                };
                            var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                   .attr('unselectable','on');
                            $.each( list_fontnames, function( name, font ) {
                                var $link = $('<a/>').attr('href','#')
                                                    .css( 'font-family', font )
                                                    .html( name )
                                                    .click(function(event) {
                                                        $(element).wysiwyg('shell').fontName(font).closePopup();
                                                        // prevent link-href-#
                                                        event.stopPropagation();
                                                        event.preventDefault();
                                                        return false;
                                                    });
                                $list.append( $link );
                            });
                            $popup.append( $list );
                           },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: index == 0 ? true : false    // wanted on selection
                },
                // Fontsize plugin
                fontsize: index != 1 ? false : {
                    title: 'Size',
                    style: 'color:white;background:red',      // you can pass any property - example: "style"
                    image: '\uf034', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    popup: function( $popup, $button ) {
                            // Hack: http://stackoverflow.com/questions/5868295/document-execcommand-fontsize-in-pixels/5870603#5870603
                            var list_fontsizes = [];
                            for( var i=8; i <= 11; ++i )
                                list_fontsizes.push(i+'px');
                            for( var i=12; i <= 28; i+=2 )
                                list_fontsizes.push(i+'px');
                            list_fontsizes.push('36px');
                            list_fontsizes.push('48px');
                            list_fontsizes.push('72px');
                            var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                   .attr('unselectable','on');
                            $.each( list_fontsizes, function( index, size ) {
                                var $link = $('<a/>').attr('href','#')
                                                    .html( size )
                                                    .click(function(event) {
                                                        $(element).wysiwyg('shell').fontSize(7).closePopup();
                                                        $(element).wysiwyg('container')
                                                                .find('font[size=7]')
                                                                .removeAttr("size")
                                                                .css("font-size", size);
                                                        // prevent link-href-#
                                                        event.stopPropagation();
                                                        event.preventDefault();
                                                        return false;
                                                    });
                                $list.append( $link );
                            });
                            $popup.append( $list );
                           }
                    //showstatic: true,    // wanted on the toolbar
                    //showselection: true    // wanted on selection
                },
                // Header plugin
                header: index != 1 ? false : {
                    title: 'Header',
                    style: 'color:white;background:blue',      // you can pass any property - example: "style"
                    image: '\uf1dc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    popup: function( $popup, $button ) {
                            var list_headers = {
                                    // Name : Font
                                    'Header 1' : '<h1>',
                                    'Header 2' : '<h2>',
                                    'Header 3' : '<h3>',
                                    'Header 4' : '<h4>',
                                    'Header 5' : '<h5>',
                                    'Header 6' : '<h6>',
                                    'Code'     : '<pre>'
                                };
                            var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                   .attr('unselectable','on');
                            $.each( list_headers, function( name, format ) {
                                var $link = $('<a/>').attr('href','#')
                                                     .css( 'font-family', format )
                                                     .html( name )
                                                     .click(function(event) {
                                                        $(element).wysiwyg('shell').format(format).closePopup();
                                                        // prevent link-href-#
                                                        event.stopPropagation();
                                                        event.preventDefault();
                                                        return false;
                                                    });
                                $list.append( $link );
                            });
                            $popup.append( $list );
                           }
                    //showstatic: true,    // wanted on the toolbar
                    //showselection: false    // wanted on selection
                },
                bold: {
                    title: 'Bold (Ctrl+B)',
                    image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    hotkey: 'b'
                },
                italic: {
                    title: 'Italic (Ctrl+I)',
                    image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    hotkey: 'i'
                },
                underline: {
                    title: 'Underline (Ctrl+U)',
                    image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    hotkey: 'u'
                },
                strikethrough: {
                    title: 'Strikethrough (Ctrl+S)',
                    image: '\uf0cc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    hotkey: 's'
                },
                forecolor: {
                    title: 'Text color',
                    image: '\uf1fc' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                highlight: {
                    title: 'Background color',
                    image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                alignleft: index != 0 ? false : {
                    title: 'Left',
                    image: '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                aligncenter: index != 0 ? false : {
                    title: 'Center',
                    image: '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                alignright: index != 0 ? false : {
                    title: 'Right',
                    image: '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                alignjustify: index != 0 ? false : {
                    title: 'Justify',
                    image: '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                subscript: index == 1 ? false : {
                    title: 'Subscript',
                    image: '\uf12c', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true    // wanted on selection
                },
                superscript: index == 1 ? false : {
                    title: 'Superscript',
                    image: '\uf12b', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true    // wanted on selection
                },
                indent: index != 0 ? false : {
                    title: 'Indent',
                    image: '\uf03c', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                outdent: index != 0 ? false : {
                    title: 'Outdent',
                    image: '\uf03b', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                orderedList: index != 0 ? false : {
                    title: 'Ordered list',
                    image: '\uf0cb', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                unorderedList: index != 0 ? false : {
                    title: 'Unordered list',
                    image: '\uf0ca', // <img src="path/to/image.png" width="16" height="16" alt="" />
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false    // wanted on selection
                },
                removeformat: {
                    title: 'Remove format',
                    image: '\uf12d' // <img src="path/to/image.png" width="16" height="16" alt="" />
                }
            },
            // Submit-Button
            submit: {
                title: 'Submit',
                image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
            },
            // Other properties
            selectImage: '选择或拖放图片',
            placeholderUrl: '填入网络地址..(www.example.com/...))',
            placeholderEmbed: '<embed/>',
            maxImageSize: [600,200],
            //filterImageType: callback( file ) {},
            onKeyDown: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                            // E.g.: submit form on enter-key:
                            //if( (key == 10 || key == 13) && !shiftKey && !altKey && !ctrlKey && !metaKey ) {
                            //    submit_form();
                            //    return false; // swallow enter
                            //}
                        },
            onKeyPress: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        },
            onKeyUp: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        },
            onAutocomplete: function( typed, key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                            if( typed.indexOf('@') == 0 ) // startswith '@'
                            {
                                var usernames = [
                                        'Evelyn',
                                        'Harry',
                                        'Amelia',
                                        'Oliver',
                                        'Isabelle',
                                        'Eddie',
                                        'Editha',
                                        'Jacob',
                                        'Emily',
                                        'George',
                                        'Edison'
                                    ];
                                var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                       .attr('unselectable','on');
                                $.each( usernames, function( index, username ) {
                                    if( username.toLowerCase().indexOf(typed.substring(1).toLowerCase()) !== 0 ) // don't count first character '@'
                                        return;
                                    var $link = $('<a/>').attr('href','#')
                                                        .text( username )
                                                        .click(function(event) {
                                                            var url = 'http://example.com/user/' + username,
                                                                html = '<a href="' + url + '">@' + username + '</a> ';
                                                            var editor = $(element).wysiwyg('shell');
                                                            // Expand selection and set inject HTML
                                                            editor.expandSelection( typed.length, 0 ).insertHTML( html );
                                                            editor.closePopup().getElement().focus();
                                                            // prevent link-href-#
                                                            event.stopPropagation();
                                                            event.preventDefault();
                                                            return false;
                                                        });
                                    $list.append( $link );
                                });
                                if( $list.children().length )
                                {
                                    if( key == 13 )
                                    {
                                        $list.children(':first').click();
                                        return false; // swallow enter
                                    }
                                    // Show popup
                                    else if( character || key == 8 )
                                        return $list;
                                }
                            }
                        },
            onImageUpload: function( insert_image ) {
                            // A bit tricky, because we can't easily upload a file via
                            // '$.ajax()' on a legacy browser without XMLHttpRequest2.
                            // You have to submit the form into an '<iframe/>' element.
                            // Call 'insert_image(url)' as soon as the file is online
                            // and the URL is available.
                            // Example server script (written in PHP):
                            /*
                            <?php
                            $upload = $_FILES['upload-filename'];
                            // Crucial: Forbid code files
                            $file_extension = pathinfo( $upload['name'], PATHINFO_EXTENSION );
                            if( $file_extension != 'jpeg' && $file_extension != 'jpg' && $file_extension != 'png' && $file_extension != 'gif' )
                                die("Wrong file extension.");
                            $filename = 'image-'.md5(microtime(true)).'.'.$file_extension;
                            $filepath = '/path/to/'.$filename;
                            $serverpath = 'http://domain.com/path/to/'.$filename;
                            move_uploaded_file( $upload['tmp_name'], $filepath );
                            echo $serverpath;
                            */
                            // Example client script (without upload-progressbar):
                            console.log(insert_image);
                            var iframe_name = 'legacy-uploader-' + Math.random().toString(36).substring(2);
                            $('<iframe style="display:none">').attr('name',iframe_name)
                                         .load(function() {
                                            // <iframe> is ready - we will find the URL in the iframe-body
                                            var iframe = this;
                                            var iframedoc = iframe.contentDocument ? iframe.contentDocument :
                                                           (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
                                            var iframebody = iframedoc.getElementsByTagName('body')[0];
                                            var image_url = iframebody.innerHTML;
											console.log(image_url);
                                            insert_image( image_url );
                                            //$(iframe).remove();
                                         })
                                         .appendTo($("body"));
                            var input = $(this);
							
                            input.attr('name','file')
                                  .parents('form')
                                  .attr('action','/upimg/upload_file.php') // accessing cross domain <iframes> could be difficult
                                  .attr('method','POST')
                                  .attr('enctype','multipart/form-data')
                                  .attr('target',iframe_name)
                                  .submit();
							console.log(input);
							console.log(input.parents('form'));
                        },
            forceImageUpload: true,    // upload images even if File-API is present
            videoFromUrl: function( url ) {
                // Contributions are welcome :-)

                // youtube - http://stackoverflow.com/questions/3392993/php-regex-to-get-youtube-video-id
                var youtube_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?(?:youtu\.be|youtube\.com)\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/)([^\?&\"'>]+)/ );
                if( youtube_match && youtube_match[1].length == 11 )
                    return '<iframe src="//www.youtube.com/embed/' + youtube_match[1] + '" width="640" height="360" frameborder="0" allowfullscreen></iframe>';

                // vimeo - http://embedresponsively.com/
                var vimeo_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?vimeo\.com\/([0-9]+)$/ );
                if( vimeo_match )
                    return '<iframe src="//player.vimeo.com/video/' + vimeo_match[1] + '" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

                // dailymotion - http://embedresponsively.com/
                var dailymotion_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?dailymotion\.com\/video\/([0-9a-z]+)$/ );
                if( dailymotion_match )
                    return '<iframe src="//www.dailymotion.com/embed/video/' + dailymotion_match[1] + '" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

                // undefined -> create '<video/>' tag
            }
        });
       
}
