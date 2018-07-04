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
                      	$('#withdrawelNext').attr("disabled",false);
                    } else {
                        alert("该账户不存在，请核对");
                        $('#withdrawelNext').attr("disabled",true);
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

//隐藏tab1，显示tab2：交易类型页
$('#withdrawelNext').click(function(e){

	$('#tab1').css("display","none");
	$('#tab2').css("display","");

});

//在tab2页面，点击“下一步”按钮，根据转账和现金的不同，执行不同的取款操作
$('#withdrawelTransferSubmit').click(function(e){

	 	//判断交易类型
	 	var transactionType = $('#withdrawelType').val();
	 	if (transactionType == '转账') {
	 		//隐藏tab2窗口
	 		$('#tab2').css("display","none");
	 		$('#tab3').css("display","");
	 		//自动填充取款账户
	 		$('#withdrawelAccount').val($('#accountNumber').val());
	 		//自动填充转账金额
	 		$('#transferMoney').val($('#withdrawelMoney').val());
	 		
	 	}else{

	 		alert("正在进行现金取款交易")
	 		//向后台请求现金取钱步骤
	 		//判断两次密码是否一致
	 		var withdrawelPassword1 = $('#withdrawelAccountPassword1').val(); 
	 		var withdrawelPassword2 = $('#withdrawelAccountPassword2').val(); 
	 		if (withdrawelPassword1!=withdrawelPassword2) {
	 			alert("两次密码不一致，请重新输入确认密码");
	 			//清空密码
	 			$('#withdrawelPassword1').val(""); 
	 			$('#withdrawelPassword2').val(""); 
	 		}else{
	 			withdrawelByCash();
	 		}
	 		
	 	}

 });

//进行现金取款
function withdrawelByCash(){

	var money = $('#withdrawelMoney').val();
	var withdrawelAccount = $('#accountNumber').val();
	var password = $('#withdrawelAccountPassword2').val();

	$.ajax({
                url: prex_url+"/account/withdraw",
                type: 'POST',
        		async: false,
        		cache: false,
        		dataType: 'json',
        		timeout: 5000,
        		contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "id": withdrawelAccount,
                    "principal": money,
                    "password":password
                }),
                xhrFields: {  
    				withCredentials: true // 设置运行跨域操作  
  				},
                success: function(data) {

                    if(data.state){
                    	
                    	alert("取款成功");
                    	//显示存款首页tab1
	 					$('#tab2').css("display","none");
	 					clearTab2();
	 					$('#tab1').css("display","");
	 					//更新账户金额
	 					queryAccountByNumber(withdrawelAccount);

                    } else {
                    	alert(data.message);
                    }
                },
                error: function (data) {
                    
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })

}

//清空选择交易类型页面,即现金取款
function clearTab2(){
	$('#withdrawelMoney').val("");
	$('#withdrawelAccountPassword2').val("");
	$('#withdrawelAccountPassword1').val("");
}

//转账时，点击“转账”按钮
$('#transfer').click(function(e){

	var password1 = $('#withdrawelPassword1').val();
	var password2 = $('#withdrawelPassword2').val();
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
	var outAccount = $('#withdrawelAccount').val();
	var principal = $('#transferMoney').val();
	var password = $('#withdrawelPassword2').val();

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
	 					queryAccountByNumber(outAccount);

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
	$('#withdrawelAccount').val("");
	$('#transferMoney').val("");
	$('#withdrawelPassword2').val("");
	$('#withdrawelPassword1').val("");

}

//在转账页面点击“取消”按钮
$('#withdrawelTransferLast').click(function(e){
	//隐藏tab3页面
	$('#tab3').css("display","none");
	//清空tab3页面
	clearTab3();
	//显示tab2页面
	$('#tab2').css("display","");
})

//在现金页面点击“取消”按钮
$('#withdrawelLast').click(function(e){
	//隐藏tab2页面
	$('#tab2').css("display","none");
	//清空tab2页面
	clearTab2();
	//显示tab1页面
	$('#tab1').css("display","");
})

//检测“现金”或“转账”业务的不同选择
$('#withdrawelType').change(function(e){

	var type = $(this).val();
	if (type == "转账") {
		$('#withdrawelAccountPassword1').attr("readonly",true);
		$('#withdrawelAccountPassword2').attr("readonly",true);
	}else{
		$('#withdrawelAccountPassword1').attr("readonly",false);
		$('#withdrawelAccountPassword2').attr("readonly",false);
	}

})

//重置时，“下一步”按钮变灰
$('#resetAccountInfo').click(function(e){
	$("#withdrawelNext").attr("disabled",true);
	$('#accountTypeName').val('');
	$('#accountNumber').val('');
	$('#userIDCard3').val('');
	$('#userName_account').val('');
	$('#accountPrincipal').val('');
	$('#accountInterest').val('');
	$('#accountBank').val('');
	$('#accountCreateTime').val('');
	$('#isAccountActive').val('');
	$('#accountActiveTime').val('');
	$('#isAccountFreeze').val('');
	$('#isAccountLost').val('');
	$('#isAccountDelete').val('');
})