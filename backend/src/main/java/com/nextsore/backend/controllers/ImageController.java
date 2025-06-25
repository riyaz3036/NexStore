package com.nextsore.backend.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class ImageController {

    private final String uploadDir = "uploads";

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Construct the file path
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            // Create resource from file path
            Resource resource = new UrlResource(filePath.toUri());

            // Check if file exists and is readable
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // Determine content type
            String contentType = null;
            try {
                contentType = Files.probeContentType(filePath);
            } catch (IOException ex) {
                // Fallback content type determination
                String fileName = resource.getFilename();
                if (fileName != null) {
                    if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".jpeg")) {
                        contentType = MediaType.IMAGE_JPEG_VALUE;
                    } else if (fileName.toLowerCase().endsWith(".png")) {
                        contentType = MediaType.IMAGE_PNG_VALUE;
                    } else if (fileName.toLowerCase().endsWith(".gif")) {
                        contentType = MediaType.IMAGE_GIF_VALUE;
                    } else if (fileName.toLowerCase().endsWith(".webp")) {
                        contentType = "image/webp";
                    }
                }
            }

            // Default to octet-stream if content type couldn't be determined
            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            // Build response with appropriate headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setCacheControl("max-age=3600"); // Cache for 1 hour

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Image service is running");
    }
}