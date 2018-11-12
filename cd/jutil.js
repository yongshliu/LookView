
var page_user = 0;
var page_user_id = 0;
var page_session = 0;
var pageinfo_obj = 0;
var foler_index_file_name =  "lv_tag_index.htm";
var util_cb = 0;
var util_main_projects_obj = 0;
function get_anchor(name){
	for(i=0;i<document.anchors.length;i++){
		if( document.anchors[i].name == name)
			return document.anchors[i];
	}
	return null;
}
var hashhandler=function(hash){ 
	util_debug("hash:"+hash);
	var target = get_anchor(hash.slice(1));//document.getElementById(hash.slice(1)); 
	util_debug(target);
	if (!target) return; 
	var targetOffset = $(target).offset().top-161;
	 $('html,body').animate({scrollTop: targetOffset}, 400); 
}

function util_set_cookie(name_json, expiredays){
	exdate = new Date();
	exdate.setTime(exdate.getTime() + expiredays*24*3600*1000);
	for(x in name_json){
		cookie = x + "=" + escape(name_json[x]);
		expiredays ==null ? "":cookie += ";expires="+exdate.toGMTString();
		document.cookie=cookie;
	}
	//document.cookie=cookie;
	
}
function util_del_cookie(name){
	util_set_cookie(eval('({'+name+':""})'), -1);
}
function is_json_right(str, err){
	if( is_json_str(str) ){
		if( eval(str).err == err )
			return 1;
	}
	return 0;
}
function is_json_str(str){
	json_check_match =/^\s*\([\{\[][\s\S]*[\]\}]\)\s*$/;
	return json_check_match.test(str);	
}

function util_get_cookie(name){
	if(document.cookie.length>0){
		cookies = document.cookie.split(";");
		for(i=0;i< cookies.length;i++){
			data = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
			if( data.indexOf(name) ==0 ){
				ret = cookies[i].split("=");
				if (ret.length==2)
					return unescape(ret[1]);
			}
		}

	}	
	return 0;
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);  
/** 
 * base64编码 
 * @param {Object} str 
 */  
function base64encode(str){  
    var out, i, len;  
    var c1, c2, c3;  
    len = str.length;  
    i = 0;  
    out = "";  
    while (i < len) {  
        c1 = str.charCodeAt(i++) & 0xff;  
        if (i == len) {  
            out += base64EncodeChars.charAt(c1 >> 2);  
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
            out += "==";  
            break;  
        }  
        c2 = str.charCodeAt(i++);  
        if (i == len) {  
            out += base64EncodeChars.charAt(c1 >> 2);  
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
            out += "=";  
            break;  
        }  
        c3 = str.charCodeAt(i++);  
        out += base64EncodeChars.charAt(c1 >> 2);  
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
        out += base64EncodeChars.charAt(c3 & 0x3F);  
    }  
    return out;  
}  
/** 
 * base64解码 
 * @param {Object} str 
 */  
function base64decode(str){  
    var c1, c2, c3, c4;  
    var i, len, out;  
    len = str.length;  
    i = 0;  
    out = "";  
    while (i < len) {  
        /* c1 */  
        do {  
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c1 == -1);  
        if (c1 == -1)   
            break;  
        /* c2 */  
        do {  
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c2 == -1);  
        if (c2 == -1)   
            break;  
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
        /* c3 */  
        do {  
            c3 = str.charCodeAt(i++) & 0xff;  
            if (c3 == 61)   
                return out;  
            c3 = base64DecodeChars[c3];  
        }  
        while (i < len && c3 == -1);  
        if (c3 == -1)   
            break;  
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
        /* c4 */  
        do {  
            c4 = str.charCodeAt(i++) & 0xff;  
            if (c4 == 61)   
                return out;  
            c4 = base64DecodeChars[c4];  
        }  
        while (i < len && c4 == -1);  
        if (c4 == -1)   
            break;  
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
    }  
    return out;  
}  
/** 
 * utf16转utf8 
 * @param {Object} str 
 */  
