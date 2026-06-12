package com.blog.backend.domain.blog.service;

import com.blog.backend.domain.blog.dto.BlogRequest;
import com.blog.backend.domain.blog.dto.BlogResponse;
import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.blog.repository.BlogRepository;
import com.blog.backend.domain.user.entity.UserEntity;
import com.blog.backend.exception.custom.CustomBadRequestException;
import com.blog.backend.exception.custom.CustomNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public BlogResponse createBlog(UserEntity user, BlogRequest request){
        BlogEntity blog = new BlogEntity();
        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setUser(user);
        blog.setContent(request.getContent());
        blog.setCategory(request.getCategory());
        blog.setViews(1);
        blog.setLikes(1);
        saveBlog(blog);
        return BlogResponse.from(blog,user);
    }

    public BlogResponse getBlog(UserEntity user,Long id){
        BlogEntity blog = findBlogById(id);
        return BlogResponse.from(blog,user);
    }

    public List<BlogResponse> getBlogs(UserEntity user){
        List<BlogEntity> blogs = blogRepository.findByUser(user);
        return blogs
                .stream()
                .map(blog-> BlogResponse.from(blog,user)).toList();
    }

    @Transactional
    public BlogResponse removeBlog(UserEntity user,Long id){
        BlogEntity blog = findBlogById(id);
        if (!blog.getUser().equals(user)){
            throw new CustomBadRequestException("Only author can delete this post");
        }
        blogRepository.delete(blog);
        return BlogResponse.from(blog,user);
    }
    public BlogEntity findBlogById(Long id){
        return blogRepository.findById(id).orElseThrow(()-> new CustomNotFoundException("Blog post not found"));
    }

    @Transactional
    public void saveBlog(BlogEntity blog){
        blogRepository.save(blog);
    }
}
