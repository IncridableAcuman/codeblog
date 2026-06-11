package com.blog.backend.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Full name must be required")
    @Size(min = 3,max = 100,message = "Full name must be between 3 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email must be required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password must be required")
    @Size(min = 8,max = 50,message = "Password must be between 8 and 50 characters")
    private String password;
}
