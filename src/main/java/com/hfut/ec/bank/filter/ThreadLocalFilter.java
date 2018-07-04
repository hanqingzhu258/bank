package com.hfut.ec.bank.filter;

import com.hfut.ec.bank.entity.Admin;
import com.hfut.ec.bank.jsonResult.Result;
import com.hfut.ec.bank.threadlocal.RequestHoder;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class ThreadLocalFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        Result result=new Result();
        HttpServletRequest request= (HttpServletRequest) servletRequest;
        Admin adminSession= (Admin) request.getSession().getAttribute("adminSession");
        if (adminSession==null){
            //session为空，跳转到登陆界面
            result.setState(false);
            result.setMessage("你还没登陆呢");
            /*log.info("错误:{}","请到登陆界面");*/
            //跳转到登陆界面
            request.getRequestDispatcher("/login").forward(servletRequest,servletResponse);
        }else {
            //将session中的登陆信息储存
            RequestHoder.add((Admin) request.getSession().getAttribute("adminSession"));
            System.out.println("session存在");
           /* log.info("session存在:{}",request.getSession().getAttribute("adminSession").toString());*/
            //否则重置session
            request.getSession().setAttribute("adminSession",adminSession);
            filterChain.doFilter(servletRequest,servletResponse);
        }

    }

    @Override
    public void destroy() {

    }
}
