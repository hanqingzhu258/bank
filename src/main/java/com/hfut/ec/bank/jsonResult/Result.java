package com.hfut.ec.bank.jsonResult;

/**
 * @program: bank
 * @description:
 * @author: 大仙
 * @create: 2018-07-02 09:38
 */
public class Result<T> {
    private T data;
    private  String message;
    private boolean state;
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }
}
