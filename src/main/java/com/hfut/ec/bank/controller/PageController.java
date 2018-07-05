package com.hfut.ec.bank.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * ProjectName: bank <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2018/7/4 17:10 <br/>
 *
 * @author Zhu Hanqing
 * @since JDK 1.8
 */
@Controller
public class PageController {

    @GetMapping(value = "/createAccount")
    public String createAccount(){
        return "createAccount";
    }

    @GetMapping(value = "/deleteAccount")
    public String deleteAccount(){
        return "deleteAccount";
    }

    @GetMapping(value = "/index")
    public String index(){
        return "index";
    }

    @GetMapping(value = "/login")
    public String login(){
        return "login";
    }

    @GetMapping(value = "/demandDeposit")
    public String demandDeposit(){
        return "demandDeposit";
    }

    @GetMapping(value = "/currentWithdrawel")
    public String currentWithdrawel(){
        return "currentWithdrawel";
    }

    @GetMapping(value = "/lumpDeposit")
    public String lumpDeposit(){
        return "lumpDeposit";
    }

    @GetMapping(value = "/lumpPartialWithdraw")
    public String lumpPartialWithdraw(){
        return "lumpPartialWithDraw";
    }

    @GetMapping(value = "/queryUser")
    public String queryUser(){
        return "queryUser";
    }

    @GetMapping(value = "/updateUser")
    public String updateUser(){
        return "updateUser";
    }
}
