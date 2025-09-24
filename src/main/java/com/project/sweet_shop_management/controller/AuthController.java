package com.project.sweet_shop_management.controller;

import com.project.sweet_shop_management.model.Users;
import com.project.sweet_shop_management.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Users> saveUser(@RequestBody Users user){
        return new ResponseEntity<>(authService.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user){
        return new ResponseEntity<String>(authService.loginUser(user),HttpStatus.OK);
    }
}
