package com.ittam.web.controller;

import com.ittam.web.categories.service.CategoriesService;
import com.ittam.web.command.CategoriesVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping ("/categories")
    public ResponseEntity<List<CategoriesVO>> categories() {
        List<CategoriesVO> data = categoriesService.getCategories();

        return new ResponseEntity<>(data, HttpStatus.OK);
    }




}
