<?php
$common_html_format = <<<HTML
<html>
<head>
<title>Dynamic Menus</title>
<meta charset="utf-8"></meta>
<script>
    var page_info = '({page="%s"})';	
</script>
<script src="jquery-1.12.0.js"></script>
<script src="jqtest.js"></script>
<link rel="stylesheet" href="test.css" />

</head>
<body>
<main>
<div class="header_area" id="header_area">

</div>
</main>
<hr>
<div class="navigator_area" id="navigator_area">
	<p style="display:inline;width:33%" id=2345679 > 
		<span class="hypertext" id="show_aside_symbols"> hide</span> 
		<span id="show_global_asid" class="hypertext" > hide</span>
		<span class="hypertext" id="ajax_test">ajax</span>
		<span id="addabove" class="hypertext">addabove</span>
	</p>
	<div style="display:inline;float:right;"><span class="hypertext" id="login">login</span>      <span class="hypertext" id="register">register</span>
	</div>
	
</div>
<div class="main_area" id="main_area">
   
	<div class="left_frame" id="left_frame">
		<div id="local_symbol_border" class="local_symbol_border"></div>
		<input type="text" id="local_symbol_search_input" name="search_input" />
        	<div class="localsymbols" id="localsymbolsaside">
	    		<!-- local symbols -->
	 	</div>
	</div>
	 
    <div class="codearea" id="codeareaID">
	<!-- put the codes here -->		
	<p> loading ... </p>
    </div>
	<div class="right_frame" id="right_frame">
	    <div id="right_frame_divide" class="right_frame_divide"></div>
	    <div class="globalsymbols" id="globalsymbolsaside">
	     <!-- global symbol -->
	    </div>
	</div>
</div>
<div class="bottom_area" id="bottom_area"> </div>
</body>
</html>

HTML;

?>
