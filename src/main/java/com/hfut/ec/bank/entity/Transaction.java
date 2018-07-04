package com.hfut.ec.bank.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Transaction {

        private Integer id; //主键
        private String userId;  //外键
        private Integer inAccount;//转入账户
    private Integer outAccount; //转出账户
    private  Integer productId;//产品编号
    private Double money; //金额
    private  String preSaveTime;//预存时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;//交易时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
    private Date withdrawTime;//取款时间
    private Integer isFinished;//完成状态
    private Integer state;//交易状态（0：存款，1：取款，2：转账）

    @Override
    public String toString() {
        return "Transaction{" +
                "money=" + money +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getInAccount() {
        return inAccount;
    }

    public void setInAccount(Integer inAccount) {
        this.inAccount = inAccount;
    }

    public Integer getOutAccount() {
        return outAccount;
    }

    public void setOutAccount(Integer outAccount) {
        this.outAccount = outAccount;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public String getPreSaveTime() {
        return preSaveTime;
    }

    public void setPreSaveTime(String preSaveTime) {
        this.preSaveTime = preSaveTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getWithdrawTime() {
        return withdrawTime;
    }

    public void setWithdrawTime(Date withdrawTime) {
        this.withdrawTime = withdrawTime;
    }

    public Integer getIsFinished() {
        return isFinished;
    }

    public void setIsFinished(Integer isFinished) {
        this.isFinished = isFinished;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
