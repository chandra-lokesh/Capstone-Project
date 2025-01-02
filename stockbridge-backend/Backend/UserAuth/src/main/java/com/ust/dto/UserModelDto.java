package com.ust.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserModelDto {
    private long userId;
    private String username;
    private String role;
    private String email;
    private String password;
    private String phoneNumber;
    private boolean isDeleted = false;
}
