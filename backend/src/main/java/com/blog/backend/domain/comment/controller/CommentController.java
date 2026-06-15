package com.blog.backend.domain.comment.controller;

import com.blog.backend.domain.comment.dto.CommentRequest;
import com.blog.backend.domain.comment.dto.CommentResponse;
import com.blog.backend.domain.comment.service.CommentService;
import com.blog.backend.domain.user.entity.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs/{blogId}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> addComment(
            @AuthenticationPrincipal UserEntity user,
            @PathVariable Long blogId,
            @Valid @RequestBody CommentRequest request
    ){
        return ResponseEntity.ok(commentService.addComment(user,blogId,request));
    }
    @GetMapping
    public ResponseEntity<List<CommentResponse>> getCommentsByBlogId(@PathVariable Long blogId){
        return ResponseEntity.ok(commentService.getCommentByBlogId(blogId));
    }
}
