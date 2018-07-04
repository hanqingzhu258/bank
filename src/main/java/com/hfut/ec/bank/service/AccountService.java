package com.hfut.ec.bank.service;

import com.hfut.ec.bank.entity.Account;
import com.hfut.ec.bank.jsonResult.Result;

import java.util.Map;

public interface AccountService {
    public int createAccount(Account account);
    public int deleteAccount(Account account);
    public Account findAccountById(Integer id);//根据id查询account
    public Account checkAccount(Account account);//根据密码进行验证是否销户
    public int depoist(Map<String, Object> map);//现金存钱
    public Result transferInAndOut(Map<String, Object> map);//转账
    public Result withdraw(Account account);//取钱
    public Result findAccountByIDNumber(String IDNumber);//根据身份证查询

}
