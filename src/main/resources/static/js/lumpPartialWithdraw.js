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
            			alert("合法账户，请点击确定继续");
                    	showAccountInfo(data.data);
                      	$('#lumpPartialWithDrawNext').attr("disabled",false);
                    } else {
                        alert("该账户不存在，请核对");
                        $('#lumpPartialWithDrawNext').attr("disabled",true);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//填充账户信息
function showAccountInfo(data){

	/*console.log(data);*/

	var isDelete;
	var isActive;
	var isLost;
	var isFreeze;
    var isAutomateDeposit;

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

    if (data.account.isAutomateDeposit == "0") {
        isAutomateDeposit="否";
    }else{
        isAutomateDeposit="是";
    }

	$('#accountTypeId').val(data.type.id);
	$('#accountNumber').val(data.account.id);
	$('#userIDCard3').val(data.user.idnumber);
	$('#userName_account').val(data.user.name);
	$('#accountPrincipal').val(data.account.principal);
	$('#accountInterest').val(data.account.interest);
	$('#accountBank').val(data.account.accountBank);
	$('#accountCreateTime').val(data.account.createTime);
	/*$('#isAccountActive').val(isActive);
	$('#accountActiveTime').val(data.account.activeTime);*/
	$('#isAccountFreeze').val(isFreeze);
	$('#isAccountLost').val(isLost);
    $('#isAutomateDeposit').val(isAutomateDeposit);
	/*$('#isAccountDelete').val(isDelete);*/

}

//在tab1,点击"取消"，清空tab1，并将"下一步"按钮设置不可用
$('#resetAccountInfo').click(function(e){
    $("#lumpPartialWithDrawNext").attr("disabled",true);
    $('#accountTypeId').val('');
    $('#accountNumber').val('');
    $('#userIDCard3').val('');
    $('#userName_account').val('');
    $('#accountPrincipal').val('');
    $('#accountInterest').val('');
    $('#accountBank').val('');
    $('#accountCreateTime').val('');
    /*$('#isAccountActive').val('');
    $('#accountActiveTime').val('');*/
    $('#isAccountFreeze').val('');
    $('#isAccountLost').val('');
    $('#isAutomateDeposit').val('');
    /*$('#isAccountDelete').val('');*/
})

$("#lumpPartialWithDrawNext").click(function(e){
	$('#tab1').css("display","none");
    $('#tab2').css("display","");
})

//在tab2页面，点击“取消”按钮时，隐藏tab1，显示tab2：交易类型页
$('#lumpPartialWithDrawLast').click(function(e){

    $('#tab2').css("display","none");
    clearTab2();
    $('#tab1').css("display","");
    
});

//在tab2页面，点击“下一步”按钮，根据转账和现金的不同，执行不同的取款操作
$('#lumpPartialWithDrawSubmit').click(function(e){

		//隐藏tab2，交易类型页面
		$('#tab2').css("display","none");
		//显示tab5，创建新账户页面
	 	$('#tab5').css("display","");


	 	/*//判断交易类型
	 	var transactionType = $('#lumpDepositType').val();
	 	if (transactionType == '转账') {
	 		//隐藏tab2窗口
	 		$('#tab2').css("display","none");
	 		$('#tab3').css("display","");
	 		//自动填充存款账户
	 		$('#receiptAccount').val($('#accountNumber').val());
	 		//自动填充转账金额
	 		$('#transferMoney').val($('#depositMoney').val());
	 		
	 	}else{
	 		alert("正在进行现金取款交易")
	 		//向后台请求现金交易步骤
	 		depositByCash();
	 		
	 	}*/
 });

//tab5页面，身份证号输入框获取焦点时，自动填充
$('#userIDCard2').focus(function(e){
	 $('#userIDCard2').val($('#userIDCard3').val());
})

//tab5页面，身份证号输入框失去焦点时
//根据用户身份证号码检查用户是否存在
//即判断是新老用户
$('#userIDCard2').blur(function(){
	var IDNumber = $('#userIDCard2').val();
	queryUserByIDNumber(IDNumber);
		
});
//根据用户身份证号码检查用户是否存在
function queryUserByIDNumber(IDNumber){

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

                    	alert("合法用户");
                    	$("#addAccount").attr("disabled",false);

                    } else {
                        alert("非法用户");
                        $("#addAccount").attr("disabled",true);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//在tab5页面，点击“开户”按钮
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

	var isAutomateDeposit;
	if ($('#isAutomateDeposit').val()=="是") {
		isAutomateDeposit=1;
	}else{
		isAutomateDeposit=0;
	}

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
  			/*"typeId": 4,*/
  			"password":$('#newAccountPassword2').val(),
  			"accountBank":$('#accountBank').val(),
  			"isAutomateDeposit":isAutomateDeposit
  		}),
  		success: function(data) {

                    if(data.state){
                    	alert("新账户创建成功");
                    	//显示账户信息页面
                    	$('#tab5').css('display','none');
                    	clearTab5();
						$('#tab6').css('display','');
                    	//填充新账户信息
                    	showNewAccountInfo(data.data);

                    } else {
                        alert("账户添加失败，请重新添加");
                    }

                },
        error: function (data) {
                    alert("服务器响应时间过长，请稍后重试！")
                }

	})
}

