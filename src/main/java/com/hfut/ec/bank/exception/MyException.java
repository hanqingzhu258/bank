package com.hfut.ec.bank.exception;

import com.hfut.ec.bank.enums.ResultEnum;

/**
 * @program: bank
 * @description: 找不到账户异常
 * @author: 大仙
 * @create: 2018-07-03 16:57
 */
public class MyException extends  RuntimeException {
    private Integer code;
    public MyException(ResultEnum resultEnum){
        super(resultEnum.getMsg());
        this.code=resultEnum.getCode();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
