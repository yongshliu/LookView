
function hay(txt){
	$(".pwd_reset_ind").text(txt);
}
$(document).ready(function(){
	
	pwd_check_regexp=/(?=.*[0-9])(?=.*[^a-zA-Zd])(?=.*[a-zA-Z]).{6,30}/;
	$("#pwd_reset_form").submit(function(e){
		e.preventDefault();
		pwd = $("#input_reg_pwd").val();
		if( pwd != $("#confirm_reg_pwd").val() ){
			hay("Password is not same twice");
			return;
		}
		
		url = '/pwdreset.php?';
		url += 'pwdreset='+pwd;
		$.post(url, function(data){
			hay(data);

		});


	});	
	
});
function on_lost_pwd_keyup(){
	$(".pwd_lost_ind").text("");
	document.getElementById("pwd_lost_email_t").onkeyup = 0;

	
}
