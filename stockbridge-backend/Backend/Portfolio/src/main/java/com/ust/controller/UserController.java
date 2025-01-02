package com.ust.controller;

import com.ust.model.UserModel;
import com.ust.service.UserService;
//import jakarta.ws.rs.Path;
import jakarta.ws.rs.Path;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/viewall")
    public List<UserModel> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/get-by-id/{id}")
    public UserModel getUserById(@PathVariable Long id){
        return userService.getByUserId(id);
    }

    @GetMapping("/get-by-username/{username}")
    public UserModel getUserByUsername(@PathVariable String username){
        return userService.getByUsername(username);
    }

    @GetMapping("/get-by-email/{email}")
    public UserModel getUserByEmail(@PathVariable String email){
        return userService.getByByEmail(email);
    }

    @GetMapping("/get-by-phonenumber/{phone}")
    public UserModel getUserByPhoneNumber(@PathVariable String phone){
        return userService.getByByPhoneNumber(phone);
    }

    @PostMapping("/save")
    public UserModel saveUser(@RequestBody UserModel userModel){
        System.out.println("..in Service");
        return userService.createUser(userModel);
    }

    @PutMapping("/update/{username}")
    public UserModel updateUser(@PathVariable String username, @RequestBody UserModel userModel){
        UserModel user= userService.getByUsername(username);
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setUsername(userModel.getUsername());
        user.setEmail(userModel.getEmail());
        user.setPhoneNumber(userModel.getPhoneNumber());
        return userService.updateUser(user);
    }

//    @PutMapping("/update/{userId}")
//    public UserModel updateUserById(@PathVariable  long userId, @RequestBody UserModel userModel){
//        UserModel user= userService.getByUserId(userId);
//        user.setFirstName(userModel.getFirstName());
//        user.setLastName(userModel.getLastName());
//        user.setUsername(userModel.getUsername());
//        user.setEmail(userModel.getEmail());
//        user.setPhoneNumber(userModel.getPhoneNumber());
//        return userService.updateUser(user);
//    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id){
        userService.deleteUser(id);
    }

}
