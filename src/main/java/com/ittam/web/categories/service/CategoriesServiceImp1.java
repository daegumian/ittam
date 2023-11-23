package com.ittam.web.categories.service;

import com.ittam.web.command.CategoriesVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("categoriesService")
public class CategoriesServiceImp1 implements CategoriesService{

    @Autowired
    private CategoriesMapper categoriesMapper;

    @Override
    public List<CategoriesVO> getCategories() {
        return categoriesMapper.getCategories();
    }


}
