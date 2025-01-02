package com.ust.service;

import com.ust.dto.JwtToken;
import com.ust.dto.UserCredentials;
import com.ust.model.UserModel;
import com.ust.repository.UserRepository;
import com.ust.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    public Map<String, String> authenticate(UserCredentials userCredentials){
        UserModel userModel = userRepository.findByUsername(userCredentials.getUsername()).orElse(null);
        System.out.println(userModel);
        if(!passwordEncoder.matches(userCredentials.getPassword(), userModel.getPassword())){
            throw new RuntimeException("Invalid Credentials");
        }
        String jwtToken = jwtUtil.generateTokenFromUsername(userCredentials.getUsername());
        System.out.println(jwtToken);
        Map<String, String> hm = new HashMap<>();
        hm.put("token", jwtToken);
        hm.put("userId", userModel.getUserId()+"");
        hm.put("username", userModel.getUsername());
        return hm;
    }

    public void validateToken(String token) {
        String username = jwtUtil.generateUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    public void logout(){
        SecurityContextHolder.clearContext();
    }

}
