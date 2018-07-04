package com.hfut.ec.bank.service.ServiceImpl;

import com.hfut.ec.bank.entity.Admin;
import com.hfut.ec.bank.mapper.AdminDao;
import com.hfut.ec.bank.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDao adminDao;

    @Override
    public Admin login(Admin admin) {
        Admin loginAdmin=adminDao.login(admin);
        if (loginAdmin!=null){

        }
        return loginAdmin;
    }
}
