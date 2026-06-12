package com.blog.backend.domain.blog.controller;

import com.blog.backend.domain.blog.dto.BlogRequest;
import com.blog.backend.domain.blog.dto.BlogResponse;
import com.blog.backend.domain.blog.service.BlogService;
import com.blog.backend.domain.user.entity.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @PostMapping("/blog/create")
    public ResponseEntity<BlogResponse> createBlog(@AuthenticationPrincipal UserEntity user, @Valid @RequestBody BlogRequest request){
        return ResponseEntity.ok(blogService.createBlog(user,request));
    }
    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlog(@AuthenticationPrincipal UserEntity user,@PathVariable Long id){
        return ResponseEntity.ok(blogService.getBlog(user,id));
    }
    @GetMapping
    public ResponseEntity<List<BlogResponse>> getBlogs(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(blogService.getBlogs(user));
    }
    @DeleteMapping("/blog/{id}/remove")
    public ResponseEntity<BlogResponse> removeBlog(@AuthenticationPrincipal UserEntity user,@PathVariable Long id){
        return ResponseEntity.ok(blogService.removeBlog(user,id));
    }
}
