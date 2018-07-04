package com.hfut.ec.bank.controller;

import com.hfut.ec.bank.entity.Transaction;
import com.hfut.ec.bank.enums.ResultEnum;
import com.hfut.ec.bank.exception.MyException;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.service.AccountService;
import com.hfut.ec.bank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: bank
 * @description: 交易控制
 * @author: 大仙
 * @create: 2018-07-03 21:47
 */
@RestController
@RequestMapping("/transaction")
@CrossOrigin
public class TransactionController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/lumpDeposit")
    public Result lumpDeposit(@RequestBody Transaction transaction){
        Map map=new HashMap();
        map.put("id",transaction.getInAccount());
        map.put("principal",transaction.getMoney());
        Result result=new Result();
        Integer inAccount=transaction.getInAccount();
        Integer typeId=accountService.findAccountById(inAccount).getTypeId();

        if (typeId==4){

            result=transactionService.createTransaction(transaction);
            if (result.getState()){

              int i=accountService.depoist(map);
              if (i==1){
                  result.setState(true);
              }else {
                  throw  new MyException(ResultEnum.ERROR_TRANSFER);
              }
            }

        }else {
            result.setState(false);
        }
        return result;
    }

    @PostMapping("/lumpPartialWithdraw")
    public Result lumpPartialWithdraw(@RequestBody Transaction transaction){
        return transactionService.lumpPartialWithdraw(transaction);
    }
}
