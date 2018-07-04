package com.hfut.ec.bank.service.ServiceImpl;

import com.hfut.ec.bank.entity.Account;
import com.hfut.ec.bank.entity.User;
import com.hfut.ec.bank.enums.ResultEnum;
import com.hfut.ec.bank.exception.MyException;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.mapper.AccountDao;
import com.hfut.ec.bank.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * @program: bank
 * @description: 创建账户
 * @author: 大仙
 * @create: 2018-07-01 15:05
 */
@Service
@Transactional
@Slf4j
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;

    @Override
    public int createAccount(Account account) {
        return accountDao.createAccount(account);
    }

    @Override
    public int deleteAccount(Account account) {
        return accountDao.deleteAccount(account);
    }

    @Override
    public Account findAccountById(Integer id) {
        Account account=accountDao.findAccountById(id);
        if (account==null){
            throw  new MyException(ResultEnum.UNFIND);
        }

        return account;
    }

    @Override
    public Account checkAccount(Account account) {
        return accountDao.checkAccount(account);
    }

    @Override
    //现金存款
    public int depoist(Map<String,Object> map) {

        double principal= Double.valueOf(map.get("principal").toString());
        Integer id= Integer.parseInt(map.get("id").toString());
        return accountDao.depoist(principal,id);

    }

    //转账
    @Override
    public Result transferInAndOut(Map<String, Object> map) {
        Result result=new Result();

       Integer inId= Integer.parseInt( map.get("inId").toString());//转入账号
        Integer outId= Integer.parseInt(map.get("outId").toString()) ;//转出账号
        Double principal= Double.valueOf (map.get("principal").toString());//转账金额
        String password=  map.get("password").toString();//转入账号密码


        Double inPrincipal=accountDao.findAccountById(outId).getPrincipal();//卡内余额

        Account account=new Account();
        account.setPassword(password);
        account.setId(inId);
        boolean accountCheck=accountDao.checkAccount(account)==null?false:true;
        //先验证密码
        if (accountCheck!=true){
            result.setMessage("密码错误！");
            result.setState(accountCheck);
        }else {
             //判断转账账户是否存在
            if (accountDao.findAccountById(outId)==null){
                result.setMessage("账户不存在！");
                result.setState(false);
            }else {
                //判断卡内余额是否足够
                if (inPrincipal<principal){
                    result.setMessage("余额不足！");
                    result.setState(false);
                }else {
                    int transferIn=accountDao.transferIn(principal,inId);
                    int transferOut=accountDao.transferOut(principal,outId);
                    if (transferIn==1 && transferOut==1 ){
                        result.setState(true);
                    }else {
                        result.setState(false);
                        result.setMessage("转账失败");
                    }

                }
            }

        }


        return result;
    }

    //取钱
    @Override
    public Result withdraw(Account account) {
        Result result=new Result();
        Integer id=account.getId();
        Double principal=account.getPrincipal();
        String password=account.getPassword();
        Double inPrincipal=accountDao.findAccountById(account.getId()).getPrincipal();

        //验证密码
        if (accountDao.checkAccount(account)==null){
            throw  new MyException(ResultEnum.ERROR_PASSWORD);
        }else {
            //判断金额
            if (inPrincipal<principal){
                throw new MyException(ResultEnum.NOMONEY);
            }else {

                int i=accountDao.transferOut(principal,id);
                if (i==1){
                    result.setState(true);
                }else {
                    throw new MyException(ResultEnum.UNKNOW_ERROR);
                }
            }
        }

        return result;
    }

    @Override
    public Result findAccountByIDNumber(String IDNumber) {
        Result result=new Result();
        User user=accountDao.findAccountByIDNumber(IDNumber);
        if (user!=null){
            result.setState(true);
            result.setData(user);
        }else {
            throw new MyException(ResultEnum.UNFIND);
        }
        return result;
    }


}
