package com.blog.backend.domain.user.controller;

import com.blog.backend.domain.user.service.AuthService;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@NoArgsConstructor
public class AuthController {
    private final AuthService authService;
}
