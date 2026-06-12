package com.blog.backend.domain.user.dto;

import com.blog.backend.domain.user.entity.UserEntity;
import com.blog.backend.domain.user.entity.enums.Role;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        Role role,
        String avatarUrl
) {
    public static UserResponse from(UserEntity user){
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.getAvatarUrl()
        );
    }
}
