package com.blog.backend.util;

import com.blog.backend.exception.custom.CustomBadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class FileUtil {
    @Value("${file.upload.dir}")
    private String  uploadDir;

    public String  saveFile(MultipartFile file){
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            String originalName = file.getOriginalFilename();
            String extension = ".";
            if (originalName != null && originalName.contains(extension)){
                extension = originalName.substring(originalName.indexOf("."));
            }
            String fileName = UUID.randomUUID() + extension;
            Path path = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException exception){
            throw new CustomBadRequestException(exception.getMessage());
        }
    }
    public void removeFile(String image){
        try {
            Path filePath = Paths.get(uploadDir,image);
            Files.deleteIfExists(filePath);
        } catch (IOException e){
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
