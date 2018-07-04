var prex_url = "";

$("#adminLogin").click(function (e) {

        if ($('#roleSelection').val()=="") {
            alert("请选择用户身份！")
        }else{
            $.ajax({
                url: prex_url+"/admin/login",
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                async: false,
                cache: false,
                xhrFields: {  
                    withCredentials: true // 设置运行跨域操作  
                },
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    "number": $("#adminNumber").val(),
                    "password": $("#adminPassword").val(),
                    "role":$("#roleSelection").val()
                }),
                success: function(data) {
                    console.log(data)
                    if(data.state){

                        /*alert(data.message);*/
                        alert("登录成功");

                        if (data.data.role=="0") {
                            window.location.href = "/index";
                        }else if(data.data.role== "1"){
                            window.location.href = "#";
                        }else{
                            window.location.href = "#";
                        }
                    } else {
                        alert("用户名或密码不正确！")
                    }
                },
                error: function (data) {           
                    alert("服务器响应时间过长，请稍后重试！")
                }
            })
        }

        
    }
);
