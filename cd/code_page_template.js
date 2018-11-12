 
window.onload = initForm;
var old_on_local_symbol_border_mousemove =0xFFFFFFFF;
var old_on_global_symbol_border_mousemove = 0xFFFFFFFF;
var xhr = false;

/* left, main, right */

var frames_width_ratio = new Array(0.3, 0.4, 0.3);
var frames_width = new Array(3);
var frames_min_width = new Array(100, 300, 100);

/* top, middle, bottom */

var frames_height_ratio = new Array(0.2, 0.8, 0.2);
var frames_height = new Array(3);


var left_frame_display = true;
var right_frame_display = true;

var display_area_width = 980;
var display_area_height = 800;
var contents_area_height = 400;

// new variable definition 
var screan_width = 1200;
var screen_height = 800;
var main_contents_height = screen_height*0.6;
var left_frame_width = screan_width*0.2;//200;
var right_frame_width = screan_width*0.2;
var main_code_width = screan_width * 0.6;
var divider_border_width = 6;

var header_area_width = (left_frame_width+right_frame_width+main_code_width);
var navi_area_width = header_area_width;
var footer_area_width = header_area_width;
var header_area_height = screen_height*0.12;
var footer_area_height = header_area_height;

var local_symbols_set;

// the following variable is getting from page
var datebase ="";
var table="";
var filepathname="";

function show_in_test(text){
	var test_block = document.getElementById("bottom_area");
	test_block.innerText=text;
}

