function debug(text){
	$("#bottom_area").text(text);

}
$(document).ready(function(){
	
	email_check_regexp=/^([a-zA-Z_-]|[0-9])+([a-zA-Zd_-]|[0-9])*@(.[a-zA-Zd_-])+/;
	$("#pwd_lost_form").submit(function(e){
		e.preventDefault();
		email = $("#pwd_lost_email_t").val();
		if( email_check_regexp.test(email) != true){
			$(".pwd_lost_ind").text("the email is invalided"+email+". please input again");
			document.getElementById("pwd_lost_email_t").onkeyup = on_lost_pwd_keyup;
			return;
                }
		url = '/pwdlost.php?';
		url += 'email='+email;
		$.post(url, function(data){
			$(".pwd_lost_ind").text(data);

		});


	});	
	
});
function on_lost_pwd_keyup(){
	$(".pwd_lost_ind").text("");
	document.getElementById("pwd_lost_email_t").onkeyup = 0;

	
}

