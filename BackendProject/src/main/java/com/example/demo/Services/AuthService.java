package com.example.demo.Services;



import com.example.demo.DTO.LoginReq;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.DTO.ProfileResponse;
import com.example.demo.DTO.RegisterReq;



public interface AuthService {


    LoginResponse login(LoginReq request);
    
String registerUser(RegisterReq request);

ProfileResponse getProfileByEmail(String email);


String updateProfile(ProfileResponse request);

String deleteProfile(String email);




}
