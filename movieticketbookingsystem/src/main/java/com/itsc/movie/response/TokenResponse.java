package com.itsc.movie.response;

public class TokenResponse {
    private String token;
    private String role;

    // Constructor
    public TokenResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
