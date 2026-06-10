package com.blog.backend.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = "Token must be required")
    private String token;

    @NotBlank(message = "Password must be required")
    @Size(min = 8,max = 50,message = "Password must be between 8 and 50 characters")
    private String password;

    @NotBlank(message = "Confirm password must be required")
    @Size(min = 8,max = 50,message = "Confirm password must be between 8 and 50 characters")
    private String confirmPassword;
}
