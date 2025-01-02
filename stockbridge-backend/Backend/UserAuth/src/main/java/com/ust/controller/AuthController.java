package com.ust.controller;

import com.ust.dto.JwtToken;
import com.ust.dto.UserCredentials;
import com.ust.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserCredentials userCredentials){
        return authService.authenticate(userCredentials);
    }

    @PostMapping("/validate")
    public void validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
    }
}
