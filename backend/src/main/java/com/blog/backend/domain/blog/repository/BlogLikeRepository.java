package com.blog.backend.domain.blog.repository;

import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.blog.entity.BlogLikeEntity;
import com.blog.backend.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogLikeRepository extends JpaRepository<BlogLikeEntity,Long> {
    Optional<BlogLikeEntity> findByUserAndBlog(UserEntity user,BlogEntity blog);
    boolean existsByUserAndBlog(UserEntity user, BlogEntity blog);
}
