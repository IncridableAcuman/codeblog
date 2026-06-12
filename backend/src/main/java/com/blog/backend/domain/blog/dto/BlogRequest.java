package com.blog.backend.domain.blog.dto;

import com.blog.backend.domain.blog.entity.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BlogRequest {
    @NotBlank(message = "Title must be required")
    @Size(min = 3,max = 255,message = "Title must be between 3 and 255 characters")
    private String title;

    @NotBlank(message = "Description must be required")
    @Size(min = 3,max = 255,message = "Description must be between 5 and 255 characters")
    private String description;

    @NotBlank(message = "Content must be required")
    @Size(min = 3,max = 255,message = "Content must be between 5 and 500 characters")
    private String content;

    @NotNull(message = "Category must be required")
    private Category category;

    @NotNull(message = "Image must be required")
    private MultipartFile image;
}
