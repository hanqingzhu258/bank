package com.hfut.ec.bank.mapper;

import com.hfut.ec.bank.entity.Transaction;
import org.springframework.stereotype.Component;

@Component(value = "transactionDao")
public interface TransactionDao {

    public int createTransaction(Transaction transaction);//交易记录

    public int withdrawTransaction(Transaction transaction);//插入新的

    public int updateTransaction(Transaction transaction);//更新旧的transaction

    public Transaction selectDeposit(Integer inAccount);//获取存款

    public int withdrawTransactionByTransfer(Transaction transaction);//转账存现
}
