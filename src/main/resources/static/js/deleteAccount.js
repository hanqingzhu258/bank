var prex_url = "";

//失去焦点时自动查询账户信息
$('#accountNumber').blur(function(){
	
	var number = $('#accountNumber').val();
	queryAccountByNumber(number);
		
});
//根据账号查询账户信息
function queryAccountByNumber(number){

	$.ajax({
                url: prex_url+"/account/findAccountById",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "id": number
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                    if(data.state){
                    	//填充账户信息
                    	showAccountInfo(data.data);
                      
                    } else {
                        alert("该账户不存在，请核对")
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//填充账户信息
function showAccountInfo(data){

    console.log(data);

	var isDelete;
	var isActive;
	var isLost;
	var isFreeze;

	if (data.account.isDelete == "0") {
		isDelete="未销户";
	}else{
		isDelete="已销户";
	}

	if (data.account.isActive == "0") {
		isActive="未激活";
	}else{
		isActive="已激活";
	}

	if (data.account.isLost == "0") {
		isLost="未挂失";
	}else{
		isLost="已挂失";
	}

	if (data.account.isFreeze == "0") {
		isFreeze="未冻结";
	}else{
		isFreeze="已冻结";
	}

	$('#accountTypeName').val(data.type.name);
	$('#accountNumber').val(data.account.id);
	$('#userIDCard3').val(data.user.idnumber);
	$('#userName_account').val(data.user.name);
	$('#accountPrincipal').val(data.account.principal);
	$('#accountInterest').val(data.account.interest);
	$('#accountBank').val(data.account.accountBank);
	$('#accountCreateTime').val(data.account.createTime);
	$('#isAccountActive').val(isActive);
	$('#accountActiveTime').val(data.account.activeTime);
	$('#isAccountFreeze').val(isFreeze);
	$('#isAccountLost').val(isLost);
	$('#isAccountDelete').val(isDelete);

}

//tab1页，点击“销户”按钮
$('#deleteAccount').click(function(e){

   //显示输入密码页
    $('#tab1').css("display","none");
    $('#tab2').css("display","");

})

//tab2页，点击“确认”按钮
$('#validatePassword').click(function(e){

    if ($('#accountPassword2').val()!=$('#accountPassword1').val()) {
        alert("两次密码不一致，请重新确认密码");
    }else{
        $.ajax({
                url: prex_url+"/account/deleteAccount",
                type: 'POST',
                async: false,
                cache: false,
                dataType: 'json',
                timeout: 5000,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "id": $('#accountNumber').val(),
                    "password":$('#accountPassword2').val()
                }),
                xhrFields: {  
                    withCredentials: true // 设置运行跨域操作  
                },
                success: function(data) {

                    if(data.state){
                        alert("销户成功");
                        //返回首页
                        window.location.href="/index";
                      
                    } else {
                        alert("销户失败");
                    }
                },
                error: function (data) {
                    alert("服务器响应时间过长，请稍后重试！")
                }
        })
    }
})

//tab2页，点击“取消”按钮
//显示账户信息页
$('#returnNext').click(function(e){

    $('#tab2').css("display","none");
    $('#tab1').css("display","");
    $('#accountPassword2').val("");
    $('#accountPassword1').val("");

})
    