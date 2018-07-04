package com.hfut.ec.bank.threadlocal;

import com.hfut.ec.bank.entity.Admin;

//线程变量类
public class RequestHoder {

    private static final ThreadLocal<Admin> threadlocal=new ThreadLocal<Admin>();

    public static void add(Admin admin){
        threadlocal.set(admin);
    }
    public static Admin get(){
        return threadlocal.get();
    }
    public static void remove(){
        threadlocal.remove();
    }
}
