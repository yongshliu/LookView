//$(window).load(initForm);

var page_info_obj = 0;
var page_my_comments = 0;
var page_my_favorates = 0;
var page_my_follows = 0;
var page_my_execheader = 0;
var page_my_profile = 0;

function debug(text){
	util_debug(text);
}
function cb_juser(type){
	if( type == "session"){
		if( page_user ){
					
		}
		else{
		
		}
	}
	if( page_user && page_info_obj  && !page_info_obj.tuser){
		page_info_obj.tuser = page_user;
		display(page_info_obj.action);

	}

}
var contents_idx = ["profile", "comments", "favorates", "follows", "flowchart"];
var contents_obj = new Object();
var fc_visitor_favored = 0;
var fc_visitor_gifted = 0;
$(document).ready(function(){
	jutil_init(cb_juser);
	page_info_obj = eval(user_page_info);
	if( page_user && !page_info_obj.tuser)
		page_info_obj.tuser = page_user;
	if( ! page_info_obj.tuser )
		ask_login();
	if( page_info_obj.tuser != page_user){
		check_fan();
		
	}
	$("body").on("click", ".user-item", contents_idx , function(e){
		$(".active").removeClass("active");
		//util_debug($(this).text());
		for(i=0;i<e.data.length;i++){
			if( $(this).hasClass(e.data[i])){
				display(e.data[i]);
				$(".nav-pills li:eq("+i+")").addClass("active");
				break;
			}
		}
	});
	$("body").on("mouseenter", ".user-coms", function(e){
		$(this).find(".com-cmd").addClass("active");
	});
	$("body").on("mouseleave", ".user-coms", function(e){
		$(this).find(".com-cmd").removeClass("active");
	});
	$("body").on("mouseenter", ".user-flowchart", function(e){
		$(this).find(".flowchart-cmd").addClass("active");
	});
	$("body").on("mouseleave", ".user-flowchart", function(e){
		$(this).find(".flowchart-cmd").removeClass("active");
	});
	$("body").on("mouseenter", ".user-follows", function(e){
		$(this).find(".follows-cmd").addClass("active");
	});
	$("body").on("mouseleave", ".user-follows", function(e){
		$(this).find(".follows-cmd").removeClass("active");
	});
	$("body").on("mouseenter", ".user-fc-title", function(e){
		$(this).find(".fc-new-cmd").addClass("active");
	});
	$("body").on("mouseleave", ".user-fc-title", function(e){
		$(this).find(".fc-new-cmd").removeClass("active");
	});
	
	show_profile(function(){
		//util_debug(page_info_obj);
		for(i=0; i<contents_idx.length;i++){
			if( contents_idx[i]==page_info_obj.action ){
				$("."+contents_idx[i]).trigger("click");
				return;
			}
		}
		display(page_info_obj.action);

	});
	$("body").on("click", "#sig-edit-ok", function(e){
		save_sig_editor();
	});
	$("body").on("click", function(e){
		on_user_page_click($(this), e);
	});

});
function check_fan(){
	var url = "/index.php?c=com&a=checkfaned";
	url += "&tuserid="+page_info_obj.tuserid;
	$.post(url, function(data){
		if( is_json_str(data) ){
			dataobj = eval(data);
			//util_debug(dataobj);
			if( dataobj.err == 0 )
				update_fan_state(dataobj.ret.followed);
		}
	});
}
function update_fan_state(faned){
	if( faned ){
		$(".ufu-fan").addClass("lv-hide");
		$(".ufu-unfan").removeClass("lv-hide");
	}else{
		$(".ufu-unfan").addClass("lv-hide");
		$(".ufu-fan").removeClass("lv-hide");
	}
	
}
function on_user_page_click(tar, e){
	ctl = $(e.target);
	if( ctl.hasClass("no-long-des")){
		ctl.addClass("lv-hide");
		$(".long-des-edit").removeClass("lv-hide");
	}else if(ctl.hasClass("long-des-edit-ok")){
		text =$("#long-des-input").val();
		if( text === page_my_profile.longdes ){
			$(".long-des-conts span").text(text);
			$(".long-des-edit").addClass("lv-hide");
			$(".long-des-conts").removeClass("lv-hide");;
			return;
		}
		url = '/index.php?c=user&a=updateprofile';
		url += '&userid='+page_my_profile.id;
		url += '&longdes='+text;
		$.post(url, function(data){
			if( is_json_str(data)){
				retobj = eval(data);
				if( retobj.err == 0 ){
					page_my_profile.longdes = text;
					$(".long-des-conts span").text(text);
					$(".long-des-edit").addClass("lv-hide");
					$(".long-des-conts").removeClass("lv-hide");;
						
				}
			}
			
		});
 
	}else if(ctl.hasClass("to_change_longdes")){
		e.preventDefault();
		$("#long-des-input").val(page_my_profile.longdes);
		$(".long-des-conts").addClass("lv-hide");
		$(".long-des-edit").removeClass("lv-hide");

	}
	if( page_user != page_info_obj.tuser){
		if( ctl.hasClass("ufu-fan") ){
			url = '/index.php?c=com&a=makefollow';
			url += '&tuserid='+page_info_obj.tuserid;
			$.post(url, function(data){
				if( is_json_str(data)){
					dataobj = eval(data);
					if( dataobj.err == 0 )
						update_fan_state(dataobj.ret.followed);
				}	
			});
		}else if (ctl.hasClass("ufu-unfan")){
			url = '/index.php?c=com&a=delfollow';
			url += '&tuserid='+page_info_obj.tuserid;
			$.post(url, function(data){
				if( is_json_str(data)){
					dataobj = eval(data);
					if( dataobj.err == 0 )
						update_fan_state(dataobj.ret.followed);
				}	
			});
	
		}
	}
}
function display(what){
	//util_debug(what);
	if( contents_obj ){
		;	
	}
	if( what == "comments" ){
		on_comments();
	}
	else if(what == "favorates" ){
		on_favorates();
	}
	else if( what == "follows"){
		on_follow();
	}
	else if( what == "flowchart"){
		on_exec();		
	}
	else{
		show_main();		
	}

}
function save_sig_editor(){
	text = $("#shor-des-input").val();
	if( text === page_my_profile.shortdes){
		$(".short-des-conts span").text(text);
		$(".short-des-edit").addClass("lv-hide");
		$(".short-des-conts").removeClass("lv-hide");
		return;
	}
	if( text != ""){
		url = '/index.php?c=user&a=updateprofile';
		url += '&userid='+page_my_profile.id;
		url += '&shortdes='+text;
		$.post(url, function(data){
			if( is_json_str(data)){
				retobj = eval(data);
				if( retobj.err == 0 ){
					page_my_profile.shortdes = text;
					$(".short-des-conts span").text(text);
					$(".short-des-edit").addClass("lv-hide");
					$(".short-des-conts").removeClass("lv-hide");;
						
				}
			}
			
		});
}
}
function handle_item(e){
	$(".active").removeClass("active");
	//util_debug($(this).text());
	$(this).siblings("li").addClass("active");
	//util_debug(e.data[0]);
	for(i=0;i<e.data.length;i++){
		if( $().hasClass(e.data[i]))
			update(e.data.length[i]);
	}
}
function show_main(){
	if( !page_my_profile )
		return;
	title = '<span class="lead user-fc-title">'+page_info_obj.tuser+'';
	$(".title").html(title);
	html = '<div class="row">';
	html += '<div class="col-md-2">被关注</span></div>';
	html += '<div class="col-md-2"><span class="label label-success">'+page_my_profile.byfollowtotal+'</span></div>';
	html += '</div><div class="row">';
	html += '<div class="col-md-2">评论被赞</span></div>';
	html += '<div class="col-md-2"><span class="label label-success">'+page_my_profile.combeliked+'</span></div>';
	html += '</div><div class="row">';
	html += '<div class="col-md-2">评论被收藏</span></div>';
	html += '<div class="col-md-2"><span class="label label-success">'+page_my_profile.byfavortotal+'</span></div>';
	html += '</div><div class="row">';
	html += '<div class="col-md-2">流程被赞</span></div>';
	html += '<div class="col-md-2"><span class="label label-success">'+page_my_profile.flowchartliked+'</span></div>';
	html += '</div><div class="row">';
	html += '<div class="col-md-2">流程被收藏</span></div>';
	html += '<div class="col-md-2"><span class="label label-success">'+page_my_profile.flowchartfavored+'</span></div>';
	html += '</div>';

	$(".contents").html(html);
	

}
function on_my_profile(ctl){
	indicate_loading();
}
function show_profile(func){
	if( !page_info_obj.tuser ){
		//util_debug("need a target user");
		return;
	}
	url = '/index.php?c=user&a=getprofile';
	url += '&tuser='+page_info_obj.tuser;
	$.post(url, function(data){
		debug(data);
		if(is_json_str(data)){
			ret_obj = eval(data);
			if( ret_obj.err != 0){
				if( ret_obj.code == -33 ){
					user_login(show_my_profile);	
				}
				return;
			}
			page_my_profile = ret_obj.ret;
			//util_debug(page_my_profile);
			$(".comments span").text(page_my_profile.comtotal);
			$(".favorates span").text(page_my_profile.favortotal);
			$(".follows span").text(page_my_profile.followtotal);
			$(".flowchart span").text(page_my_profile.execflowtotal);
			$(".user-id-name").text(page_my_profile.username);
			$(".up-email").text(page_my_profile.emailaddr);
			if( page_user!=page_info_obj.tuser ){
				if( page_my_profile.shortdes=="" )
					page_my_profile.shortdes="空";
				if( page_my_profile.longdes == "" )
					page_my_profile.longdes = "我是一片云，不留下任何色彩。";
				$(".to_change_sig").css("display", "none");
				$(".to_change_longdes").css("display", "none");
				$(".up-email").addClass("lv-hide");
				$(".user-follow-up").removeClass("lv-hide");
				$("body").on("click", "user-follow-up span", function(e){
					e.preventDefault();
					handle_user_follow($(this));
				});
				
			}
			if( page_my_profile.shortdes != ""){
				$(".short-des-conts").removeClass("lv-hide").find("span").text(page_my_profile.shortdes);
			}else{
				$(".no-short-des").removeClass("lv-hide");
			}
			if( page_my_profile.city != "")
				$(".city-business .city").text(page_my_profile.city);
			if( page_my_profile.business != "")
				$(".city-business .business").text(page_my_profile.business);
			if( page_my_profile.longdes!=""){
				$(".long-des-conts span").text(page_my_profile.longdes);
				$(".no-long-des").addClass("lv-hide");
				$(".long-des-conts").removeClass("lv-hide");
			}	
			$("body").on("click", ".short-des-item", function(e){
				//util_debug("user-short-des click");
				handle_signature($(this));
			});
			$("body").on("click", ".to_change_sig", function(e){
				e.preventDefault();
				if( page_my_profile )
					$("#shor-des-input").val(page_my_profile.shortdes);
				$(".short-des-edit").removeClass("lv-hide");
				$(".short-des-item").addClass("lv-hide");
				
			});

		}
		if(func)
			func();
	});	
	
}
function handle_user_follow(ctl){
}
function handle_signature(ctl){
	if( ctl.hasClass("no-short-des")){
		//util_debug("no-short-des");
		ctl.addClass("lv-hide");
		$(".short-des-edit").removeClass("lv-hide");
	}
}
function on_comments(ctl){
	indicate_loading();
	show_comments();
}
function make_com_cmd(){
	if( page_info_obj.tuser == page_user){
		return "";
	}
	html = '<div class="btn-group com-cmd" role="group" aria-label="...">';
	html += '<button type="button" class="btn btn-default" onclick=com_edit(this)>Favorate</button>';
	html += '<button type="button" class="btn btn-default" onclick=com_del(this)>Like</button>';
	html += '</div>';
	return html;
}
function show_comments(){
	url = '/index.php?c=com&a=getcommentsuser_json';
	url += '&tuser=' + page_info_obj.tuser;
	fresh_mycomments(function(ret_obj){
		page_my_comments = ret_obj;
		title = "<span class=lead >"+page_info_obj.tuser+'的评论   </span><span class=badge>'+ret_obj.length+'</span>';
		$(".title").html(title);
		html = '';
		//util_debug(ret_obj);
		for(i=0;page_my_comments[i];i++){
			href = '/page.php?page=/'+ page_my_comments[i]["topdir"] + '/'+page_my_comments[i]["filename"] +'#line'+page_my_comments[i]["lineno"];
			html += '<div class="list-group-item user-coms" data-info="'+make_str_json(page_my_comments[i])+'">'   	
			html += '<div class=mixin ><h4><a href="'+href+'">'+util_unescape(page_my_comments[i]["comments"])+'</a></h4></div>';
			html += '<div><h5><small>'+page_my_comments[i]["topdir"]+' . '+page_my_comments[i]["filename"]+' . '+page_my_comments[i]["lineno"]+'</small>';
			html += make_com_cmd();
			html += '</h5></div>';
			html += '</div>';
		}
		$(".contents").html(html);

	});
	
}
function fresh_mycomments(func){
	url = '/index.php?c=com&a=getcommentsuser_json';
	url += '&tuser='+page_info_obj.tuser;
	$.post(url, function(data){
		debug(data);
		if(is_json_str(data)){
			ret_obj = eval(data);
			if( ret_obj.err != 0){
				return;
			}
			if( func )
				func(ret_obj.ret);
		}
	});

}
function on_favorates(ctl){
	indicate_loading();
	
	show_favorates();
}
function show_favorates(){
	fresh_favors(function(data){
		//util_debug(data);
		title = "<span class=lead >"+page_info_obj.tuser+'的收藏  </span><span class=badge>'+data.length+'</span>';
		$(".title").html(title);
		html = "";
		for(i=0;data[i];i++){
			//util_debug(typeof data[i]["project"]);
			if (typeof data[i]["topdir"] == undefined ){
				href = '/page.php?page='+ get_project_topdir(data[i]["project"]) + '/'+data[i]["file"] +'#line'+data[i]["lineno"];
			}else{
				href = '/page.php?page=/'+ data[i]["topdir"] + '/'+data[i]["file"] +'#line'+data[i]["lineno"];
			}
			html += '<div class="list-group-item user-favors" data-info="'+make_str_json(data[i])+'">'   	
			html += '<div class=mixin ><h4><a href="'+href+'">'+data[i]["comments"]+'</a></h4></div>';
			html += '<div><h5><small>'+data[i]["project"]+' . '+data[i]["file"]+' . '+data[i]["lineno"]+'</small>';
			html += '</h5></div>';
			html += '</div>';
		}
		$(".contents").html(html);
	});

}
function fresh_favors(func){
	url = '/index.php?c=com&a=getfavorcombyuser';
	url += '&tuser='+page_info_obj.tuser;
	$.post(url, function(data){
		debug(data);
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
function on_follow(ctl){
	indicate_loading();
	fetch_follows();
		
}	

function fetch_follows(){
	url = '/index.php?c=com&a=getfollowee';
	url += '&followerid=' + page_info_obj.tuserid;
	
	$.post(url, function(data){
		//util_debug(data);		
		if(is_json_str(data)){
			ret_obj = eval(data);
			if( ret_obj.err == 0){
				page_my_follows = ret_obj.ret;
				show_follows(page_my_follows);
				return;

			}
		}
		show_follows(0);
			
	});

}
function show_follows(data){
	title = "<span class=lead >"+page_info_obj.tuser+' 所关注的 </span>';	
	html ="";
	if( !data ){
		title += '<span class=badge>0</span>';
		$(".title").html(title);
		$(".contents").html("");
		return;
	
	}else{
		title += '<span class=badge>'+data.length+'</span>';
		$(".title").html(title);
	}
	for(i=0;data[i];i++){
		href = '/user.php?tuser=';
		html += '<div class="list-group-item user-follows" data-info="'+make_str_json(data[i])+'">'   	
		html += '<div class=mixin ><h4><a href="'+href+data[i]["tuser"]+'">'+data[i]["tuser"]+'</a></h4></div>';
		html += '<div><h6><small>'+data[i]["time"];
		if( page_info_obj.tuser == page_user){
			html += '<div class="btn-group follows-cmd" role="group" aria-label="...">';
			html += '<button type="button" class="btn btn-default" onclick=follows_delete(this)>取消关注</button>';
			html += '</div>';

		}
		html += '</small></h6></div>';
		html += '</div>';

	}
	$(".contents").html(html);
	
}
function fetch_fc_favor_i_did(func){
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=visit';
	url += '&type=fcf';
	url += '&tuser='+page_info_obj.tuser;
	$.post(url, function(data){
		if( is_json_str(data) ){
			obj = eval(data);
			if( obj.err== 0 )
				fc_visitor_favored = obj.ret;	
		}
		if(func)
			func(data);
	});

}
function fetch_fc_gift_i_did(func){
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=visit';
	url += '&tuser='+page_info_obj.tuser;
	$.post(url, function(data){
		if( is_json_str(data) ){
			obj = eval(data);
			if( obj.err== 0 )
				fc_visitor_gifted = obj.ret;	
		}
		if(func)
			func(data);
	});

}
function fetch_exec_header(func){
	if( page_my_execheader ){
		if( func )
			func(page_my_execheader);
	}
 		
	//var url = '/index.php?c=user&a=getexecnamebyuser';
	var url = '/index.php?c=user&a=getfcallbyuserid';
	url += '&tuser='+page_info_obj.tuserid;
	$.post(url, function(data){
		//console.debug(data);
		if( is_json_str(data) ){
			data_obj = eval(data);
			if( data_obj.err == 0 || data_obj.code==-6 ){
				page_my_execheader = data_obj.ret;
			}
		}
		if( func )
			func(page_my_execheader);
	});
}
function on_del_execheader(ctl){
	var data_info = $(ctl).parents(".exec_header_del").siblings(".uc_exec").attr("data-info");
	var data_obj = eval(data_info);
	//url = '/index.php?c=user&a=delexecheaderbyid';
	var url = '/index.php?c=user&a=delfc';
	url += '&id='+data_obj.id;
	if( confirm("are you sure to delete this?")){
		$.post(url, function(data){
			console.debug(data);
			on_my_exec(0);	
		});
	}	

}
function on_execheader(ctl){

	data_info = $(ctl).parents(".uc_exec").attr("data-info");
	data_obj = eval(data_info);
	show_execpath(data_obj);
}
function show_execpath(header_obj){
	targeturl = '/execpath.php?execid='+header_obj.id;
	location.href=targeturl;
	return;


}
function on_exec(){
	indicate_loading();
	if( page_user && page_user!=page_info_obj.tuser){
		fetch_fc_favor_i_did(function(data){
			//util_debug(data);
			fetch_fc_gift_i_did(function(data){
				fetch_exec_header(show_my_exec);	
			});
		});
	}else{
		fetch_exec_header(show_my_exec);
	}
	
}
function get_fc_favored(fcid){
	var i=0;
	if( fc_visitor_favored ){
		for(i=0;i<fc_visitor_favored.length;i++){
			if( fc_visitor_favored[i].flowchartid==fcid )
				return fc_visitor_favored[i];
		}
	}
	return 0;
}
function get_fc_gifted(fcid){
	var i=0;
	if( fc_visitor_gifted ){
		for(i=0;i<fc_visitor_gifted.length;i++){
			if( fc_visitor_gifted[i].flowchartid==fcid )
				return fc_visitor_gifted[i];
		}
	}
	return 0;
}
function make_flowchart_cmd(fcid){
	html = '<div class="btn-group flowchart-cmd" role="group" aria-label="...">';
	if( page_info_obj.tuser == page_user ){
		html += '<span class="hypertext" onclick=flowchart_delete(this)>删除</span>';
	}else{
		if( page_user ){
			if( get_fc_gifted(fcid) )
				html += '<span class="hypertext" onclick=flowchart_unlike(this)>取消赞</span>';
			else
				html += '<span class="hypertext" onclick=flowchart_like(this)>赞</span>';
			if( get_fc_favored(fcid) )
				html += '<span class="hypertext" onclick=flowchart_unfavor(this)>取消收藏</span>';
			else 
				html += '<span class="hypertext" onclick=flowchart_favor(this)>收藏</span>';
		}
	}
	html += '</div>';
	return html;

}	
function show_my_exec(exec_obj){
	//util_debug("show_my_exec");
	//util_debug(exec_obj);
	title = '<span class="lead user-fc-title">'+page_info_obj.tuser+'的程序流程 ';
	if( page_info_obj.tuser == page_user){
		title += '<div class="btn-group fc-new-cmd" role="group" aria-label="...">';
		title += '<button type="button" class="btn btn-default" onclick=on_newexec(this)>添加新流程</button>';
		title += '</div>';
	}
	title += '</span><span class=badge>'+exec_obj.length+'</span>';
	if( page_my_profile.execflowtotal != exec_obj.length ){
		page_my_profile.execflowtotal = exec_obj.length;
		$(".flowchart span").text(page_my_profile.execflowtotal);
	}
	
	$(".title").html(title);
	html ="";
	//util_debug(exec_obj);
	for(i=0;i<exec_obj.length;i++){
		html += '<div class="list-group-item user-flowchart" data-info="'+make_str_json(exec_obj[i])+'">'   	
		html += '<div class=mixin ><h4><a href="/fc.php?id='+exec_obj[i]["id"]+'">'+util_unescape(exec_obj[i]["name"])+'</a></h4></div>';
		html += '<div><h7><small>Description:'+util_unescape(exec_obj[i]["des"])+'</small></h7></div>';
		html += '<div class="fctime"><span>'+exec_obj[i]["time"]+'</span></div>';
		html += make_flowchart_cmd(exec_obj[i]["id"]);	
		html += '</div>';

	}	
	$(".contents").html(html);

}
function del_a_fowchart(ok, id){
	//util_debug("del_a_fowchart:"+ok+"datainfo:"+id);
	//url = '/index.php?c=user&a=delexecheaderbyid';
	var url = '/index.php?c=user&a=delfc';
	url += '&id='+id;
	$.post(url, function(data){
		if( is_json_str(data)){
			if( eval(data).err == 0){
				if( page_my_execheader ){
					for(i=0;i<page_my_execheader.length;i++){
						if( page_my_execheader[i].id == id ){
							//util_debug("found id:"+id+":"+i);
							page_my_execheader.splice(i,1);
							break;
						}
					}
				}
				fetch_exec_header(show_my_exec);
	
			}
		}	
	});
}
function flowchart_unlike(ctl){
	fcinfo = $(ctl).parents(".user-flowchart").attr("data-info");
	likeobj = get_fc_gifted(eval(fcinfo).id)
	if( !likeobj )
		return;
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=del';
	url += '&id='+likeobj.id;
	$.post(url, function(data){
		//util_debug("fc unlike:"+data);
		if(is_json_right(data, 0))
			on_exec();
	});

}
function flowchart_like(ctl){
	fcinfo = $(ctl).parents(".user-flowchart").attr("data-info");
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=add';
	url += '&fcid='+eval(fcinfo).id;
	$.post(url, function(data){
		//util_debug("fc unlike:"+data);
		if(is_json_right(data, 0))
			on_exec();
	});

}
function flowchart_unfavor(ctl){
	fcinfo = $(ctl).parents(".user-flowchart").attr("data-info");
	favorobj = get_fc_favored(eval(fcinfo).id);
	if( !favorobj )
		return;
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=del';
	url += '&type=fcf';
	url += '&id='+favorobj.id;
	$.post(url, function(data){
		//util_debug("fc favor:"+data);
		if(is_json_right(data, 0))
			on_exec();
	});

}
function flowchart_favor(ctl){
	fcinfo = $(ctl).parents(".user-flowchart").attr("data-info");
	url = '/index.php?c=com&a=operatefcgf';
	url += '&op=add';
	url += '&type=fcf';
	url += '&fcid='+eval(fcinfo).id;
	$.post(url, function(data){
		//util_debug("fc favor:"+data);
		if(is_json_right(data, 0))
			on_exec();
	});

} 
function flowchart_delete(ctl){
	fcinfo = $(ctl).parents(".user-flowchart").attr("data-info");
	if (!fcinfo){
		//util_debug("can find flow-chart data-info");
		return;
	}
	util_dialog("Delete", "are you sure to delete this flow-chart?", "del_a_fowchart", eval(fcinfo).id);
	
}
function on_newexec(ctl){
/*
	html = '<div class="uc_wrapper">';
	html += '<div><input type="text" id="input_exec_name"></div>'
	html += '<div><textarea id="exec_des" placeholder="please input the description"></textarea></div>';
	html += '<div><span class="hypertext" onclick=on_submit_new_exec(this)>okay</span></div>';
	html += '</div>'; 
	$(".uc_wrapper").replaceWith(html);
*/	
	$("#input_exec_name").val("");
	$("#exec_des").val("");
	$("#input_exec_keyword").val("");

	
	$("#user-new-flowc").modal("show");
}
function on_submit_new_exec(ctl){
	//var url = '/index.php?c=user&a=makenewexecpath';
	var url = '/index.php?c=user&a=makenewfc';
	var name = util_escape($("#input_exec_name").val());
	var des = util_escape($("#exec_des").val());
	
	var keywords = $("#input_exec_keyword").val();
	$("#user-new-flowc").modal("hide");
	url += "&name="+name;
	url += "&des="+des;
	url += "&kw="+keywords;
	$.post(url, function(data){
	//$.post(url, {"name":name, "des":des, "kw":keywords}, function(data){
		console.debug(data);
		if( is_json_str(data) ){
			ret_obj = eval(data);
			if( ret_obj.err == 0 ){
				header_obj = ret_obj.ret;
				if( page_my_execheader )
					page_my_execheader.push(header_obj);
				}
				fetch_exec_header(show_my_exec);
		}
	});
}
function indicate_loading(text){
	html = '<div class="conts_loading">';
	if( text )
		html += '<span>'+text+'</span>';
	else
		html += '<span>Loading..</span>';
	html += '</div>'; 
	$(".contents").html(html);

	
}
function ask_login(){
	user_login(function(ret){
		if( ret.user!="" && ret.session!=""){
			display(page_info_obj.what);
		}
		else
			ask_login();
	});	
}


