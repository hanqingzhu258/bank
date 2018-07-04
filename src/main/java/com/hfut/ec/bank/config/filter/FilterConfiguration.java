package com.hfut.ec.bank.config.filter;

import com.hfut.ec.bank.filter.ThreadLocalFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

@Configuration
public class FilterConfiguration {

    @Bean
    public FilterRegistrationBean httpFilter(){
        FilterRegistrationBean filterRegistrationBean=new FilterRegistrationBean();
        //设置过滤器
        filterRegistrationBean.setFilter(new ThreadLocalFilter());
        //设置路径
        filterRegistrationBean.setUrlPatterns(Collections.singleton("/user/*"));
        filterRegistrationBean.addUrlPatterns("/account/*");
        filterRegistrationBean.addUrlPatterns("/transaction/*");
        filterRegistrationBean.addUrlPatterns("/index");
        return  filterRegistrationBean;
    }
}
