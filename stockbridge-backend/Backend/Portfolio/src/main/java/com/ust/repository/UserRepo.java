package com.ust.repository;

import com.ust.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    public UserModel findByUserId(long id);
    public UserModel findByUsername(String username);
    public UserModel findByEmail(String email);
    public UserModel findByPhoneNumber(String phoneNumber);
}
