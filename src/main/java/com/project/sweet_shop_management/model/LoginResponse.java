package com.project.sweet_shop_management.model;

public class LoginResponse {
    private String token;
    private Users user;

    public LoginResponse(String token, Users user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public Users getUser() {
        return user;
    }
}