function initForm() {

document.getElementById("show_aside_symbols").onclick = showhidesymbols;
document.getElementById("show_global_asid").onclick = showhideglobalsymbols;
document.getElementById("local_symbol_border").onmousedown = on_local_symbol_border_moursedown;
document.getElementById("local_symbol_border").onmouseup = on_local_symbol_border_mourseup;
document.getElementById("main_area").onmousemove = on_mainarea_moursemove;
document.getElementById("main_area").onmouseup = on_mainarea_mourseup;
document.getElementById("local_symbol_search_input").onkeyup = on_local_symbol_serach_keyup;
//document.getElementById("main_area").onmouseout = on_mainarea_mourseup;
// initilize the file info from the html
datebase = document.getElementsByName("datebase")[0].content;
table= document.getElementsByName("table")[0].content;
filepathname = document.getElementsByName("path")[0].content;
show_in_test("datebase name:"+datebase + ";table name:"+table +"; file name with path:"+filepathname);

document.onmouseup = on_document_mouseup;
window.onresize = on_window_resize;
left_frame_display = true;
right_frame_display = true;
document.getElementById("ajax_test").onclick = on_ajax_test;
display_area_width = window.innerWidth;
display_area_height = window.innerHeight;

init_frames_size();
init_local_symbols();
//adjust_frames();

var size = "windows("+window.screenLeft + ", " + window.screenTop + ", " + window.screenX + ", " + window.screenY + "), outer(" + window.outerHeight + ", " + window.outerWidth + ")";
    size += "inter(" + window.innerHeight + ", " + window.innerWidth + ")<br>" ;
	size += "contents area(" +  frames_width[0] + ", " + frames_width[1] + ", " + frames_width[2] +" )";
    //show_in_test(size);
//make_request("ajaxtext");
}
function init_local_symbols(){
	var local_symbols_list_a = document.getElementsByName("local_symbol_p");
	var test = "";
	if(local_symbols_list_a.length > 0)
	{
		local_symbols_set = new Array(local_symbols_list_a.length*2);
		for(i=0;i<local_symbols_list_a.length;i++)
		{
			local_symbols_set[i*2] = local_symbols_list_a[i].innerText;
			local_symbols_set[i*2+1] = local_symbols_list_a[i].href;
		}
	}
/*  only for the test to display the local symbol in the bottom area	
	var test_block = document.getElementById("bottom_area");
	for(i=0;i<local_symbols_set.length;i++)
	{
		test = test + "<a class=\"a_local_symbol\" name=\"local_symbol_p\" href=\"";
		test = test + local_symbols_set[i*2+1] + "\">";
		test = test + local_symbols_set[i*2] + "</a>";
	}
	test_block.innerHTML = test;
*/
}
function set_local_symbols(){
	var local_symbols_list_a = document.getElementsByName("local_symbol_p");
	
	
}
function on_local_symbol_serach_keyup(e)
{
	var keynum
    var keychar
    var numcheck
    var input = document.getElementById("local_symbol_search_input");
	var local
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}

	keychar = String.fromCharCode(keynum);
	numcheck = /\w/;
	var text = input.value;
        text = text.trim();
        text = text.toLowerCase();
	var html = " ";
	var localsymbolslist = document.getElementById("localsymbolslist");

	for(i=0;i<local_symbols_set.length/2;i++)
	{
                symtext = local_symbols_set[i*2].toLowerCase();
		if(text.length ==0  || symtext.indexOf(text) != -1){
			// we found one
			html = html + "<a class=\"a_local_symbol\" name=\"local_symbol_p\" href=\"";
		    html = html + local_symbols_set[i*2+1] + "\">";
		    html = html + local_symbols_set[i*2] + "</a>";
		}
	}
	localsymbolslist.innerHTML = html;
	
	return true;// numcheck.test(keychar);

}
function init_frames_size(){
	
	var left_frame = document.getElementById("left_frame");
	var left_symbol_div = document.getElementById("localsymbolsaside");
	var left_border_div = document.getElementById("local_symbol_border");
	var left_symbol_search_input = document.getElementById("local_symbol_search_input");

	var code_frame = document.getElementById("codeareaID");
	
	var right_frame = document.getElementById("right_frame");
	var right_frame_divider = document.getElementById("right_frame_divide");
	var right_symbol_area = document.getElementById("globalsymbolsaside");
	
	var heade_area = document.getElementById("header_area");
	var footer_area = document.getElementById("bottom_area");	
	var main_area = document.getElementById("main_area");
	var navi_area = document.getElementById("navigator_area");
	
	frames_width[0] =  Math.floor(frames_width_ratio[0] * display_area_width);
    frames_width[1] =  Math.floor(frames_width_ratio[1] * display_area_width);
    frames_width[2] =  Math.floor(frames_width_ratio[2] * display_area_width);
	
	frames_height[0] = Math.floor(frames_height_ratio[0] * display_area_height);
	frames_height[1] = Math.floor(frames_height_ratio[1] * display_area_height);
	frames_height[2] = Math.floor(frames_height_ratio[2] * display_area_height);
	
	//main_contents_height = 320;
	main_area.style.height = main_contents_height + 10 + "px";
        left_symbol_search_input.style.width = (left_frame_width - divider_border_width -1) + "px";
        left_symbol_search_input.style.height =  "20px";
	left_frame.style.minwidth = "100px";
	left_frame.style.width = left_frame_width + "px";
	left_frame.style.height = main_contents_height + "px";
	left_symbol_div.style.width = (left_frame_width - divider_border_width) + "px";
	left_symbol_div.style.height = (main_contents_height-20) + "px";
	left_border_div.style.width = divider_border_width + "px";
	left_border_div.style.height = main_contents_height + "px";
	
	code_frame.style.minwidth = "300px";
	code_frame.style.height = main_contents_height + "px";
	code_frame.style.width = main_code_width + "px";
	code_frame.style.top = -main_contents_height + "px";
	code_frame.style.left = left_frame_width + "px";
	
	
	right_frame.style.minwidth = "100px";
	right_frame.style.width = right_frame_width + "px";
	right_frame.style.height = main_contents_height + "px";
	right_frame.style.left = (left_frame_width + main_code_width)+"px";
	right_frame.style.top = -(main_contents_height*2)+"px";
	right_frame_divider.style.width = divider_border_width + "px";
	right_frame_divider.style.height = main_contents_height + "px";
	right_symbol_area.style.width = (right_frame_width - divider_border_width) + "px";
	right_symbol_area.style.height = main_contents_height + "px";
	
	header_area.style.width = header_area_width  + "px";
	navi_area.style.width = navi_area_width + "px";
	footer_area.style.width = footer_area_width + "px";
	header_area.style.height = header_area_height + "px";
	footer_area.style.height = footer_area_height + "px";
	
}
function adjust_frames(){
	var left_frame = document.getElementById("left_frame");
	var code_frame = document.getElementById("codeareaID");
	var right_frame = document.getElementById("right_frame");
	
	var header_area = document.getElementById("header_area");
	var main_area = document.getElementById("main_area");
	var bottom_area = document.getElementById("bottom_area");
	var middle_width = 0;
	if(left_frame_display){
		middle_width = main_code_width;
		code_frame.style.left = left_frame_width + "px";
		code_frame.style.top = -main_contents_height + "px";
		right_frame.style.top = -(main_contents_height*2) + "px";		
	}else{
		middle_width = main_code_width + left_frame_width;
		code_frame.style.width = middle_width + "px";
		code_frame.style.left = "0px";
		code_frame.style.top = "0px";
		right_frame.style.top = -main_contents_height + "px";	
	}
	if(!right_frame_display){
		middle_width += right_frame_width;
	}
	code_frame.style.width = middle_width + "px";
}
function on_window_resize(){
	display_area_width = window.innerWidth;
    display_area_height = window.innerHeight;
	//init_frames_size();
	//adjust_frames();
	//var size = "windows("+window.screenLeft + ", " + window.screenTop + ", " + window.screenX + ", " + window.screenY + "), outer(" + window.outerHeight + ", " + window.outerWidth + ")";
    //size += "inter(" + window.innerHeight + ", " + window.innerWidth + ")<br>" ;
	//size += "contents area(" +  frames_width[0] + ", " + frames_width[1] + ", " + frames_width[2] +" )";
   // show_in_test(size);
}

