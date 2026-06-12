package com.blog.backend.domain.user.service;

import com.blog.backend.domain.otp.dto.OtpRequest;
import com.blog.backend.domain.otp.service.OtpService;
import com.blog.backend.domain.token.service.TokenService;
import com.blog.backend.domain.user.dto.*;
import com.blog.backend.domain.user.entity.UserEntity;
import com.blog.backend.domain.user.entity.enums.Role;
import com.blog.backend.domain.user.repository.UserRepository;
import com.blog.backend.exception.custom.CustomBadRequestException;
import com.blog.backend.exception.custom.CustomNotFoundException;
import com.blog.backend.security.util.CookieUtil;
import com.blog.backend.security.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final CookieUtil cookieUtil;
    private final OtpService otpService;

    @Transactional
    public void register(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new CustomBadRequestException("User already exist");}
        UserEntity user = new UserEntity();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setActive(false);
        userRepository.save(user);
        otpService.sendOtp(request.getEmail());
    }
    @Transactional
    public void verifyRegisterOtp(OtpRequest request){
        otpService.verifyOtp(request.getEmail(), request.getCode());
        UserEntity user = findUserByEmail(request.getEmail());
        user.setActive(true);
        userRepository.save(user);
    }
    public AuthResponse login(LoginRequest request,HttpServletResponse response){
        UserEntity user = findUserByEmail(request.getEmail());
        if (!user.isActive()){
            throw new CustomBadRequestException("User is not active");}
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new CustomBadRequestException("Password doesn't match");}
        return authResponse(user,response);
    }

    public AuthResponse refresh(String refreshToken,HttpServletResponse response){
        if (!jwtUtil.validateToken(refreshToken)){
            throw new CustomBadRequestException("Invalid or expired token");}
        UserEntity user = getUserFromToken(refreshToken);
        return authResponse(user,response);
    }

    public void logout(String refreshToken,HttpServletResponse response){
        UserEntity user = getUserFromToken(refreshToken);
        tokenService.removeToken(user);
        cookieUtil.clearCookie(response);
    }
    public void forgotPassword(ForgotPasswordRequest request){
        UserEntity user = findUserByEmail(request.getEmail());
        otpService.sendOtp(user.getEmail());
    }
    public AuthResponse verifyForgotPasswordOtp(OtpRequest request){
        otpService.verifyOtp(request.getEmail(), request.getCode());
        UserEntity user = findUserByEmail(request.getEmail());
        String resetToken = jwtUtil.generateAccessToken(user);
        return AuthResponse.from(resetToken);
    }
    @Transactional
    public void resetPassword(ResetPasswordRequest request){
        if (!request.getPassword().equals(request.getConfirmPassword())){
            throw new CustomBadRequestException("Password does not match");}
        if (!jwtUtil.validateToken(request.getToken())){
            throw new CustomBadRequestException("Invalid or expired token");}
        UserEntity user = getUserFromToken(request.getToken());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        saveUser(user);
    }
    public UserEntity getUserFromToken(String token){
        String email = jwtUtil.extractSubject(token);
        return findUserByEmail(email);
    }
    public UserEntity findUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new  CustomNotFoundException("User not found"));
    }
    public void saveUser(UserEntity user){
        userRepository.save(user);
    }
    public AuthResponse authResponse(UserEntity user,HttpServletResponse response){
        String newAccessToken = jwtUtil.generateAccessToken(user);
        String newRefreshToken = jwtUtil.generateRefreshToken(user);
        tokenService.saveToken(user,newRefreshToken);
        cookieUtil.addCookie(newRefreshToken,response);
        return AuthResponse.from(newAccessToken);
    }
    public UserResponse getMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;
        Object principal=authentication.getPrincipal();
        String email;
        try {
            assert principal != null;
            email = ((UserDetails) principal).getUsername();
        } catch (Exception e) {
            email = principal.toString();
        }
        UserEntity user = findUserByEmail(email);
        return UserResponse.from(user);
    }
}