function utf16to8(str){  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for (i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if ((c >= 0x0001) && (c <= 0x007F)) {  
            out += str.charAt(i);  
        }  
        else   
            if (c > 0x07FF) {  
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
            else {  
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
    }  
    return out;  
}  
/** 
 * utf8转utf16 
 * @param {Object} str 
 */  
function utf8to16(str){  
    var out, i, len, c;  
    var char2, char3;  
    out = "";  
    len = str.length;  
    i = 0;  
    while (i < len) {  
        c = str.charCodeAt(i++);  
        switch (c >> 4) {  
            case 0:  
            case 1:  
            case 2:  
            case 3:  
            case 4:  
            case 5:  
            case 6:  
            case 7:  
                //i0xxxxxxx  
                out += str.charAt(i - 1);  
                break;  
            case 12:  
            case 13:  
                // 110x xxxx 10xx xxxx  
                char2 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
                break;  
            case 14:  
                // 1110 xxxx10xx xxxx10xx xxxx  
                char2 = str.charCodeAt(i++);  
                char3 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));  
                break;  
        }  
    }  
    return out;  
}  
function util_escape(str){
	if(str == "")return str;
	var utf8 = utf16to8(str);
	var ret = utf8.replace(/~/g, "~20");
	ret = ret.replace(/"/g, "~21");
	return ret.replace(/#/g, "~22");
/*	debug("escape");
	print_hex(str);
	var encoded = utf16to8(str);
	//var encoded = base64encode(utf16to8(str));
	print_hex(encoded);
	return encoded;
*/
}
function util_unescape(str){
	if(str == "")return str;
	var ret = str.replace(/~21/g, '"');
	ret = ret.replace(/~20/g, '~');
	return utf8to16(ret.replace(/~22/g,'#'));
/*
	debug("unexcape");
	print_hex(str);
	var unicode = utf8to16(str);
	//var unicode = utf8to16(base64decode(str));
	print_hex(unicode);
	return unicode;
*/
}
function print_hex(str){
	var ret = new Array();
	for(var i=0;i<str.length;i++){
		ret.push(str.charCodeAt(i).toString(16));
	}
	console.debug(ret.join(","));
}
function goto_url(url){
	if( !pageinfo_obj){
		return 0;
	}
	url = pageinfo_obj.base + url;
	window.location.href = url;	
	return;
	
}
function util_get(url, func){
	$.get(url, function(data){
		if( func )
			func(data);
	});
}
function make_str_json(json){
	str = "({";
	for(key in json){
		str += key+":'"+json[key]+"',";
	}
	str +="})";
	return str;
}
function on_login(){
	if(!$(this).hasClass("dropdown-toggle")){		
		user_login(function(ret){
			if(ret.user!="" && ret.session!=""){

		}
		});
	}
	else{
		//window.location.href = '/initphp-master/user.php?what=myprofile';
	}
}

function util_logout(){
	util_del_cookie("user");
	util_del_cookie("session");
	page_user = 0;
	page_user_id = 0;
	page_session = 0;
	$.post("/index.php?c=user&a=userlogout");
	if( util_cb )
		util_cb("session");
	user_ok(false);
}
function show_dialog(ctl){
	old_dialog = $(".modal");
	if( old_dialog.length>0)
		old_dialog.modal("hide");
	ctl.modal("show");
}
function hide_dialog(ctl){
	$(".modal").modal("hide");
}
function user_login(callback){
	util_debug("to show log in dialog");
	login_dialog=$("#login-dialog");
	if( login_dialog.length>0){
		show_dialog(login_dialog);
	}else{
		$.post("/jlogin.html", function(data){
			$("body").append($(data));
			show_dialog($("#login-dialog"));
			$("#form_login").submit(function(e){
				login_submit(e, callback);
			});
		});
	}

}
function on_login_close(ctl){
	$("#div_login").remove();
}
function login_submit(e,callback){
	username_check_regexp=/^([a-zA-Z_-])+([a-zA-Zd_-])*/;
	pwd_check_regexp=/(?=.*[0-9])(?=.*[^a-zA-Zd])(?=.*[a-zA-Z]).{6,30}/;
	e.preventDefault();
	username = $("#input_login_user").val();
	pwd = $("#input_login_pwd").val();
	util_debug(username + "+" + pwd);
	if( username=="" || !username_check_regexp.test(username)){
		$("#loging_indicator").text("the username is wrong");
		return false;
	}
	if( pwd == ""){
		$("#loging_indicator").text("you have to input password");
		return false;
	}

	url = '/index.php?c=user&a=userlogin';
	url += '&username='+username;
	url += '&pwd='+pwd;
	$("#loging_indicator").text("logging in...");
	ret = "";
	$.post(url, function(data){
		//data=data.replace(/(^\s*)|(\s*$)/g, "");
		util_debug(data);
		if( is_json_str(data) ){
			result = eval(data);
			if( result.err == 0 ){
				//$("#login").text(result.ret);
				// save the cookie
				util_set_cookie(result.ret, 14);
				page_user = result.ret.user;
				page_user_id = result.ret.userid
				page_session = result.ret.session;
				ret = result.ret;
				if( util_cb )
					util_cb("session");
				hide_dialog();
				user_ok(true);
				util_debug(document.cookie);
				//debug(user + ":" +session);
				
				
			
			}else{
				$("#loging_indicator").text("username or password is wrong,please input again!");
			} // not a json str 
		}
		else{
			ret = eval('({user:"", session:""})');
			util_debug("it's not a json return:" + data);
		}
		if(callback){
			callback(ret);
		}

	});
	return false;
 
}
function on_reg_open(ctl){
	if( $(this).hasClass("logout")){
		util_logout();
	}
	else{
		window.location.href='/jreg.php';
	}
}
function on_pwd_lost(ctl){
	window.location.href='/pwdlost.php';	
}
function jutil_init(cb){
	util_cb=cb;
        /*
	$(window).hashchange(function(){
            var target = $(location.hash);
            if(target.length==1){
                 var top = target.offset().top-101;
                 if(top > 0){
                     $('html,body').animate({scrollTop:top}, 1000);
                 }
             } 
        });
        $(window).hashchange();
	*/

}
;(function(){
	page_user = util_get_cookie("user");
	page_user_id = util_get_cookie("id");
	//console.log(page_user + ":"+page_user_id);
	if( suser && page_user != suser)
		page_user = suser;
	if( page_user ){
		user_ok(true);

	}
	//util_cb = cb;
	check_session();
	if( typeof page_info != undefined)
		pageinfo_obj = eval(page_info);
	$(".login").click(on_login);
	$("body").on("click", "#user-logout-btn", function(e){
		util_debug("to log out");
		util_logout();	
	});
	$("#register").click(on_reg_open);
	 $('[href^="#line"]').click(function(e){ 
		util_debug("local hash clicked:"+this.hash);
		e.preventDefault();
		hashhandler(this.hash) 
	}); 
	if( "onhashchange" in window ){
		window.onhashchange = function(){
			hashhandler(location.hash);
		};
	}
	if( typeof main_projects !== "undefined" ){
		util_main_projects_obj = eval(main_projects);
		if( util_main_projects_obj.err == 0){
			insert_projects_list(util_main_projects_obj.projects);
		}
	}
	$("body").on("click", ".idd-trigger", function(e){
		update_input_dropdown_menu($(this), $(this).val());
		$(this).parents(".input-dropdown").children(".input-dropdown-menu").css("display", "block");
	});
	$("body").on("keyup", ".idd-trigger", function(e){
		update_input_dropdown_menu($(this), $(this).val());
	});
	
	$("body").on("click", ".idm-close", function(e){
		$(this).parents(".input-dropdown-menu").css("display", "none");
	});
	if(location.hash){ hashhandler(location.hash) }


}());
function insert_projects_list(pros){
	html = "";
	for(i=0;i<pros.length;i++){
		pro = pros[i];
		url = '/page.php?page='+pro.projectpath+'/'+pro.projectname+'/lv_tag_index.htm';
		html += '<div class="panel-body" ><a role="button" href="'+url+'">'+pro.projectname+'          <span class="badge">'+pro.version+'</span></a></div>';
	}
	$("#pro-list-block").html(html);
}
function update_input_dropdown_menu(ctl,text){
	if( util_main_projects_obj && util_main_projects_obj.err==0){
		pros = util_main_projects_obj.projects;
		matchedpro = find_sub_array(pros, function(pro){
			if( text.length==0 || pro.projectname.indexOf(text) != -1 )
				return true;
			else
				return false;
		});
		insert_projects_list(matchedpro);
	}		
}
function find_sub_array(arraydata, callback){
	var retarray = new Array();
	search_array(arraydata, function(data){
		if( callback(data) )
			retarray.push(data);
	});
	return retarray;
}
function search_array(arraydata, callback){
	if( !arraydata )return 0;
	var aindex = 0;
	for(aindex=0;aindex<arraydata.length;aindex++){
		callback(arraydata[aindex]);
	}
}
function check_input_str(text){
	return true;
}
function util_debug(text){
	console.log(text);
}
function util_alert(text){
	alert(text);
}
function util_confirm(text){
	window.confirm(text);
}
function user_ok(ok){
	if( ok ){
		//console.log("user_ok:"+page_user_id);
		if( typeof g_user_status_change != "undefined"){
			g_user_status_change("valid");	
		}
		if( $(".login").length>0)
			$(".login").text(page_user).addClass("dropdown-toggle").attr("data-toggle", "dropdown");
	}else{
		if( $(".login").length>0){
			setTimeout(function(){
				$(".login").text("Login").removeClass("dropdown-toggle").attr("data-toggle", "");
			}, 100);
			
		}
	}
}
function check_session(){
	se = util_get_cookie("session");
	if( !se )
		return;
	if( suser ){
		page_session = se;
		return;
	}
	url = '/index.php?c=user&a=sessioncheck';
	url += '&user='+page_user;
	url += '&session='+se;
	$.post(url, function(data){
		if( !is_json_str(data) )
			return;
		data_obj = eval(data);
		if(data_obj.err == 0){
			page_session = se;
			page_user_id = data_obj.ret.userid;
			user_ok(true);
		}
		else{
			util_debug("check session failed:" + data);	
		}
			
		if( util_cb )
			util_cb("session");
	});
}

/*
* title ant test is informational text for displaying
* func is the string format callback function
* data is the data for callback funtion to handle
*/
function util_dialog(title, text, func, data){
	mydialog = $("#util-dialog");
	if(mydialog.length>0){
		mydialog.find(".modal-title").text(title);
		mydialog.find(".modal-body").text(text);
		footer = mydialog.find(".modal-footer");
		footer.attr("func", func);
		footer.attr("data-info", data);
		mydialog.modal("show");
		return;
	}
	html ='<div class="modal fade" id="util-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
  	html += '<div class="modal-dialog" role="document">';
   	html +=' <div class="modal-content">'
      	html += '<div class="modal-header">'
        html += ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html += '<h4 class="modal-title" id="myModalLabel">'+title+'</h4>'
      	html += '</div><div class="modal-body">';
        html += text;
	html += '</div>';
      	html += '<div class="modal-footer" func="'+func+'" data-info='+data+'>';
        html +='<button type="button" class="btn btn-default" data-dismiss="modal" onclick=dialog_cancel(this)>Cancel</button>';
        html += '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=dialog_ok(this)>Okay</button>';
      	html += '</div></div></div></div>';
	$("body").append(html);
	$("#util-dialog").modal("show");
	
}
function dialog_cancel(ctl){
	papa = $(ctl).parents(".modal-footer");
	if( papa.length == 0)
		return;
	func = papa.attr("func");
	cbdata = papa.attr("data-info");
	util_callback(func, "cancel", cbdata);
}
function dialog_ok(ctl){
	papa = $(ctl).parents(".modal-footer");
	if( papa.length == 0)
		return;
	func = papa.attr("func");
	cbdata = papa.attr("data-info");
	if( func ){
		util_callback(func, "ok", cbdata);
	}

}
function util_callback(func, data, cbdata){
	//util_debug(func + ":"+data);
	typeof window[func] == 'function' && window[func](data, cbdata);
}
function find_array_items(arraydata, key, val){
	ret = [];
	if(!arraydata)return ret;
	for(i=0;i<arraydata.length;i++){
		if( arraydata[i][key] == val)
			ret.push(arraydata[i]);
	}
	return ret;
}
function find_array_item(paths, key, val){
	if( !paths )return 0;
	for(i=0; i<paths.length;i++){
		if( paths[i][key] == val )
			return paths[i];
	}
	return 0;
}

function version_translate(version){
	return version.replace(/_/g, ".");
}
function get_project_topdir(project){
	if( util_main_projects_obj && util_main_projects_obj.err == 0){
		projects = util_main_projects_obj.projects;
		for(pi=0;pi<projects.length;pi++){
			if(projects[pi].projectname==project)
				return projects[pi].projectpath;
		}
 	}
	return "";
}

function str_compare(str1, str2){
	var minlen = str1.length<str2.length?str1.length:str2.length;
	for(var iii=0;iii<minlen;iii++){
		if( str1[iii] < str2[iii] )
			return -1;
		else if(str1[iii]>str2[iii])
			return 1;
	}
	if( str1.length==str2.length)
		return 0;
	else if(str1.length>str2.length)
		return 1;
	else
		return -1;
}

