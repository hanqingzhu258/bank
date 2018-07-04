package com.hfut.ec.bank.config.ExceptionHandle;

import com.hfut.ec.bank.exception.MyException;
import com.hfut.ec.bank.jsonResult.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @program: bank
 * @description: 异常捕获类
 * @author: 大仙
 * @create: 2018-07-03 17:03
 */
@ControllerAdvice
public class ExceptionHandle {

    @ExceptionHandler(value = MyException.class)
    @ResponseBody
    public Result handle(Exception e){
        if (e instanceof MyException) {
            MyException myException = (MyException) e;
            Result result = new Result();
            result.setCode(myException.getCode());
            result.setMessage(myException.getMessage());
            return result;
        }else {
            Result result = new Result();
            result.setCode(-1);
            result.setMessage("未知错误");
            return result;
        }
    }
}
