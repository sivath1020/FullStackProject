package com.example.demo.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.DTO.LoginReq;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.DTO.ProfileResponse;
import com.example.demo.DTO.RegisterReq;
import com.example.demo.Model.User;
import com.example.demo.Repossitory.UserRepository;
import com.example.demo.Security.JwtUtil;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

   @Override
    public String registerUser(RegisterReq request) {


        if (request.getName() == null || request.getName().isBlank()) {
            return "Name cannot be empty";
        }
        if (request.getEmail() == null || request.getEmail().isBlank()
                || !request.getEmail().contains("@")) {
            return "Invalid email address";
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered";
        }
        if (request.getPhoneNumber() == null || request.getPhoneNumber().isBlank()) {
            return "Phone number cannot be empty";
        }
        if (request.getDob() == null) {
            return "Date of birth cannot be empty";
        }
        if (request.getPassword() == null|| request.getPassword().length() < 6|| request.getPassword().length() > 12) {
            return "Password must be between 1 and 12 characters";
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setDob(request.getDob());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

@Override
  @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginReq request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return new LoginResponse(false, "User not found", null, null);
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "Invalid password", null, null);
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
    true,
    "Login successful",
    token,
    user.getEmail()
);

    }


    public ProfileResponse getProfileByEmail(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    ProfileResponse res = new ProfileResponse();
    res.setName(user.getName());
    res.setDob(user.getDob());
    res.setPhoneNumber(user.getPhoneNumber());
    res.setEmail(user.getEmail());

    return res;
}


// public ProfileResponse updateProfile(ProfileResponse request) {

//     User user = userRepository.findByEmail(request.getEmail())
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     user.setName(request.getName());
//     user.setDob(request.getDob());
//     user.setPhoneNumber(request.getPhoneNumber());

//     userRepository.save(user);

//     ProfileResponse res = new ProfileResponse();
//     res.setName(user.getName());
//     res.setDob(user.getDob());
//     res.setPhoneNumber(user.getPhoneNumber());
//     res.setEmail(user.getEmail());

//     return res;
// }

public String updateProfile(ProfileResponse request) {

    // Find user
    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return "User not found ❌"; // return error message
    }

    user.setName(request.getName());
    user.setDob(request.getDob());
    user.setPhoneNumber(request.getPhoneNumber());

    userRepository.save(user);

    return "Profile updated successfully "; 
}



    public String deleteProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
        return "Account deleted successfully";
    }













}