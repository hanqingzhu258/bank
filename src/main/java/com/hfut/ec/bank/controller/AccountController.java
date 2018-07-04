package com.hfut.ec.bank.controller;

import com.hfut.ec.bank.entity.Account;
import com.hfut.ec.bank.entity.Type;
import com.hfut.ec.bank.entity.User;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.service.AccountService;
import com.hfut.ec.bank.service.TypeService;
import com.hfut.ec.bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: bank
 * @description: 对于account的操作
 * @author: 大仙
 * @create: 2018-07-01 15:06
 */

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserService userService;
    @Autowired
    private TypeService typeService;

    //创建账户
    @PostMapping("/createAccount")
    public Result<Map<String ,Object>> createaccount(@RequestBody Account account){
        System.out.println(account.toString());
        Result<Map<String ,Object>> result=new Result();
        Map<String,Object> map=new HashMap<>();
        User user=userService.findUserByIDNumber(account.getUserId());
        Type type=typeService.findTypeById(account.getTypeId());
        boolean check=accountService.createAccount(account)==1? true:false;
        Account newAccount=accountService.findAccountById(account.getId());
        map.put("account",newAccount);
        map.put("user",user);
        map.put("type",type);
        result.setData(map);
        result.setState(check);

        return result;

    }
    //销户
    @PostMapping("/deleteAccount")
    public  Result<Account> deleteAccount(@RequestBody Account account){
        Result<Account> result=new Result();
        boolean state =false;
        Account checkAccount=accountService.checkAccount(account);
        boolean check=checkAccount==null?false:true;

        result.setData(null);
        if (check==true){
            state= accountService.deleteAccount(account)==1?true:false;
        }
        result.setState(state);
        return result;

    }
    //通过id查询account
    @PostMapping("/findAccountById")
    @CrossOrigin
    public Result<Map<String ,Object>> findAccountById(@RequestBody Account account){


        Result<Map<String ,Object>> result=new Result();
        Map<String,Object> map=new HashMap<>();
        Account newAccount=accountService.findAccountById(account.getId());
        User user=userService.findUserByIDNumber(newAccount.getUserId());
        Type type=typeService.findTypeById(newAccount.getTypeId());
        boolean check=newAccount==null? false:true;
        map.put("account",newAccount);
        map.put("user",user);
        map.put("type",type);
        result.setData(map);
        result.setState(check);

        return result;

    }
    //验证密码是否能销户
    @PostMapping("/checkAccount")
    public Result<Account> checkAccount(@RequestBody Account account){
        Result<Account> result=new Result();
        Account checkAccount=accountService.checkAccount(account);
        boolean check=checkAccount==null?false:true;
        result.setState(check);
        result.setData(checkAccount);
        return result;
    }

    //现金存钱
    @PostMapping("/deposit")
    public Result<Account> deposit(@RequestBody Map<String,Object> map){
        Result<Account> result=new Result();
        boolean check=accountService.depoist(map)==1?true:false;
        result.setState(check);
        result.setData(null);
        return result;
    }

    //转账
    @PostMapping("/transferInAndOut")
    public  Result transferInAndOut(@RequestBody Map map){
        return accountService.transferInAndOut(map);
    }

    //取钱
    @PostMapping("/withdraw")
    public  Result withdraw(@RequestBody Account Account){
        return accountService.withdraw(Account);
    }

    //取钱
    @PostMapping("/findAccountByIDNumber")
    public  Result findAccountByIDNumber(@RequestParam("IDNumber") String IDNumber){
        return accountService.findAccountByIDNumber(IDNumber);
    }

}
