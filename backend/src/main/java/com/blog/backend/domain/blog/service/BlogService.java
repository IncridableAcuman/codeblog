package com.blog.backend.domain.blog.service;

import com.blog.backend.domain.blog.dto.BlogRequest;
import com.blog.backend.domain.blog.dto.BlogResponse;
import com.blog.backend.domain.blog.entity.BlogEntity;
import com.blog.backend.domain.blog.entity.BlogLikeEntity;
import com.blog.backend.domain.blog.repository.BlogLikeRepository;
import com.blog.backend.domain.blog.repository.BlogRepository;
import com.blog.backend.domain.user.entity.UserEntity;
import com.blog.backend.exception.custom.CustomBadRequestException;
import com.blog.backend.exception.custom.CustomNotFoundException;
import com.blog.backend.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    private final BlogLikeRepository blogLikeRepository;
    private final FileUtil fileUtil;

    public BlogResponse createBlog(UserEntity user, BlogRequest request){
        BlogEntity blog = new BlogEntity();
        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setUser(user);
        blog.setContent(request.getContent());
        blog.setCategory(request.getCategory());
        blog.setCoverImage(fileUtil.saveFile(request.getImage()));
        blog.setViews(0);
        blog.setLikes(0);
        saveBlog(blog);
        return BlogResponse.from(blog,user,false);
    }

    public BlogResponse getBlog(UserEntity user,Long id){
        BlogEntity blog = findBlogById(id);
        blog.setViews(blog.getViews() + 1);
        saveBlog(blog);
        boolean isLiked = user != null && blogLikeRepository.existsByUserAndBlog(user,blog);
        return BlogResponse.from(blog,user,isLiked);
    }

    public List<BlogResponse> getBlogs(UserEntity user){
        List<BlogEntity> blogs = blogRepository.findByUser(user);
        return blogs
                .stream()
                .map(blog->{
                    boolean isLiked = user != null && blogLikeRepository.existsByUserAndBlog(user,blog);
                    return BlogResponse.from(blog,user,isLiked);
                }).toList();
    }

    @Transactional
    public BlogResponse removeBlog(UserEntity user,Long id){
        BlogEntity blog = findBlogById(id);
        if (!blog.getUser().equals(user)){
            throw new CustomBadRequestException("Only author can delete this post");
        }
        boolean isLiked = blogLikeRepository.existsByUserAndBlog(user,blog);
        blogRepository.delete(blog);
        return BlogResponse.from(blog,user,isLiked);
    }
    public BlogResponse editBlog(UserEntity user,Long id,BlogRequest request){
        BlogEntity blog = findBlogById(id);
        if (!blog.getUser().getId().equals(user.getId())){
            throw new CustomBadRequestException("Only author can edit this post");
        }
        Optional.ofNullable(request.getTitle()).ifPresent(blog::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(blog::setDescription);
        Optional.ofNullable(request.getContent()).ifPresent(blog::setContent);
        Optional.ofNullable(request.getCategory()).ifPresent(blog::setCategory);
        if (request.getImage() != null){
            blog.setCoverImage(fileUtil.saveFile(request.getImage()));
        }
        saveBlog(blog);
        boolean isLiked = blogLikeRepository.existsByUserAndBlog(user,blog);
        return BlogResponse.from(blog,user,isLiked);
    }

    @Transactional
    public String toggleLike(UserEntity user,Long blogLikeId){
        BlogEntity blog = findBlogById(blogLikeId);

        Optional<BlogLikeEntity> existingLike = blogLikeRepository.findByUserAndBlog(user,blog);

        if (existingLike.isPresent()){
            blogLikeRepository.delete(existingLike.get());

            blog.setLikes(Math.max(0,blog.getLikes() - 1));
            saveBlog(blog);

            return "Like removed";
        } else {
            BlogLikeEntity newBlogLike = new BlogLikeEntity();
            newBlogLike.setUser(user);
            newBlogLike.setBlog(blog);
            blogLikeRepository.save(newBlogLike);

            blog.setLikes(blog.getLikes() + 1);
            saveBlog(blog);

            return "Like added";
        }
    }

    public BlogEntity findBlogById(Long id){
        return blogRepository.findById(id).orElseThrow(()-> new CustomNotFoundException("Blog post not found"));
    }

    @Transactional
    public void saveBlog(BlogEntity blog){
        blogRepository.save(blog);
    }
}
