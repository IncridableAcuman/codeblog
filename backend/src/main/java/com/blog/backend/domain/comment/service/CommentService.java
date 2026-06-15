package com.blog.backend.domain.comment.service;

import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.blog.service.BlogService;
import com.blog.backend.domain.comment.dto.CommentRequest;
import com.blog.backend.domain.comment.dto.CommentResponse;
import com.blog.backend.domain.comment.entity.CommentEntity;
import com.blog.backend.domain.comment.repository.CommentRepository;
import com.blog.backend.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogService blogService;

    @Transactional
    public CommentResponse addComment(UserEntity user, Long blogId, CommentRequest request){
        BlogEntity blog = blogService.findBlogById(blogId);

        CommentEntity comment = new CommentEntity();
        comment.setBlog(blog);
        comment.setUser(user);
        comment.setContent(request.getContent());
        commentRepository.save(comment);

        return CommentResponse.from(comment);
    }
    public List<CommentResponse> getCommentByBlogId(Long blogId){
        List<CommentEntity> comments = commentRepository.findByBlogIdAndOrderByCreatedAtDesc(blogId);

        return comments
                .stream()
                .map(CommentResponse::from).toList();
    }

}
