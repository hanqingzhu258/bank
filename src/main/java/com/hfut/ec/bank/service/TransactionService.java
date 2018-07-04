package com.hfut.ec.bank.service;

import com.hfut.ec.bank.entity.Transaction;
import com.hfut.ec.bank.jsonResult.Result;

public interface TransactionService {
    public Result createTransaction(Transaction transaction);//交易记录
    public Result lumpPartialWithdraw(Transaction transaction);//整取
    public int withdrawTransactionByTransfer(Transaction transaction);//转账存现
}
