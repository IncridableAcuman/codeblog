package com.blog.backend.domain.otp.repository;

import com.blog.backend.domain.otp.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpEntity,Long> {
    Optional<OtpEntity> findByEmail(String email);
    void deleteByEmail(String email);
}
