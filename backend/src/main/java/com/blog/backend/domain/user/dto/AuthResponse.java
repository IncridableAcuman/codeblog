package com.blog.backend.domain.user.dto;

public record AuthResponse(
        String accessToken
) {
    public static AuthResponse from(String accessToken){
        return new AuthResponse(accessToken);
    }
}
