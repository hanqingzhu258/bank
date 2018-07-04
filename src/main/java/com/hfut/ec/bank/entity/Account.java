package com.hfut.ec.bank.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hfut.ec.bank.entity.User;

import java.util.Date;

public class Account {
    private Integer id;  //主键
    private String number;  //账号
    private String password;//密码
    private String userId;//user id
    private Double principal;//本金
    private Double interest;//利息
    private Integer isDelete;//销户状态
    private  Integer isActive;//激活状态
    private Integer typeId;//产品类型
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;//创建时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
    private Date activeTime;//激活时间
    private  Integer isAutomateDeposit;//是否自动转存
    private Integer isLost;//挂失状态
    private  Integer isFreeze;//冻结状态
    private String accountBank;//开户行
    private  User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getPrincipal() {
        return principal;
    }

    public void setPrincipal(Double principal) {
        this.principal = principal;
    }

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", password='" + password + '\'' +

                ", userId=" + userId +

                '}';
    }



    public Double getInterest() {
        return interest;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getIsActive() {
        return isActive;
    }

    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(Date activeTime) {
        this.activeTime = activeTime;
    }

    public Integer getIsAutomateDeposit() {
        return isAutomateDeposit;
    }

    public void setIsAutomateDeposit(Integer isAutomateDeposit) {
        this.isAutomateDeposit = isAutomateDeposit;
    }

    public Integer getIsLost() {
        return isLost;
    }

    public void setIsLost(Integer isLost) {
        this.isLost = isLost;
    }

    public Integer getIsFreeze() {
        return isFreeze;
    }

    public void setIsFreeze(Integer isFreeze) {
        this.isFreeze = isFreeze;
    }

    public String getAccountBank() {
        return accountBank;
    }

    public void setAccountBank(String accountBank) {
        this.accountBank = accountBank;
    }
}
