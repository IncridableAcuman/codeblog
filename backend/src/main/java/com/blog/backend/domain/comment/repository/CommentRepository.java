package com.blog.backend.domain.comment.repository;

import com.blog.backend.domain.comment.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    List<CommentEntity> findByBlogIdAndOrderByCreatedAtDesc(Long blogId);
}
