package com.blog.backend.domain.blog.entity;

import com.blog.backend.domain.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_likes",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id","blog_id"})
})
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class BlogLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    private BlogEntity blog;

    @Column(name = "created_At")
    private LocalDateTime createdAt;

    @PostPersist
    public void onCreate(){
        createdAt = LocalDateTime.now();
    }
}
