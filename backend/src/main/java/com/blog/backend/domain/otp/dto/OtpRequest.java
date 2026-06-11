package com.blog.backend.domain.otp.dto;

import lombok.Data;

@Data
public class OtpRequest {
    private String email;
    private String code;
}
