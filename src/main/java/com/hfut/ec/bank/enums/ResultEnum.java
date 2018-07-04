package com.hfut.ec.bank.enums;

public enum ResultEnum {
    UNKNOW_ERROR(-1,"未知错误"),
    UNFIND(100,"未找到用户"),
    NOMONEY(101,"你的钱不够了哟"),
    ERROR_PASSWORD(102,"密码错误"),
    ERROR_TRANSFER(103,"转账失败"),
    ;

    //错误编码
    private   Integer code;

    //错误信息
    private  String msg;

    ResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}