//清空tab5页面
function clearTab5(){
	$('#userIDCard2').val("");
	$('#accountBank').val("");
	$('#newAccountPassword1').val("");
	$('#newAccountPassword2').val("");
}

//填充tab6新账户信息
function showNewAccountInfo(data){

	/*console.log(data);*/

	var isDelete;
	var isActive;
	var isLost;
	var isFreeze;
	var isAutomateDeposit;

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

    if (data.account.isAutomateDeposit == "0") {
        isAutomateDeposit="否";
    }else{
        isAutomateDeposit="是";
    }

	$('#newAccountTypeId').val(data.type.id);
	$('#newAccountNumber').val(data.account.id);
	$('#userIDCard6').val(data.user.idnumber);
	$('#userName_newAccount').val(data.user.name);
	$('#newAccountPrincipal').val(data.account.principal);
	$('#newAccountInterest').val(data.account.interest);
	$('#newAccountBank').val(data.account.accountBank);
	$('#newAccountCreateTime').val(data.account.createTime);
	/*$('#isAccountActive').val(isActive);
	$('#accountActiveTime').val(data.account.activeTime);*/
	$('#isnewAccountFreeze').val(isFreeze);
	$('#isnewAccountLost').val(isLost);
    $('#isnewAutomateDeposit').val(isAutomateDeposit);
	/*$('#isAccountDelete').val(isDelete);*/
}

//在tab6新账户信息页面，点击“下一步”按钮
$('#newAccountNext').click(function(e){

	$('#tab6').css('display','none');
	//显示取款交易页面
	$('#tab3').css('display','');
	//自动填充老账户，新账户以及取款金额
	$('#withdrawelAccount').val($('#accountNumber').val());
	$('#receiptAccount').val($('#newAccountNumber').val());
	$('#transferMoney').val($('#withdrawMoney').val());

})

//在tab3取款页面，点击“取款”按钮，进行取款
$('#withdraw').click(function(e){

	
	var password2 = $('withdrawelPassword2').val();
	var password1 = $('withdrawelPassword1').val();

	if (password1!=password2) {
		alert("两次密码不一致，请重新输入");
	}else{
		lumpPartialWithDraw();
	}

})

//整取操作
function lumpPartialWithDraw(){



	var inAccount = $('#receiptAccount').val();
	var outAccount = $('#withdrawelAccount').val();
	var money = $('#transferMoney').val();
	var password = $('#withdrawelPassword2').val();

	console.log(inAccount+","+outAccount+","+money+","+password);

	$.ajax({
                url: prex_url+"/transaction/lumpPartialWithdraw",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "inAccount": inAccount,
                    "outAccount": outAccount,
                    "money": money,
                    "password":password
                    /*"productId":$('#')*/
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                    if(data.state){
                    	
                    	alert("取款成功");
                    	//显示存款首页tab1
	 					$('#tab3').css("display","none");
	 					clearTab3();
	 					$('#tab1').css("display","");
	 					//更新账户金额
	 					queryAccountByNumber(inAccount);

                    } else {
                    	alert("取款失败");
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}
//清空tab3
function clearTab3() {
	$('#withdrawelAccount').val('');
    $('#transferMoney').val('');
    $('#receiptAccount').val('');
    $('#withdrawelPassword1').val('');
    $('#withdrawelPassword2').val('');
}