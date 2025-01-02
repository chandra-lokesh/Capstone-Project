package com.ust.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private String firstName;
    private String lastName;
    private String username;
    private String role;
    private String email;
    private String password;
    private String phoneNumber;
    private boolean isDeleted = false;
}
