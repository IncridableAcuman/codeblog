package com.blog.backend.domain.comment.dto;

import com.blog.backend.domain.comment.entity.CommentEntity;
import com.blog.backend.domain.user.dto.UserResponse;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        UserResponse user,
        String content,
        LocalDateTime createdAt
) {
    public static CommentResponse from(CommentEntity comment){
        return new CommentResponse(
                comment.getId(),
                UserResponse.from(comment.getUser()),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}
