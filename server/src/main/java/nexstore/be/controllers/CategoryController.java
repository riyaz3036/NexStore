package nexstore.be.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import nexstore.be.constants.RouteConstants;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Category.CreateCategoryDTO;
import nexstore.be.dtos.Category.UpdateCategoryDTO;
import nexstore.be.dtos.Response.SuccessMessageResponseDTO;
import nexstore.be.dtos.Response.SuccessObjectResponseDTO;
import nexstore.be.dtos.Response.SuccessPaginationResponseDTO;
import nexstore.be.dtos.swagger.category.CategoryObjectResponseDTO;
import nexstore.be.dtos.swagger.category.CategoryArrayResponseDTO;
import nexstore.be.dtos.swagger.category.CategoryPaginationResponseDTO;
import nexstore.be.entities.Category;
import nexstore.be.mappers.CategoryMapper;
import nexstore.be.services.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.CATEGORY_MODULE)
public class CategoryController {
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryMapper categoryMapper;

    @Operation(summary = "Create a new category", description = "Creates a new category.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category created successfully", content = @Content(schema = @Schema(implementation = CategoryObjectResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_CATEGORY)
    public ResponseEntity<CategoryObjectResponseDTO> createCategory(
            @Valid @RequestBody CreateCategoryDTO dto
    ) {
        CategoryResponseDTO categoryResponse = categoryService.createCategory(dto);
        CategoryObjectResponseDTO responseDto = CategoryObjectResponseDTO.builder().data(categoryResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Create a new category with image", description = "Creates a new category and uploads an image.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category created successfully", content = @Content(schema = @Schema(implementation = CategoryObjectResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(value = RouteConstants.CREATE_CATEGORY, consumes = "multipart/form-data")
    public ResponseEntity<CategoryObjectResponseDTO> createCategoryWithImage(
            @RequestPart(value = "category", required = false) @Valid CreateCategoryDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {
        CategoryResponseDTO categoryResponse = categoryService.createCategory(dto, imageFile);
        CategoryObjectResponseDTO responseDto = CategoryObjectResponseDTO.builder().data(categoryResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all categories (paginated)", description = "Returns a paginated list of all categories.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categories retrieved successfully", content = @Content(schema = @Schema(implementation = SuccessPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_CATEGORIES)
    public ResponseEntity<SuccessPaginationResponseDTO> getAllCategories(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryResponseDTO> categoryPage = categoryService.getAllCategories(pageable);
        SuccessPaginationResponseDTO<CategoryResponseDTO> responseDto = new SuccessPaginationResponseDTO<>(categoryPage.getContent(), categoryPage.getTotalElements(), categoryPage.getTotalPages());
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get category by ID", description = "Returns a category by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category retrieved successfully", content = @Content(schema = @Schema(implementation = SuccessObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_CATEGORY_BY_ID)
    public ResponseEntity<SuccessObjectResponseDTO> getCategory(
            @Parameter(description = "Category ID") @PathVariable("id") String id
    ) {
        CategoryResponseDTO categoryResponse = categoryService.getCategoryById(id);
        SuccessObjectResponseDTO<CategoryResponseDTO> responseDto = new SuccessObjectResponseDTO<>(categoryResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update category by ID", description = "Updates a category by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category updated successfully", content = @Content(schema = @Schema(implementation = SuccessObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })
    @PatchMapping(RouteConstants.UPDATE_CATEGORY_BY_ID)
    public ResponseEntity<SuccessObjectResponseDTO> updateCategory(
            @Parameter(description = "Category ID") @PathVariable("id") String id,
            @Valid @RequestBody UpdateCategoryDTO dto
    ) {
        CategoryResponseDTO categoryResponse = categoryService.updateCategoryById(id, dto);
        SuccessObjectResponseDTO<CategoryResponseDTO> responseDto = new SuccessObjectResponseDTO<>(categoryResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update category by ID with image", description = "Updates a category and uploads a new image.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category updated successfully", content = @Content(schema = @Schema(implementation = SuccessObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })
    @PatchMapping(value = RouteConstants.UPDATE_CATEGORY_BY_ID, consumes = "multipart/form-data")
    public ResponseEntity<SuccessObjectResponseDTO> updateCategoryWithImage(
            @Parameter(description = "Category ID") @PathVariable("id") String id,
            @RequestPart(value = "category", required = false) @Valid UpdateCategoryDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {
        CategoryResponseDTO categoryResponse = categoryService.updateCategoryById(id, dto, imageFile);
        SuccessObjectResponseDTO<CategoryResponseDTO> responseDto = new SuccessObjectResponseDTO<>(categoryResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Test multipart upload", description = "Test endpoint for multipart upload.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Test successful", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class)))
    })
    @PostMapping("/test-multipart")
    public ResponseEntity<SuccessMessageResponseDTO> testMultipart(
            @RequestPart("test") String test,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        String message = "Multipart test successful. Test: " + test;
        if (file != null) {
            message += ", File: " + file.getOriginalFilename();
        }
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(message);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete category by ID", description = "Deletes a category by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Category deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_CATEGORY_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteCategory(
            @Parameter(description = "Category ID") @PathVariable("id") String id
    ) {
        String response = categoryService.deleteCategoryById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}
