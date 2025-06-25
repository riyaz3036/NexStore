package com.nextsore.backend.controllers;

import com.nextsore.backend.constants.RouteConstants;
import com.nextsore.backend.dtos.Product.ExpandedProductDTO;
import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import com.nextsore.backend.dtos.Response.SuccessMessageResponseDTO;
import com.nextsore.backend.dtos.Response.SuccessObjectResponseDTO;
import com.nextsore.backend.dtos.Variant.CreateVariantDTO;
import com.nextsore.backend.dtos.Variant.UpdateVariantDTO;
import com.nextsore.backend.dtos.Variant.VariantFilterDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.dtos.swagger.variant.VariantArrayResponseDTO;
import com.nextsore.backend.dtos.swagger.variant.VariantObjectResponseDTO;
import com.nextsore.backend.dtos.swagger.variant.VariantPaginationResponseDTO;
import com.nextsore.backend.entities.Variant;
import com.nextsore.backend.mappers.VariantMapper;
import com.nextsore.backend.services.ProductService;
import com.nextsore.backend.services.VariantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.VARIANT_MODULE)
public class VariantController {
    private static final Logger logger = LoggerFactory.getLogger(VariantController.class);

    @Autowired
    private VariantService variantService;

    @Autowired
    private ProductService productService;

    @Autowired
    private VariantMapper variantMapper;

