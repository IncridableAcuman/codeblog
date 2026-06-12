package com.blog.backend.domain.user.controller;

import com.blog.backend.domain.otp.dto.OtpRequest;
import com.blog.backend.domain.user.dto.*;
import com.blog.backend.domain.user.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request){
        authService.register(request);
        return ResponseEntity.ok("OTP verification sent to email");
    }
    @PostMapping("/verify-register")
    public ResponseEntity<String> verifyRegister(@RequestBody OtpRequest request){
        authService.verifyRegisterOtp(request);
        return ResponseEntity.ok("Your account successfully activated");
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.login(request,response));
    }
    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue(name = "refreshToken",required = false) String refreshToken,HttpServletResponse response){
        return ResponseEntity.ok(authService.refresh(refreshToken,response));
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name = "refreshToken",required = false) String refreshToken,HttpServletResponse response){
        authService.logout(refreshToken,response);
        return ResponseEntity.ok("Logged out");
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request){
        authService.forgotPassword(request);
        return ResponseEntity.ok("Reset password link sent to email");
    }
    @PostMapping("/verify-forgot-password")
    public ResponseEntity<AuthResponse> verifyForgotPassword(@RequestBody OtpRequest request){
        return ResponseEntity.ok(authService.verifyForgotPasswordOtp(request));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request){
        authService.resetPassword(request);
        return ResponseEntity.ok("Password updated successfully");
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(){
        return ResponseEntity.ok(authService.getMe());
    }
}
