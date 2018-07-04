package com.hfut.ec.bank.mapper;

import com.hfut.ec.bank.entity.Account;
import com.hfut.ec.bank.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.Map;
@Component(value = "accountDao")
public interface AccountDao {
    public int createAccount(Account account);//创建账户
    public  int deleteAccount(Account account);//销户
    public Account findAccountById(Integer id);//根据id查询account
    public Account checkAccount(Account account);//根据密码进行验证是否销户
    public int depoist(@Param("principal") double principal, @Param("id") Integer id);//现金存钱
    public int transferIn(@Param("principal") double principal, @Param("id") Integer id);//转入
    public int transferOut(@Param("principal") double principal, @Param("id") Integer id);//转出
    public User findAccountByIDNumber(String IDNumber);//根据身份证查询
    public int deleteAccountWithoutPassword(int id);//根据用户id销户

    public int updateMoney(@Param("principal") double principal, @Param("id") Integer id);//更新本金


}
