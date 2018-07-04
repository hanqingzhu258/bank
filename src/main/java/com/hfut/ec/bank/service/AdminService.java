package com.hfut.ec.bank.service;

import com.hfut.ec.bank.entity.Admin;
import com.hfut.ec.bank.mapper.AdminDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.dc.pr.PRError;


public interface AdminService {

    public Admin login(Admin admin);
}
