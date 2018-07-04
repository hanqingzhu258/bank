package com.hfut.ec.bank.service.ServiceImpl;

import com.hfut.ec.bank.entity.Type;
import com.hfut.ec.bank.mapper.TypeDao;
import com.hfut.ec.bank.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @program: bank
 * @description: type
 * @author: 大仙
 * @create: 2018-07-02 18:14
 */
@Service
public class TypeServiceImpl implements TypeService {
    @Autowired
    private TypeDao typeDao;

    @Override
    public Type findTypeById(Integer id) {
        return typeDao.findTypeById(id);
    }
}
