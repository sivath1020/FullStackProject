package com.example.demo.DTO;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private String email;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message, String token, String email) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.email = email;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }
}
