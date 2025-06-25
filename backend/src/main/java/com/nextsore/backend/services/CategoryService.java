package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import com.nextsore.backend.dtos.Category.CreateCategoryDTO;
import com.nextsore.backend.dtos.Category.UpdateCategoryDTO;
import com.nextsore.backend.entities.Category;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.CategoryMapper;
import com.nextsore.backend.repositories.CategoryRepository;
import com.nextsore.backend.uploads.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private FileUploadService fileUploadService;

    /* Service function to add a new a category */
    public CategoryResponseDTO createCategory(CreateCategoryDTO dto ){
        logger.info("Creating Category");

        Category category = new Category();
        category.setDescription(dto.getDescription());
        category.setImage(dto.getImage()); // Set image from DTO

        categoryRepository.save(category);
        return categoryMapper.categoryToCategoryDto(category);
    }

    /* Service function to add a new category with image upload */
    public CategoryResponseDTO createCategory(CreateCategoryDTO dto, MultipartFile imageFile) throws IOException {
        logger.info("Creating Category with Image");

        // Create default DTO if none provided
        if (dto == null) {
            dto = new CreateCategoryDTO();
        }

        Category category = new Category();
        category.setDescription(dto.getDescription());

        // Upload image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadedImagePath = fileUploadService.uploadSingleImage(imageFile);
            category.setImage(uploadedImagePath);
        } else if (dto.getImage() != null) {
            // Use existing image path if provided
            category.setImage(dto.getImage());
        }

        categoryRepository.save(category);
        return categoryMapper.categoryToCategoryDto(category);
    }

    /* Service function to retrieve a category */
    public CategoryResponseDTO getCategoryById(String id ){
        logger.info("Finding Category with id: {}", id);

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Category not found with Id: {}", id);
                    return new DataNotFoundException("Category Not found with the given Id");
                });

        // Debug logging
        logger.info("Category entity - id: {}, description: {}, image: {}",
                category.getId(), category.getDescription(), category.getImage());

        CategoryResponseDTO response = categoryMapper.categoryToCategoryDto(category);

        // Debug logging
        logger.info("CategoryResponseDTO - id: {}, description: {}, image: {}",
                response.getId(), response.getDescription(), response.getImage());

        // Fallback manual mapping if MapStruct is not working
        if (response.getImage() == null && category.getImage() != null) {
            logger.warn("MapStruct mapping failed for image field, using manual mapping");
            response = CategoryResponseDTO.builder()
                    .id(category.getId())
                    .description(category.getDescription())
                    .image(category.getImage())
                    .build();
        }

        return response;
    }


    /* Service function to retrieve all categories */
    public Page<CategoryResponseDTO> getAllCategories(Pageable pageable){
        logger.info("Finding all Categories");
        Page<Category> categoryPage = categoryRepository.findAll(pageable);

        List<CategoryResponseDTO> categoryDTOs = categoryPage.getContent().stream()
                .map(category -> {
                    CategoryResponseDTO dto = categoryMapper.categoryToCategoryDto(category);

                    // Fallback manual mapping if MapStruct is not working
                    if (dto.getImage() == null && category.getImage() != null) {
                        logger.warn("MapStruct mapping failed for image field, using manual mapping for category: {}", category.getId());
                        dto = CategoryResponseDTO.builder()
                                .id(category.getId())
                                .description(category.getDescription())
                                .image(category.getImage())
                                .build();
                    }

                    return dto;
                })
                .collect(Collectors.toList());

        return new PageImpl<>(categoryDTOs, pageable, categoryPage.getTotalElements());
    }


    /* Service function to retrieve all categories without pagination */
    public List<CategoryResponseDTO> getAllCategoriesWithoutPagination(){
        logger.info("Finding all Categories without pagination");
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> {
                    CategoryResponseDTO dto = categoryMapper.categoryToCategoryDto(category);

                    // Fallback manual mapping if MapStruct is not working
                    if (dto.getImage() == null && category.getImage() != null) {
                        logger.warn("MapStruct mapping failed for image field, using manual mapping for category: {}", category.getId());
                        dto = CategoryResponseDTO.builder()
                                .id(category.getId())
                                .description(category.getDescription())
                                .image(category.getImage())
                                .build();
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }


    /* Updates details of a category by id */
    public CategoryResponseDTO updateCategoryById(String id, UpdateCategoryDTO dto){
        logger.info("Updating Category with Id: {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Category not found with Id: {}", id);
                    return new DataNotFoundException("Category Not found with the given Id");
                });

        if(dto.getDescription() != null) category.setDescription(dto.getDescription());
        if(dto.getImage() != null) category.setImage(dto.getImage());

        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.categoryToCategoryDto(updatedCategory);
    }

    /* Updates details of a category by id with image upload */
    public CategoryResponseDTO updateCategoryById(String id, UpdateCategoryDTO dto, MultipartFile imageFile) throws IOException {
        logger.info("Updating Category with Id: {} and Image", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Category not found with Id: {}", id);
                    return new DataNotFoundException("Category Not found with the given Id");
                });

        // Create default DTO if none provided
        if (dto == null) {
            dto = new UpdateCategoryDTO();
        }

        if(dto.getDescription() != null) category.setDescription(dto.getDescription());

        // Handle image upload
        if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old image if exists
            if (category.getImage() != null) {
                fileUploadService.deleteImage(category.getImage());
            }
            String uploadedImagePath = fileUploadService.uploadSingleImage(imageFile);
            category.setImage(uploadedImagePath);
        } else if (dto.getImage() != null) {
            category.setImage(dto.getImage());
        }

        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.categoryToCategoryDto(updatedCategory);
    }

    /* Service function to delete a category by id */
    public String deleteCategoryById(String id){
        logger.info("Deleting Category with Id: {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Category not found with Id: {}", id);
                    return new DataNotFoundException("Category Not found with the given Id");
                });

        // Delete associated image if exists
        if (category.getImage() != null) {
            fileUploadService.deleteImage(category.getImage());
        }

        categoryRepository.delete(category);
        return "Category deleted successfully.";
    }

}
