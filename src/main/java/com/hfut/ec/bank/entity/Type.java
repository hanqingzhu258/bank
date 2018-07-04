package com.hfut.ec.bank.entity;

/**
 * @program: bank
 * @description: type
 * @author: 大仙
 * @create: 2018-07-02 18:12
 */
public class Type {
    private  Integer id;
    private  String name;
    private String number;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
