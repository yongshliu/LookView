function debug(text){
	util_debug(text);
	//$("#bottom_area").text(text);

}
$(document).ready(function(){
	if(main_projects){
		mpo = eval(main_projects);
		if( mpo.err == 0){
			pros=mpo.projects;
			for(i=0;i<pros.length;i++){
				if(pros[i].class=="app")
					make_app(pros[i]);
				else if(pros[i].class=="mid" || pros[i].class=="midware")
					make_mid(pros[i]);
				else if(pros[i].class=="dep")
					make_dep(pros[i]);
				else if(pros[i].class=="ker" || pros[i].class=="kernel")
					make_ker(pros[i]);
			}
		} 	
	}
	fresh_latest_coms();
	fresh_latest_flowchart();
	$("body").on("mouseenter", ".img-improve", function(e){
		$(this).children(".img-improve-slip").animate({top:"2px"}, "fast");
	});
	$("body").on("mouseleave", ".img-improve", function(e){
		$(this).children(".img-improve-slip").animate({top:"100px"}, "normal");
	});

});
function update_latest_coms(comarray){
	if( comarray.length == 0)
		return;
	var html = "<div>";
	var urlbase = '/page.php?page=/';
	for(var i= 0; i<comarray.length;i++){
		html += "<div class=lat-com-item>";
		html += '<blockquote>';
		url = urlbase + comarray[i].topdir+'/'+comarray[i].filename+'#line'+comarray[i].lineno;
		html += '<div class="lci-com"><a href="'+url+'">'+util_unescape(comarray[i].comments)+'</a></div>';
		html +=  '<div>评论人:'+comarray[i].author+'</div>';
		html += '</blockquote>';
		html += '</div>';
	}
	html += "</div>";
	$(".rs-latest-coms .panel-body").html(html);
}
function fresh_latest_coms(){
	url = '/index.php?c=com&a=getlatestcoms';
	url += '&num='+5;
	$.post(url, function(data){
		util_debug(data);
		if( is_json_str(data)){
			dataobj = eval(data);
			if( dataobj.err == 0){
				update_latest_coms(dataobj.ret);
			}
		}
	});
}
function update_latest_fcs(fcarray){
	if( fcarray.length == 0)
		return;
	var html = "<div>";
	for(var i= 0; i<fcarray.length;i++){
		html += "<div class=lat-com-item>";
		html += '<blockquote>';
		html += '<div class=lci-fcname ><a href="/fc.php?id='+fcarray[i].id+'">'+util_unescape(fcarray[i].name)+'</a></div>';
		html +=  '<div>'+fcarray[i].time+'</div>';
		html += '</blockquote>';
		html += '</div>';
	}
	html += "</div>";
	$(".rs-latest-flowchart .panel-body").html(html);
}

function fresh_latest_flowchart(){
	url = '/index.php?c=com&a=getlatestfcs';
	url += '&num='+5;
	$.post(url, function(data){
		if( is_json_str(data) ){
		util_debug(data);
			var dataobj = eval(data);
			if( dataobj.err == 0)
				update_latest_fcs(dataobj.ret);
		}
	});

}
function make_block(name, version, href){
	html = '<div class="img-improve"><div class="img-improve-name">'+name + '</div>';
	html += '<div class="img-improve-slip"><div><a href="'+href+'">'+version_translate(version)+'</a></div>';
	html += '</div>';
	html += '</div>';
	return html;
}
function make_app(app){
	//url = '/page.php?page='+app.projectpath+'/'+app.projectname+'/lv_tag_index.htm';
	url = '/project.php?pro='+app.projectname;
	html = make_block(app.projectname, app.version, url);
	$(html).appendTo($(".app_container"));

	
}
function make_mid(mid){
	//url = '/page.php?page='+mid.projectpath+'/'+mid.projectname+'/lv_tag_index.htm';
	url = '/project.php?pro='+mid.projectname;
	html = make_block(mid.projectname, mid.version, url);
	$(html).appendTo($(".mid_container"));

}
function make_dep(dep){
	//url = '/page.php?page='+dep.projectpath+'/'+dep.projectname+'/lv_tag_index.htm';
	url = '/project.php?pro='+dep.projectname;
	html = make_block(dep.projectname, dep.version, url);
	$(html).appendTo($(".dep_container"));


}
function make_ker(ker){
	//url = '/page.php?page='+ker.projectpath+'/'+ker.projectname+'/lv_tag_index.htm';
	url = '/project.php?pro='+ker.projectname;
	kerlink = $("#kernel-link");
	kerlink.attr("href", url);
	kerlink.children("span").text(ker.version);

}