    @Operation(summary = "Create a new variant", description = "Creates a new variant for a product.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant created successfully", content = @Content(schema = @Schema(implementation = VariantObjectResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_VARIANT)
    public ResponseEntity<VariantObjectResponseDTO> createVariant(
            @Valid @RequestBody CreateVariantDTO dto
    ) {
        VariantResponseDTO variantResponse = variantService.createVariant(dto);
        VariantObjectResponseDTO responseDto = VariantObjectResponseDTO.builder().data(variantResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Create a new variant with images", description = "Creates a new variant and uploads images.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant created successfully", content = @Content(schema = @Schema(implementation = VariantObjectResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(value = RouteConstants.CREATE_VARIANT, consumes = "multipart/form-data")
    public ResponseEntity<VariantObjectResponseDTO> createVariantWithImages(
            @RequestPart(value = "variant", required = false) @Valid CreateVariantDTO dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles
    ) throws IOException {
        VariantResponseDTO variantResponse = variantService.createVariant(dto, imageFiles);
        VariantObjectResponseDTO responseDto = VariantObjectResponseDTO.builder().data(variantResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Create multiple variants", description = "Creates multiple variants in bulk.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variants created successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_MULTIPLE_VARIANTS)
    public ResponseEntity<SuccessMessageResponseDTO> createMultipleVariants(
            @Valid @RequestBody CreateVariantDTO[] dtos
    ) {
        String variantResponse = variantService.createMultipleVariants(dtos);
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(variantResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Create multiple variants with images", description = "Creates multiple variants and uploads images in bulk.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variants created successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(value = RouteConstants.CREATE_MULTIPLE_VARIANTS, consumes = "multipart/form-data")
    public ResponseEntity<SuccessMessageResponseDTO> createMultipleVariantsWithImages(
            @RequestPart(value = "variants", required = false) @Valid CreateVariantDTO[] dtos,
            @RequestPart(value = "images", required = false) List<List<MultipartFile>> imageFilesList
    ) throws IOException {
        String variantResponse = variantService.createMultipleVariants(dtos, imageFilesList);
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(variantResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all variants (paginated)", description = "Returns a paginated list of all variants, optionally filtered.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variants retrieved successfully", content = @Content(schema = @Schema(implementation = VariantPaginationResponseDTO.class)))
    })
    @PostMapping(RouteConstants.GET_ALL_VARIANTS)
    public ResponseEntity<VariantPaginationResponseDTO> getAllVariants(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size,
            @Valid @RequestBody VariantFilterDTO filterDTO
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Variant> variantPage;
        if(filterDTO.getSort() != null){
            Sort sort = switch (filterDTO.getSort()) {
                case ASC -> Sort.by("offerPrice").ascending();
                case DESC -> Sort.by("offerPrice").descending();
            };
            Pageable SortedPageable = PageRequest.of(page, size, sort);
            variantPage = variantService.getAllVariants(SortedPageable, filterDTO);
        }
        else{
            variantPage = variantService.getAllVariants(pageable, filterDTO);
        }

        List<VariantResponseDTO> variantDTOs = variantPage.getContent().stream().map(variant -> {
            ProductResponseDTO productDto = productService.getProductById(variant.getProductId());
            return variantMapper.variantToVariantDto(variant, productDto);
        }).collect(Collectors.toList());

        VariantPaginationResponseDTO responseDto = VariantPaginationResponseDTO.builder()
                .data(variantDTOs)
                .totalElements(variantPage.getTotalElements())
                .totalPages(variantPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all variants by product ID", description = "Returns all variants for a given product ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variants retrieved successfully", content = @Content(schema = @Schema(implementation = VariantArrayResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_VARIANTS_BY_PRODUCT_ID)
    public ResponseEntity<VariantArrayResponseDTO> getAllVariantsByProductId(
            @Parameter(description = "Product ID") @PathVariable("id") String productId
    ) {
        List<VariantResponseDTO> variants = variantService.getAllVariantsByProductId(productId);
        VariantArrayResponseDTO responseDto = VariantArrayResponseDTO.builder()
                .data(variants)
                .count(variants.size())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get variant by ID", description = "Returns a variant by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant retrieved successfully", content = @Content(schema = @Schema(implementation = VariantObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Variant not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_VARIANT_BY_ID)
    public ResponseEntity<VariantObjectResponseDTO> getVariant(
            @Parameter(description = "Variant ID") @PathVariable("id") String id
    ) {
        VariantResponseDTO variantResponse = variantService.getVariantById(id);
        VariantObjectResponseDTO responseDto = VariantObjectResponseDTO.builder().data(variantResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update variant by ID", description = "Updates a variant by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant updated successfully", content = @Content(schema = @Schema(implementation = VariantObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Variant not found", content = @Content)
    })
    @PatchMapping(RouteConstants.UPDATE_VARIANT_BY_ID)
    public ResponseEntity<VariantObjectResponseDTO> updateVariant(
            @Parameter(description = "Variant ID") @PathVariable("id") String id,
            @Valid @RequestBody UpdateVariantDTO dto
    ) {
        VariantResponseDTO variantResponse = variantService.updateVariantById(id, dto);
        VariantObjectResponseDTO responseDto = VariantObjectResponseDTO.builder().data(variantResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update variant by ID with images", description = "Updates a variant and uploads new images.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant updated successfully", content = @Content(schema = @Schema(implementation = VariantObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Variant not found", content = @Content)
    })
    @PatchMapping(value = RouteConstants.UPDATE_VARIANT_BY_ID, consumes = "multipart/form-data")
    public ResponseEntity<VariantObjectResponseDTO> updateVariantWithImages(
            @Parameter(description = "Variant ID") @PathVariable("id") String id,
            @RequestPart(value = "variant", required = false) @Valid UpdateVariantDTO dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles
    ) throws IOException {
        VariantResponseDTO variantResponse = variantService.updateVariantById(id, dto, imageFiles);
        VariantObjectResponseDTO responseDto = VariantObjectResponseDTO.builder().data(variantResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete variant by ID", description = "Deletes a variant by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variant deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Variant not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_VARIANT_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteVariant(
            @Parameter(description = "Variant ID") @PathVariable("id") String id
    ) {
        String response = variantService.deleteVariantById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }

    @Operation(summary = "Get expanded product by variant ID", description = "Returns expanded product details for a given variant ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Expanded product retrieved successfully", content = @Content(schema = @Schema(implementation = SuccessObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Variant not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_EXPANDED_PRODUCT_BY_VARIANT_ID)
    public ResponseEntity<SuccessObjectResponseDTO> getExpandedProductByVariant(
            @Parameter(description = "Variant ID") @PathVariable("id") String id
    ) {
        ExpandedProductDTO productResponse = variantService.getExpandedProduct(id);
        SuccessObjectResponseDTO<ExpandedProductDTO> responseDto = new SuccessObjectResponseDTO<>(productResponse);
        return ResponseEntity.ok(responseDto);
    }
}
