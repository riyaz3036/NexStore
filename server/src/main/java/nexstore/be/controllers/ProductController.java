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
import nexstore.be.dtos.Product.CreateProductDTO;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.dtos.Product.UpdateProductDTO;
import nexstore.be.dtos.Response.SuccessMessageResponseDTO;
import nexstore.be.dtos.swagger.product.ProductArrayResponseDTO;
import nexstore.be.dtos.swagger.product.ProductObjectResponseDTO;
import nexstore.be.dtos.swagger.product.ProductPaginationResponseDTO;
import nexstore.be.entities.Product;
import nexstore.be.mappers.ProductMapper;
import nexstore.be.services.CategoryService;
import nexstore.be.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.PRODUCT_MODULE)
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductMapper productMapper;

    @Operation(summary = "Create a new product", description = "Creates a new product.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product created successfully", content = @Content(schema = @Schema(implementation = ProductObjectResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_PRODUCT)
    public ResponseEntity<ProductObjectResponseDTO> createProduct(
            @Valid @RequestBody CreateProductDTO dto
    ) {
        ProductResponseDTO productResponse = productService.createProduct(dto);
        ProductObjectResponseDTO responseDto = ProductObjectResponseDTO.builder().data(productResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Create multiple products", description = "Creates multiple products in bulk.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Products created successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_MULTIPLE_PRODUCT)
    public ResponseEntity<SuccessMessageResponseDTO> createMultipleProduct(
            @Valid @RequestBody CreateProductDTO[] dtos
    ) {
        String productResponse = productService.createMultipleProduct(dtos);
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(productResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all products (paginated)", description = "Returns a paginated list of all products.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Products retrieved successfully", content = @Content(schema = @Schema(implementation = ProductPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_PRODUCTS)
    public ResponseEntity<ProductPaginationResponseDTO> getAllProducts(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productService.getAllProducts(pageable);
        List<ProductResponseDTO> productDTOs = productPage.getContent().stream().map(product -> {
            CategoryResponseDTO catDto = categoryService.getCategoryById(product.getCategoryId());
            return productMapper.productToProductDto(product, catDto);
        }).collect(Collectors.toList());
        ProductPaginationResponseDTO responseDto = ProductPaginationResponseDTO.builder()
                .data(productDTOs)
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all products (no pagination)", description = "Returns all products without pagination.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Products retrieved successfully", content = @Content(schema = @Schema(implementation = ProductArrayResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_PRODUCTS_WITHOUT_PAGINATION)
    public ResponseEntity<ProductArrayResponseDTO> getAllProductsWithoutPagination() {
        List<ProductResponseDTO> products = productService.getAllProductsWithoutPagination();
        ProductArrayResponseDTO responseDto = ProductArrayResponseDTO.builder()
                .data(products)
                .count(products.size())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get product by ID", description = "Returns a product by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product retrieved successfully", content = @Content(schema = @Schema(implementation = ProductObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_PRODUCT_BY_ID)
    public ResponseEntity<ProductObjectResponseDTO> getProduct(
            @Parameter(description = "Product ID") @PathVariable("id") String id
    ) {
        ProductResponseDTO productResponse = productService.getProductById(id);
        ProductObjectResponseDTO responseDto = ProductObjectResponseDTO.builder().data(productResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update product by ID", description = "Updates a product by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product updated successfully", content = @Content(schema = @Schema(implementation = ProductObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @PatchMapping(RouteConstants.UPDATE_PRODUCT_BY_ID)
    public ResponseEntity<ProductObjectResponseDTO> updateProduct(
            @Parameter(description = "Product ID") @PathVariable("id") String id,
            @Valid @RequestBody UpdateProductDTO dto
    ) {
        ProductResponseDTO productResponse = productService.updateProductById(id, dto);
        ProductObjectResponseDTO responseDto = ProductObjectResponseDTO.builder().data(productResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete product by ID", description = "Deletes a product by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_PRODUCT_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteProduct(
            @Parameter(description = "Product ID") @PathVariable("id") String id
    ) {
        String response = productService.deleteProductById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}
