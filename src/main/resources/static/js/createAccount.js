var prex_url = "";

//点击用户信息页，提交按钮，申请添加用户
$('#addUser').click(function(e){
	
	addUser();	
		
});

//向后台添加一个新的用户
function addUser(){

	/*alert($("#userIDCard1").val());*/
	$.ajax({
                url: prex_url+"/user/create",
                type: 'POST',
                dataType: 'json',
                timeout: 1000,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "name": $("#userName").val(),
                    "sex": $("#userGender").val(),
                    "idnumber":$("#userIDCard1").val(),
                    "phoneNumber":$('#userPhoneNumber').val(),
                    "address":$('#userAddress').val()
                }),
                success: function(data) {
                    
                    if(data.state){
                    	//添加成功
                        /*alert(data.message);*/
                        alert("添加成功");
                        //自动跳转至客户页
                        showApplyPage();
                        //将刚才的身份证号自动填充
                        $('#userIDCard2').val($('#userIDCard1').val());
                      
                    } else {
                        alert("添加失败")
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//在客户信息页，跳转至申请账户页
function showApplyPage(){

	$('#tab1').css('display','none');
	$('#tab2').css('display','');

}


//根据用户身份证号码检查用户是否存在
//即判断是新老用户
$('#userIDCard1').blur(function(){
		
	var IDNumber = $('#userIDCard1').val();
	queryUserByIDNumber(IDNumber);
		
});
//根据用户身份证号码检查用户是否存在
function queryUserByIDNumber(IDNumber){

	/*alert(IDNumber);*/

	$.ajax({
                url: prex_url+"/user/findUserByIDNumber",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "idnumber": IDNumber
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                	/*alert(IDNumber);*/

                    if(data.state){

                    	alert("该用户是老用户");
                    	$('#userName').val(data.data.name);
                    	$('#userGender').val(data.data.sex);
                    	$('#userPhoneNumber').val(data.data.phoneNumber);
                    	$('#userAddress').val(data.data.address);
                      
                    	$("#addUser").attr("disabled",true);

                    } else {
                        alert("该用户是新用户");
                        $('#userName').val("");
                    	$('#userGender').val("");
                    	$('#userPhoneNumber').val("");
                    	$('#userAddress').val("");
                        $("#addUser").attr("disabled",false);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//点击用户信息页，跳过按钮
$('#skipOldUser').click(function(){

	//显示申请账户页	
	showApplyPage();

	//将刚才的身份证号自动填充
    $('#userIDCard2').val($('#userIDCard1').val());
		
});

//点击申请账户页上一步按钮
//显示用户信息页
$('#showUserInfo').click(function(e){
		
	$('#tab2').css('display','none');
	$('#tab1').css('display','');
		
});

//检测是否为整存整取账户,是，将自动转存设置为是
/*$('#accountType').change(function(e){
	
	if ($(this).val()=="0") {
		
		$("#isAutomateDeposit").val('1');
	}
})*/


//点击申请账户页"提交"按钮
//添加账户
$('#addAccount').click(function(e){

	//验证是否选择了账户类型
	if ($('#accountType').val()=="") {
		alert("请选择账户类型！！！");
	}/*else if ($('#accountType').val()=="0") {
		//如果是整存整取账户，则默认设置自动转存
		$("#isAutomateDeposit").val("1");
	}*/else{
		var password1 = $('#accountPassword1').val();
		var password2 = $('#accountPassword2').val();
		//验证两次密码是否一致
		if (password2 != password1) {
			alert("请确认密码后重新输入！");
			$('#accountPassword1').val("");
			$('#accountPassword2').val("");

		}else{
			addAccount();
		}
	}
	
});
//向后台发送添加账户请求
function addAccount(){

	$.ajax({

		url:prex_url+"/account/createAccount",
		type:"POST",
		dataType:"json",
		contentType:"application/json;charset=UTF-8",
		async:false,
		timeout:5000,
		cache:false,
		xhrFields: {  
    		withCredentials: true // 设置运行跨域操作  
  		},
  		data:JSON.stringify({
  			"userId":$('#userIDCard2').val(),
  			"typeId":$('#accountType').val(),
  			"password":$('#accountPassword2').val(),
  			"accountBank":$('#accountBank').val(),
  			"isAutomateDeposit":$('#isAutomateDeposit').val()
  		}),
  		success: function(data) {

                    if(data.state){
                    	alert("账户创建成功");
                    	//显示账户信息页面
                    	showAccountInfoPage();
                    	//填充账户信息
                    	showAccountInfo(data.data);

                    } else {
                        alert("账户添加失败，请重新添加");
                    }

                },
        error: function (data) {
                    alert("服务器响应时间过长，请稍后重试！")
                }

	})
}

//显示账户信息页面
function showAccountInfoPage(){

	$('#tab2').css('display','none');
	$('#tab3').css('display','');

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
	$('#accountBank2').val(data.account.accountBank);
	$('#accountCreateTime').val(data.account.createTime);
	$('#isAccountActive').val(isActive);
	$('#accountActiveTime').val(data.account.activeTime);
	$('#isAccountFreeze').val(isFreeze);
	$('#isAccountLost').val(isLost);
	$('#isAccountDelete').val(isDelete);

}

//点击“退出”按钮，跳转至激活页面
$("#exitCreateAccount").click(function(e){
	window.location.href="/index";
})