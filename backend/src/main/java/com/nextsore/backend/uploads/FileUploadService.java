package com.nextsore.backend.uploads;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadService {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadService.class);
    private static final String UPLOAD_DIR = "uploads";
    private static final List<String> ALLOWED_EXTENSIONS = List.of(".jpg", ".jpeg", ".png", ".gif", ".webp");

    public List<String> uploadImages(List<MultipartFile> files) throws IOException {
        List<String> uploadedPaths = new ArrayList<>();

        // Create uploads directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            // Validate file extension
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || !isValidImageFile(originalFilename)) {
                logger.warn("Invalid file type: {}", originalFilename);
                continue;
            }

            // Generate unique filename
            String fileExtension = getFileExtension(originalFilename);
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath);

            // Store relative path
            String relativePath = UPLOAD_DIR + "/" + uniqueFilename;
            uploadedPaths.add(relativePath);

            logger.info("File uploaded successfully: {}", relativePath);
        }

        return uploadedPaths;
    }

    public String uploadSingleImage(MultipartFile file) throws IOException {
        List<String> paths = uploadImages(List.of(file));
        return paths.isEmpty() ? null : paths.get(0);
    }

    private boolean isValidImageFile(String filename) {
        String extension = getFileExtension(filename).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex > 0 ? filename.substring(lastDotIndex) : "";
    }

    public void deleteImage(String imagePath) {
        try {
            Path path = Paths.get(imagePath);
            if (Files.exists(path)) {
                Files.delete(path);
                logger.info("Image deleted successfully: {}", imagePath);
            }
        } catch (IOException e) {
            logger.error("Error deleting image: {}", imagePath, e);
        }
    }

    public void deleteImages(List<String> imagePaths) {
        for (String imagePath : imagePaths) {
            deleteImage(imagePath);
        }
    }
}
