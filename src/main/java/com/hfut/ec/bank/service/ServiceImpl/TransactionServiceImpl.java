package com.hfut.ec.bank.service.ServiceImpl;

import com.hfut.ec.bank.entity.Transaction;
import com.hfut.ec.bank.enums.ResultEnum;
import com.hfut.ec.bank.exception.MyException;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.mapper.AccountDao;
import com.hfut.ec.bank.mapper.TransactionDao;
import com.hfut.ec.bank.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @program: bank
 * @description: 交易记录
 * @author: 大仙
 * @create: 2018-07-03 21:38
 */
@Service
@Transactional
@Slf4j
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private AccountDao accountDao;




    @Override
    public Result createTransaction(Transaction transaction) {
        Result result=new Result();
        int i=transactionDao.createTransaction(transaction);
        if (i==1){
            result.setState(true);
        }else {
            result.setState(false);
        }

        return result;
    }

    @Override
    public Result lumpPartialWithdraw(Transaction transaction) {
        Result result=new Result();
        //判断金额
        Double deposit=accountDao.findAccountById(transaction.getOutAccount()).getPrincipal();//本金
        Double withdrawMoney=transaction.getMoney();
        int inAccount=transaction.getInAccount();
        int outAccount=transaction.getOutAccount();

        if (deposit>=transaction.getMoney()){
               accountDao.transferOut(withdrawMoney,outAccount);//把金额从老帐户中扣除
               accountDao.deleteAccountWithoutPassword(outAccount);//销户老帐户
               accountDao.updateMoney(deposit-withdrawMoney,inAccount);

              int update=transactionDao.updateTransaction(transaction);


             Double money=transactionDao.selectDeposit(outAccount).getMoney();

             transaction.setMoney(money-withdrawMoney);
             int insert =transactionDao.withdrawTransaction(transaction);
            result.setState(true);
        }else {
            throw  new MyException(ResultEnum.NOMONEY);
        }



        return result;
    }

    @Override
    public int withdrawTransactionByTransfer(Transaction transaction) {


        return 0;
    }
}
