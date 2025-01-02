package com.ust.service;

import com.ust.client.UserModelClient;
import com.ust.dto.UserModelDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCrudServiceImpl {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserModelClient userModelClient;


    public UserModelDto saveUser(UserModelDto user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userModelClient.saveUser(user);
    }
}
