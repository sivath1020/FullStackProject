package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String phone;
    private String house;
    private String street;
    private String city;
    private String state;
    private String pincode;

    // 🔹 optional: link with user email
    private String userEmail;
}