package com.hfut.ec.bank.service.ServiceImpl;

import com.hfut.ec.bank.entity.User;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.mapper.UserDao;
import com.hfut.ec.bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @program: bank
 * @description: 对于User的操作
 * @author: 大仙
 * @create: 2018-07-01 14:32
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public int create(User user) {
        return userDao.create(user);
    }

    @Override
    public User findUserByIDNumber(String IDNumber) {
        return userDao.findUserByIDNumber(IDNumber);
    }

    @Override
    //修改用户姓名
    public Result updateUser(User user) {
        Result result=new Result();

        boolean check=userDao.updateUser(user)==1?true:false;
        result.setState(check);
        return result;
    }
}
