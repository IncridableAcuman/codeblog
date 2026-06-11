package com.blog.backend.domain.otp.service;

import com.blog.backend.domain.otp.entity.OtpEntity;
import com.blog.backend.domain.otp.repository.OtpRepository;
import com.blog.backend.exception.custom.CustomBadRequestException;
import com.blog.backend.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpRepository otpRepository;
    private final MailUtil mailUtil;

    public void sendOtp(String email){
        String code = String.valueOf(1000  + new Random().nextInt(9000));

        OtpEntity otp = otpRepository.findByEmail(email).orElse(new OtpEntity());
        otp.setEmail(email);
        otp.setCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);

        mailUtil.sendMail(email,"Verification code ","Your verification code: " + code);
    }

    public void verifyOtp(String email,String code){
        OtpEntity otp = otpRepository.findByEmail(email).orElseThrow();

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())){
            otpRepository.delete(otp);
            throw new CustomBadRequestException("OTP is expired");
        }
        if (!otp.getCode().equals(code)){
            throw new CustomBadRequestException("Mismatch code");
        }

        otpRepository.delete(otp);
    }
}
