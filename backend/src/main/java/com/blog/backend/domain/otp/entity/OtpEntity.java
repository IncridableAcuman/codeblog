package com.blog.backend.domain.otp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "otps")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email",nullable = false,unique = true)
    private String email;

    @Column(name = "code",nullable = false)
    private String code;

    @Column(name = "expires_at",nullable = false)
    private LocalDateTime expiresAt;

}
