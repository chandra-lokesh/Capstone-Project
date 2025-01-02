package com.ust.service;

import com.ust.model.UserModel;
import com.ust.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public List<UserModel> getAllUsers(){
        return userRepo.findAll();
    }

    public UserModel createUser(UserModel userModel){
        return userRepo.save(userModel);
    }

    public UserModel getByUserId(long id){
        return userRepo.findByUserId(id);
    }

    public UserModel getByUsername(String username){
        return userRepo.findByUsername(username);
    }

    public UserModel getByByEmail(String email){
        return userRepo.findByEmail(email);
    }

    public UserModel getByByPhoneNumber(String phoneNumber){
        return userRepo.findByPhoneNumber(phoneNumber);
    }

    public UserModel updateUser(UserModel userModel){
        return userRepo.save(userModel);
    }

    public void deleteUser(long id){
        UserModel user = userRepo.findByUserId(id);
        user.setDeleted(true);
        userRepo.save(user);
    }

}
