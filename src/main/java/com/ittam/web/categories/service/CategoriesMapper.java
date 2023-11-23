package com.ittam.web.categories.service;

import com.ittam.web.command.CategoriesVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoriesMapper {
    public List<CategoriesVO> getCategories();

}
