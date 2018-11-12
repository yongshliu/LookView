function debug(text){
	util_debug(text);
	//$("#bottom_area").text(text);

}
$(document).ready(function(){
	fetch_coms();
});
function fetch_coms(project){
	var url = '/index.php?c=com&a=getcommentdir';
	util_debug(target_project_topdir.substring(1));
	url += '&topdir='+target_project_topdir.substring(1);
	$.post(url, function(data){
		util_debug(data);
		if( !is_json_str(data)){
			util_debug("get comments by topdir failed")
			return;
		}
		coms_obj = eval(data);
		if( coms_obj.err != 0 ){
			util_debug("Getting comments by topdir error");
			return;
		}
		var coms_all = coms_obj.ret;
		var html = "";
		$(".pro_coms .coms_num").text(coms_all.length);
		html += '<div class="panel-body"><ul class="list-group">';
		for(var i=0; i<coms_all.length;i++){
			if( i % 2 == 0){
				html +='<li class="list-group-item list-group-item-warning">';
			}else{
				html +='<li class="list-group-item list-group-item-info">';
			}
  			html += '<div class="com">'+util_unescape(coms_all[i].comments)+'</div>';
			html += '<div><span class="label label-info"><a href="/page.php?page=/'+coms_all[i].topdir+'/'+coms_all[i].filename+'#line'+coms_all[i].lineno+'">'+coms_all[i].filename + '  ==>  '+coms_all[i].lineno+'</a></span>    by  <span class="label label-success">';
			html += '<a href="/user.php?tuser='+coms_all[i].author +'">' + coms_all[i].author + '</a></span></div>';
			html += '</li>';

		}
		html += '</ul></div>';
		$(".pro_coms .coms_all").html(html);
	});
}

