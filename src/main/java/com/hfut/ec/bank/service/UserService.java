package com.hfut.ec.bank.service;

import com.hfut.ec.bank.entity.User;
import com.hfut.ec.bank.jsonResult.Result;

public interface UserService {
    public int create(User user);
    public User findUserByIDNumber(String IDNumber);//通过身份证号查询user
    public Result updateUser(User user);
}
