package com.ust.controller;

import com.ust.dto.UserModelDto;
import com.ust.model.UserModel;
import com.ust.repository.UserRepository;
import com.ust.service.UserCrudServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserCrudServiceImpl userCrudService;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello User!";
    }


    @PostMapping("/save")
    public UserModel saveUser(@RequestBody UserModel userModel){
        String encodedPassword = passwordEncoder.encode(userModel.getPassword());
        userModel.setPassword(encodedPassword);
        return userRepository.save(userModel);
    }
}
