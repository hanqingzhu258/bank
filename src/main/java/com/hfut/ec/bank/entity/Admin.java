package com.hfut.ec.bank.entity;

public class Admin {


//    idint(11) NOT NULL
//    numbervarchar(64) NOT NULL英文字母、下划线、数字，9-18位
//    passwordvarchar(64) NOT NULL英文字母、下划线、数字，9-18位
//    roleint(1) NOT NULL0:普通柜员，1:银行经理，2:银行行长

    private  Integer id;
    private  String number;
    private  String password;
    private  Integer role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
