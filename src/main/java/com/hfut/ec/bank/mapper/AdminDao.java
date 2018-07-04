package com.hfut.ec.bank.mapper;


import com.hfut.ec.bank.entity.Admin;
import org.apache.ibatis.annotations.Param;

public interface AdminDao {

    public Admin login(Admin admin);
}
