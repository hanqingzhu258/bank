package com.hfut.ec.bank.controller;

import com.hfut.ec.bank.entity.Admin;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.service.AdminService;
import com.hfut.ec.bank.service.ServiceImpl.AdminServiceImpl;
import com.hfut.ec.bank.threadlocal.RequestHoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/admin")
@CrossOrigin
@Slf4j
public class AdminController {
    @Autowired
    private AdminService adminService;

    //登陆
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Result login(@RequestBody Admin admin, HttpServletRequest request, HttpSession session){

        System.out.println("Ssssssssssssssss");

        Result result=new Result();
        HttpSession httpSession=null;
        Admin lognAdmin=  adminService.login(admin);
        if (lognAdmin!=null){

            session.setAttribute("adminSession",lognAdmin);
            result.setState(true);
            result.setData(admin);
        }else {
            session.setAttribute("adminSession",null);
        }
        return result;
    }
    //登出
    @RequestMapping(value = "/loginOut",method = RequestMethod.POST)
    @ResponseBody
    public boolean hh(HttpSession session){

        session.removeAttribute("adminSession");
        if (session.getAttribute("adminSession")==null){
            return true;
        }
        return  false;
    }

    @PostMapping(value = "/hh")
    @ResponseBody
    public String hh(){
        return "hh";
    }

}
