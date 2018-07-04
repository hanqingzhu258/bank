package com.hfut.ec.bank.mapper;

import com.hfut.ec.bank.entity.User;
import org.apache.ibatis.annotations.Param;

/**
 * @program: bank
 * @description: 用户dao
 * @author: 大仙
 * @create: 2018-07-01 13:42
 */
public interface UserDao {

    int create(User user);//开户
    User findUserByIDNumber(String IDNumber);
    public int updateUser(User user);//修改用户姓名

}
