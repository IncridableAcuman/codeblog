package com.blog.backend.domain.blog.dto;

import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.blog.entity.enums.Category;
import com.blog.backend.domain.user.dto.UserResponse;
import com.blog.backend.domain.user.entity.UserEntity;

import java.time.LocalDateTime;

public record BlogResponse(
        Long id,
        UserResponse user,
        String title,
        String description,
        String content,
        Category category,
        String coverImage,
        int views,
        int likes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static BlogResponse from(BlogEntity blog, UserEntity user){
        return new BlogResponse(
                blog.getId(),
                UserResponse.from(user),
                blog.getTitle(),
                blog.getDescription(),
                blog.getContent(),
                blog.getCategory(),
                blog.getCoverImage(),
                blog.getViews(),
                blog.getLikes(),
                blog.getCreatedAt(),
                blog.getUpdatedAt()
        );
    }
}
