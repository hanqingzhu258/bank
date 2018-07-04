var prex_url = "";


//隐藏tab1，显示tab2：交易类型页
$('#demandDepositNext').click(function(e){

	$('#tab1').css("display","none");
	$('#tab2').css("display","");

});
//隐藏tab2，显示tab1：账户信息页
$('#demandDepositLast').click(function(e){

	$('#tab2').css("display","none");
	clearTab2();
	$('#tab1').css("display","");
	
});

//隐藏tab3，显示tab2：交易类型页
$('#demandDepositTransferLast').click(function(e){

	$('#tab3').css("display","none");
	$('#tab2').css("display","");

});


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
                      	$('#demandDepositNext').attr("disabled",false);
                    } else {
                        alert("该账户不存在，请核对");
                        $('#demandDepositNext').attr("disabled",true);
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

//在tab2页面，点击“下一步”按钮，根据转账和现金的不同，执行不同的存款操作
$('#demandDepositTransferSubmit').click(function(e){

	 	//判断交易类型
	 	var transactionType = $('#demandDepositType').val();
	 	if (transactionType == '转账') {
	 		//隐藏tab2窗口
	 		$('#tab2').css("display","none");
	 		$('#tab3').css("display","");
	 		//自动填充存款账户
	 		$('#receiptAccount').val($('#accountNumber').val());
	 		//自动填充转账金额
	 		$('#transferMoney').val($('#depositMoney').val());
	 		
	 	}else{
	 		alert("正在进行现金存款交易")
	 		//向后台请求现金交易步骤
	 		depositByCash();
	 	}

 });

//进行现金存款
function depositByCash(){

	var money = $('#depositMoney').val();
	var depositAccount = $('#accountNumber').val();

	$.ajax({
                url: prex_url+"/account/deposit",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "id": depositAccount,
                    "principal": money
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                    if(data.state){
                    	
                    	alert("存款成功");
                    	//显示存款首页tab1
	 					$('#tab2').css("display","none");
	 					clearTab2();
	 					$('#tab1').css("display","");

	 					//更新账户金额
	 					queryAccountByNumber(depositAccount);


                    } else {
                      	
                    	alert("存款失败");

                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//转账过程中，输入付款账户，失去焦点时自动查询账户信息
$('#payAccount').blur(function(){
	
	var number = $('#payAccount').val();

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
                      	$('#demandDepositNext').attr("disabled",false);
                    } else {
                        alert("该账户不存在，请核对");
                        $('#demandDepositNext').attr("disabled",true);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })
		
});

//转账时，点击“转账”按钮
$('#transfer').click(function(e){

	var password1 = $('#payAccountPassword1').val();
	var password2 = $('#payAccountPassword2').val();
	if (password1 != password2) {
		alert("两次密码不一致，请重新确认密码");
	}else{
		//转账操作
		transfer();
	}

})

//转账操作
function transfer(){

	var inAccount = $('#receiptAccount').val();
	var outAccount = $('#payAccount').val();
	var principal = $('#transferMoney').val();
	var password = $('#payAccountPassword2').val();

	$.ajax({
                url: prex_url+"/account/transferInAndOut",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "inId": inAccount,
                    "outId": outAccount,
                    "principal": principal,
                    "password": password
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                    if(data.state){
                    	//填充账户信息
            			alert("转账成功");
            			//清空页面2和页面3
            			clearTab3();
            			clearTab2();
            			//显示tab1
            			$('#tab3').css("display","none");
	 					$('#tab1').css("display","");
	 					//更新账户金额
	 					queryAccountByNumber(inAccount);

                    } else {
                        alert(data.message);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}
//清空转账页面
function clearTab3(){

	$('#receiptAccount').val("");
	$('#payAccount').val("");
	$('#transferMoney').val("");
	$('#payAccountPassword2').val("");
	$('#payAccountPassword1').val("");

}
//清空选择交易类型页面
function clearTab2(){
	$('#depositMoney').val("");
}