package com.ittam.web.controller;

import com.ittam.web.command.UserVO;
import com.ittam.web.security.config.JWTService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class APIController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserVO vo){

        // 로그인 시도 -> 성공이라고 가정
        System.out.println("login controller : " + vo.toString());
        String token = JWTService.createToken(vo.getUsername(), vo.getRole());
        System.out.println(token);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

}
