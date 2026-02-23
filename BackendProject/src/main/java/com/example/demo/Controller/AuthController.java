package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginReq;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.DTO.ProfileResponse;
import com.example.demo.DTO.RegisterReq;
import com.example.demo.Services.AuthService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterReq request) {
        String result = authService.registerUser(request);
        return ResponseEntity.ok(result);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginReq request) {
        LoginResponse res = authService.login(request);
        return ResponseEntity.ok(res);
    }

    // ✅ GET PROFILE  ⭐⭐⭐
    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile(
            @RequestParam String email) {

        return ResponseEntity.ok(
                authService.getProfileByEmail(email)
        );
    }

    // ✅ UPDATE PROFILE ⭐⭐⭐
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @RequestBody ProfileResponse request) {

        return ResponseEntity.ok(
                authService.updateProfile(request)
        );
    }

    // ✅ DELETE USER
    @DeleteMapping("/profile")
    public String deleteProfile(@RequestParam String email) {
        return authService.deleteProfile(email);
    }
}
