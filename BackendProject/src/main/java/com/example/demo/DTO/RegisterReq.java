package com.example.demo.DTO;

import lombok.Data;

@Data
public class RegisterReq {
    private String name;
    private String dob;
    private String email;
    private String phoneNumber; // ✅ renamed
    private String password;
}
