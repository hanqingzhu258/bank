package com.hfut.ec.bank.controller;

import com.hfut.ec.bank.entity.User;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @program: bank
 * @description: 对于User的控制
 * @author: 大仙
 * @create: 2018-07-01 14:34
 */

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    //开户
    @PostMapping("/create")
    public Result<User> create(@RequestBody User user){

        Result<User> result=new Result();
        int check=userService.create(user);
        boolean state=false;
        if (check==1){
            state=true;
            result.setData(null);
            result.setState(state);
        }
        return result;
    }


    @PostMapping("/findUserByIDNumber")
    //通过身份证号查询user
    public Result<User> findUserByIDNumber(@RequestBody User user1){

      String IDNumber=user1.getIDNumber();
        User user=userService.findUserByIDNumber(IDNumber);
        Result<User> result=new Result();
        boolean state=false;
       /* log.info("data:{}",IDNumber);*/
        if (user!=null){
            state=true;
            result.setData(user);
            result.setState(state);
        }
        return  result;

    }
    @PostMapping("/updateUser")
    public Result updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
}
