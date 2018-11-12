 
//window.onload = initForm;
var old_on_local_symbol_border_mousemove =0xFFFFFFFF;
var old_on_global_symbol_border_mousemove = 0xFFFFFFFF;
var xhr = false;

/* left, main, right */

var frames_width_ratio = new Array(0.3, 0.4, 0.3);
var frames_min_width = new Array(100, 300, 100);

/* top, middle, bottom */

var frames_height_ratio = new Array(0.2, 0.8, 0.2);
var frames_height = new Array(3);


var left_frame_display = false;
var right_frame_display = false;

var display_area_width = 980;
var display_area_height = 800;
var contents_area_height = 400;

// new variable definition 
var screen_width = 1200;
var screen_height = 800;
var main_contents_height = screen_height*0.6;
var left_frame_width = screen_width*0.2;//200;
var right_frame_width = screen_width*0.2;
var main_code_width = screen_width * 0.6;
var divider_border_width = 6;

var header_area_width = (left_frame_width+right_frame_width+main_code_width);
var navi_area_width = screen_width;
var footer_area_width = header_area_width;
var header_area_height = screen_height*0.12;
var footer_area_height = header_area_height;

// local java and ajax variables
var fileinfo_obj = 0;
var local_gifts_obj = 0;
var local_favors_obj = 0;
var local_symbols_obj = 0;
var local_comments_set = 0;
var navi_obj;


function LinkObj(){
	this.prev = 0;
	this.next = 0;
	this.url = 0;
}
// navi object construct
function NavObj(limit){
	this.num=0;
	this.cur=0;
	this.head=0;
	this.limit = limit;
	this.ifnext = navi_if_next;
	this.ifprev = navi_if_prev;
	this.next=navi_next;
	this.prev=navi_prev;
	this.push=navi_push;
}
function debug(text){
	util_debug(text);
	//show_in_test(text);
}
function show_in_test(text){
	
	$("#bottom_area").text(text);
}
$(window).load(initForm);


function cb_util(type){
	if( type == "session"){
		if( page_user ){
						
		}
		else{
			


		}
	}
}
function handle_user_mouse(e){
	if( $(this).hasClass("user")){
		
	}
}
$(document).ready(function(){
	// initialize navi object
	navi_obj = new NavObj(30);
	left_frame_width = $("#left_frame").css("width");
	main_code_width = $("#codeareaID").css("width")  - left_frame_width;

	//show_in_test(page_info);	
	//show_in_test(window.location.protocol + "->" + window.location.host);

	jfile_init();

	//fetch_gsymbole_index();
	
	$("#addabove").click(function(){
		if($(this).text()=="addabove"){
			$(this).text("delabove");
			$(this).parent().parent().append("<p>hello, I am here for jquery</P>");
		}
		else{
			$(this).text("addabove");
		}
	});
	$("#codeareaID").resize(function(){
		adjust_frames();
	});
   //initForm();


	
  
  	$("#form_login").submit(function(e){
		login_submit(e);
	});
	$("#page_back").click(function(e){
		if( navi_obj.ifprev() ){
			goto_url(navi_obj.prev(), 1);
		}
	});
	$("#page_forward").click(function(e){
		if( navi_obj.ifnext() ){
			goto_url(navi_obj.next(),1);
		}
	});
	$("body").on("scroll",function(e){
		//debug("body on scroll");
	}); 
	$(window).scroll(function(){
		//getBoundingClientRect current rect in the viewport
		//debug("doc.scrollTop:"+$(document).scrollTop() + " win.height"+$(window).height()+" screen.availHeight:"+screen.availHeight);
		//debug("win.page:("+window.pageXOffset+","+window.pageYOffset+")");
		/*if( $(document).scrollTop() > 60){
			$("#code-navi").addClass("top");
			$(".main_area").addClass("scrolled");
		}else{
			$("#code-navi").removeClass("top");
			$(".main_area").removeClass("scrolled");

		}*/
		
	});
	jutil_init();
	jfile_build_cmd_bar($("#code-navi"));

/*
	$('.float_cmd_btn').css("left", $("body").offset().left+990);
	
	$('.float_cmd_btn')
				.drag("start", function(){
			return $( this ).clone()
				.css("opacity", .75 )
				.appendTo( document.body );
		})
		.drag(function( ev, dd ){
			$( dd.proxy ).css({
				top: dd.offsetY,
				left: dd.offsetX
			});
		})
		.drag("end",function( ev, dd ){
			$( this ).animate({
				top: dd.offsetY,
				//left: dd.offsetX
			}, 420 );
			$( dd.proxy ).remove();
		});
*/

});
function load_all_project_info(func){
	
}
function load_contents(url, func){
	$.get(url, function(data){
		page_content = '<div id="target_page">';
		page_content += data;
		page_content += '</div>';
		$("#target_page").empty();
		$("#target_page").replaceWith(page_content);
		urls =window.location.href.split("#");
		if( urls[1]){
			window.location.href="#"+urls[1];
		}
		if(func)
			func();
		
	});
	
}



function iamgoneclick(ctl){
	cid = $(ctl).attr("data-info");
	$("#"+cid).remove();
	adjust_frames();
}
$(document).load(initForm);

function initForm() {

//adjust_frames();

}
function init_frames_size(){
	
	var left_frame = document.getElementById("left_frame");
	var left_border_div = document.getElementById("local_symbol_border");
	
	var code_frame = document.getElementById("codeareaID");
	
	var right_frame = document.getElementById("right_frame");
	var right_frame_divider = document.getElementById("right_frame_divide");
	var right_symbol_area = document.getElementById("globalsymbolsaside");
	
	var heade_area = document.getElementById("header_area");
	var footer_area = document.getElementById("bottom_area");	
	var main_area = document.getElementById("main_area");
	var navi_area = document.getElementById("navigator_area");
	
	
}
function adjust_frames(){
}



function navi_push(url){
	var cur = new LinkObj();
	cur.url = url;
	cur.prev = this.cur;
	this.cur.next = cur;
	this.cur = cur;
	if ( !this.header ){
		this.header = this.cur;	
	}
	else if( this.num >= this.limit ){
		this.header = this.header.next;
		this.header.prev = 0;
		this.num--;
	}
	this.num++;
	///show_in_test(this.cur.url + " pushed " + this.num);
	return this.cur.url;
		
}
function navi_if_next(){
	return this.cur.next;
}
function navi_if_prev(){
	return this.cur.prev;
}
function navi_next(){

	if( this.cur.next ){
		this.cur = this.cur.next;
		this.num++;
		return this.cur.url;
	}
	return 0;
}
function navi_prev(){
	if( this.cur.prev ){
		this.cur = this.cur.prev;
		this.num--;
		return this.cur.url;
	}
	return 0;
}

function fold_my_comments(){
}
function unfold_my_comments(){
}

