package com.blog.backend.domain.blog.repository;

import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity,Long> {
    List<BlogEntity> findByUser(UserEntity user);
}