function on_ajax_test(){
	make_request("/ajaxtext");
}
function make_request(url){
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		if(window.ActiveXObjext){
			try{
				xhr = new ActiveXObjext("Microsoft.XMLHTTP");
			}catch(e){}
		}		
	}
	if(xhr){
		xhr.onreadystatechange=ajax_ready;
		xhr.open("GET",url, true);
		xhr.send();
	}else{
		show_in_test("don't support ajax :(");
	}
}
function ajax_ready(){
	if(xhr.readyState==4){
		if(xhr.status == 200){
			if(xhr.responseXML && xhr.responseXML.childNodes.length>0){
				var outmsg = getText(xhr.responseXML.getElementsByTagName("choices")[0]);
			}else{
				var outmsg = xhr.responseText;
			}
			document.getElementById("bottom_area").innerHTML = outmsg;
		}else{
			show_in_test("there was a problem with the request:" + xhr.status);
		}
	}
}
function on_document_mouseup(event){
	on_local_symbol_border_mourseup(event);
}
function on_mainarea_mourseup(event){
	on_local_symbol_border_mourseup(event); 
}

function on_mainarea_moursemove(event){
	if(old_on_local_symbol_border_mousemove != 0xFFFFFFFF){
		
		var left_frame = document.getElementById("left_frame");
		var width = left_frame.style.width;

		if( event.clientX > 50)
			left_frame.style.width = event.clientX + 'px';
		document.getElementById("show_aside_symbols").innerText= "x="+event.clientX + "; y=" + event.clientY;
		//old_mouse_x = event.clientX;
		
		    
	}
}
function on_local_symbol_border_mourseup(){
	if(old_on_local_symbol_border_mousemove != 0xFFFFFFFF){
		//document.getElementById("local_symbol_border").onmousemove = old_on_local_symbol_border_mousemove;
		old_on_local_symbol_border_mousemove = 0xFFFFFFFF;

	}
}

function on_local_symbol_border_moursedown(){
	old_on_local_symbol_border_mousemove = document.getElementById("local_symbol_border").onmousemove;
}
function showhidesymbols(){
	//var symbols = document.getElementById("localsymbolsaside");
	var symbols = document.getElementById("left_frame");
	var ctl = document.getElementById("show_aside_symbols");
	var codes = document.getElementById("codeareaID");
	var right_frame = document.getElementById("right_frame");
    //if (ctl.innerText == 'show'){
	if(!left_frame_display){
		ctl.innerText = 'hide';
		symbols.style.display='block';
		//codes.style.left = "102px";
		//codes.style.top = "-400px";
		left_frame_display = true;
		//right_frame.style.top = "-800px";
		
	}else{
		ctl.innerText = 'show';
		symbols.style.display='none';
		codes.style.left = '2px';
		codes.style.top = '0px';
		left_frame_display = false;
		//right_frame.style.top = "-400px";
	}
	adjust_frames();
}
function showhideglobalsymbols(){
	var symbols = document.getElementById("right_frame");
	var ctl = document.getElementById("show_global_asid");
    if (!right_frame_display){
		ctl.innerText = 'hide';
		right_frame_display = true;
		symbols.style.display='block';
	}else{
		ctl.innerText = 'show';
		right_frame_display = false;
		symbols.style.display='none';
	}
	adjust_frames();
}
