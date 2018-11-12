

email_check_regexp=/^([a-zA-Z_-]|[0-9])+([a-zA-Zd_-]|[0-9])*@(.[a-zA-Zd_-])+/;
username_check_regexp=/^([a-zA-Z_-])+([a-zA-Zd_-])*/;
pwd_check_regexp=/(?=.*[0-9])(?=.*[^a-zA-Zd])(?=.*[a-zA-Z]).{6,30}/;

function pop_error(text){
	popctl = $(".alert");
	$(".alert-info").text(text);
	popctl.removeClass("reg-alert-gone");
}
function show_progress(text){
	util_debug("show_progress:"+text);
	$(".modal-body").text(text);
	$("#reg-dialog").modal("show");
}
$(document).ready(function(){
	$("body").on("click", ".alert-close", function(e){
		util_debug("alert-close clicked");
		$(".alert").addClass("reg-alert-gone");
	});
	$("#form_register").submit(function(e){
		// veryfy the input
		e.preventDefault();
		util_debug($("#input_reg_email").val());
		username = $("#input_reg_user").val();
		pwd = $("#input_reg_pwd").val();
		email = $("#input_reg_email").val();
		if( username_check_regexp.test(username) != true){
			pop_error("用户名无效，换一个:)");
			return;
		}
		if( email_check_regexp.test(email) != true){
                        pop_error("邮件地址无效，请重新输入");
                        return;
                }
		if( pwd != $("#confirm_reg_pwd").val() ){
			pop_error("两次输入的密码不相同");
			return;
		}
		url_verify = '/index.php?c=user&a=infocheck';
		url_verify += '&username='+username;
		url_verify += '&email='+email;
		 pop_error("正在验证用户名和密码");
		$.post(url_verify, function(check){
			util_debug(check);
			check_ret = eval(check);
			if( check_ret.err !=0 ){
				pop_error("用户名或邮箱已被使用，请重新注册");
			}else{
					pop_error("username and eamil are passed checking");
					url = '/index.php?c=user&a=register';
					url += '&username='+$("#input_reg_user").val();
					url += '&pwd='+$("#input_reg_pwd").val();
					url += '&email='+$("#input_reg_email").val();
					id = $.post(url, function(data){
						util_debug(data);
						result = eval(data);	
						if( result.err ==0 ){
							show_progress("注册成功！系统会在1.5秒钟自动跳转到之前的页面");
							setTimeout(function(){
								history.back();
							}, 1500);
						}else{
							pop_error("注册失败. msg="+result.msg);
						}
					});
					
			}
			
		});

			});
}); 
