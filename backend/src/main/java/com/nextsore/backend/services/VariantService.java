package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Product.ExpandedProductDTO;
import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import com.nextsore.backend.dtos.Variant.CreateVariantDTO;
import com.nextsore.backend.dtos.Variant.UpdateVariantDTO;
import com.nextsore.backend.dtos.Variant.VariantFilterDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.BaseEntity;
import com.nextsore.backend.entities.Product;
import com.nextsore.backend.entities.Variant;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.CategoryMapper;
import com.nextsore.backend.mappers.ProductMapper;
import com.nextsore.backend.mappers.VariantMapper;
import com.nextsore.backend.repositories.VariantRepository;
import com.nextsore.backend.uploads.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VariantService {
    private static final Logger logger = LoggerFactory.getLogger(VariantService.class);

    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private VariantMapper variantMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private FileUploadService fileUploadService;

    /* Service function to add a new a variant */
    public VariantResponseDTO createVariant(CreateVariantDTO dto ){
        logger.info("Creating Variant");

        Variant variant = new Variant();
        variant.setName(dto.getName());
        variant.setDescription(dto.getDescription());
        variant.setPrice(dto.getPrice());
        variant.setOfferPrice(dto.getOfferPrice());
        variant.setImages(dto.getImages()); // Set images from DTO
        variant.setProductId(dto.getProductId());
        variantRepository.save(variant);
        ProductResponseDTO product = productService.getProductById(dto.getProductId());
        return variantMapper.variantToVariantDto(variant, product);
    }

    /* Service function to add a new variant with image uploads */
    public VariantResponseDTO createVariant(CreateVariantDTO dto, List<MultipartFile> imageFiles) throws IOException {
        logger.info("Creating Variant with Images");

        // Create default DTO if none provided
        if (dto == null) {
            dto = new CreateVariantDTO();
        }

        Variant variant = new Variant();
        variant.setName(dto.getName());
        variant.setDescription(dto.getDescription());
        variant.setPrice(dto.getPrice());
        variant.setOfferPrice(dto.getOfferPrice());
        variant.setProductId(dto.getProductId());

        // Upload images and get paths
        List<String> uploadedImagePaths = new ArrayList<>();

        // Upload new images if provided
        if (imageFiles != null && !imageFiles.isEmpty()) {
            uploadedImagePaths.addAll(fileUploadService.uploadImages(imageFiles));
        }

        // Add existing image paths if any
        if (dto.getImages() != null) {
            uploadedImagePaths.addAll(dto.getImages());
        }

        variant.setImages(uploadedImagePaths);
        variantRepository.save(variant);

        ProductResponseDTO product = productService.getProductById(dto.getProductId());
        return variantMapper.variantToVariantDto(variant, product);
    }

    /* Service function to add a new multiple variants */
    public String createMultipleVariants( CreateVariantDTO[] dtos ){
        logger.info("Creating Multiple Variants");
        Arrays.stream(dtos).forEach(dto -> {
            createVariant(dto);
        });

        return "Successfully created all the variants";
    }

    /* Service function to add multiple variants with image uploads */
    public String createMultipleVariants(CreateVariantDTO[] dtos, List<List<MultipartFile>> imageFilesList) throws IOException {
        logger.info("Creating Multiple Variants with Images");

        // Create default DTOs if none provided
        if (dtos == null) {
            dtos = new CreateVariantDTO[0];
        }

        for (int i = 0; i < dtos.length; i++) {
            List<MultipartFile> imageFiles = (imageFilesList != null && i < imageFilesList.size()) ? imageFilesList.get(i) : null;
            createVariant(dtos[i], imageFiles);
        }

        return "Successfully created all the variants with images";
    }

    /* Service function to retrieve a variant */
    public VariantResponseDTO getVariantById(String id ){
        logger.info("Finding Variant with id: {}", id);

        Variant variant = variantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Variant not found with Id: {}", id);
                    return new DataNotFoundException("Variant Not found with the given Id");
                });

        ProductResponseDTO product = productService.getProductById(variant.getProductId());
        return variantMapper.variantToVariantDto(variant, product);
    }


    /* Service function to retrieve all variants */
    public Page<Variant> getAllVariants(Pageable pageable, VariantFilterDTO filterDTO){
        logger.info("Finding all Variants with filter: {}", filterDTO);

        List<String> categoryIds = (filterDTO != null && filterDTO.getCategoryIds() != null)
                ? filterDTO.getCategoryIds()
                : Collections.emptyList();

        logger.info("RRRR: {}", categoryIds);
        if(!categoryIds.isEmpty()){
            List<Product>products = productService.getAllProductsByCategoriesAndBestSeller(categoryIds, filterDTO.isBestSeller());

            List<String> productIds = products.stream().map(BaseEntity::getId).collect(Collectors.toList());

            return variantRepository.findByProductIdIn(productIds, pageable);
        }
        else{
            return variantRepository.findAll(pageable);
        }
    }


    /* Service function to retrieve all variants */
    public List<VariantResponseDTO> getAllVariantsByProductId(String productId){
        logger.info("Finding all Variants by product id: {}", productId);
        ProductResponseDTO product = productService.getProductById(productId);

        List<Variant> variants = variantRepository.findByProductId(productId);

        return variants.stream().map(variant -> {
            return variantMapper.variantToVariantDto(variant, product);
        }).collect(Collectors.toList());
    }


    /* Service function to retrieve all variants with pagination */
    public Page<Variant> getPaginatedVariantsByProductId(String productId, Pageable pageable){
        logger.info("Finding paginated Variants by product id: {}", productId);
        return variantRepository.findAllByProductId(productId, pageable);
    }



    /* Service function to retrieve all variants */
    public List<VariantResponseDTO> getVariantsByCategory(Pageable pageable, String categoryId){
        logger.info("Finding all Variants by category id: {}", categoryId);

        Page<Variant> variants = variantRepository.findAllByCategoryId(categoryId, pageable);

        return variants.getContent().stream().map(variant -> {
            ProductResponseDTO product = productService.getProductById(variant.getProductId());
            return variantMapper.variantToVariantDto(variant, product);
        }).collect(Collectors.toList());
    }


    public List<Variant> getAllVariantsWithoutPagination(VariantFilterDTO filterDTO){
        logger.info("Finding all Variants without pagination");
        return variantRepository.searchByVariantIds(filterDTO.getVariantIds());
    }


    /* Updates details of a variant by id */
    public VariantResponseDTO updateVariantById(String id, UpdateVariantDTO dto){
        logger.info("Updating Variant with Id: {}", id);
        Variant variant = variantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Variant not found with Id: {}", id);
                    return new DataNotFoundException("Variant Not found with the given Id");
                });

        if(dto.getName() != null) variant.setName(dto.getName());
        if(dto.getDescription() != null) variant.setDescription(dto.getDescription());
        if(dto.getPrice() != null) variant.setPrice(dto.getPrice());
        if(dto.getOfferPrice() != null) variant.setOfferPrice(dto.getOfferPrice());
        if(dto.getImages() != null) variant.setImages(dto.getImages());

        Variant updatedVariant = variantRepository.save(variant);

        ProductResponseDTO product = productService.getProductById(updatedVariant.getProductId());
        return variantMapper.variantToVariantDto(updatedVariant, product);
    }

    /* Updates details of a variant by id with image uploads */
    public VariantResponseDTO updateVariantById(String id, UpdateVariantDTO dto, List<MultipartFile> imageFiles) throws IOException {
        logger.info("Updating Variant with Id: {} and Images", id);
        Variant variant = variantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Variant not found with Id: {}", id);
                    return new DataNotFoundException("Variant Not found with the given Id");
                });

        // Create default DTO if none provided
        if (dto == null) {
            dto = new UpdateVariantDTO();
        }

        if(dto.getName() != null) variant.setName(dto.getName());
        if(dto.getDescription() != null) variant.setDescription(dto.getDescription());
        if(dto.getPrice() != null) variant.setPrice(dto.getPrice());
        if(dto.getOfferPrice() != null) variant.setOfferPrice(dto.getOfferPrice());

        // Handle image uploads
        List<String> updatedImagePaths = new ArrayList<>();

        // Add existing images from DTO if provided
        if (dto.getImages() != null) {
            updatedImagePaths.addAll(dto.getImages());
        }

        // Upload new images if provided
        if (imageFiles != null && !imageFiles.isEmpty()) {
            updatedImagePaths.addAll(fileUploadService.uploadImages(imageFiles));
        }

        // Update the images list
        if (!updatedImagePaths.isEmpty()) {
            variant.setImages(updatedImagePaths);
        }

        Variant updatedVariant = variantRepository.save(variant);

        ProductResponseDTO product = productService.getProductById(updatedVariant.getProductId());
        return variantMapper.variantToVariantDto(updatedVariant, product);
    }


    /* Service function to delete a variant by id */
    public String deleteVariantById(String id){
        logger.info("Deleting Variant with Id: {}", id);
        Variant variant = variantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Variant not found with Id: {}", id);
                    return new DataNotFoundException("Variant Not found with the given Id");
                });

        // Delete associated images if exist
        if (variant.getImages() != null && !variant.getImages().isEmpty()) {
            fileUploadService.deleteImages(variant.getImages());
        }

        variantRepository.delete(variant);
        return "Variant deleted successfully.";
    }


    /* Service function to retrieve an expanded product by variant id */
    public ExpandedProductDTO getExpandedProduct(String variantId ){
        logger.info("Finding expanded Product with variant id: {}", variantId);

        VariantResponseDTO variant = getVariantById(variantId);

        ProductResponseDTO product = productService.getProductById(variant.getProduct().getId());

        ExpandedProductDTO expandedProduct = new ExpandedProductDTO();
        expandedProduct.setName(product.getName());
        expandedProduct.setDescription(product.getDescription());
        expandedProduct.setId(product.getId());
        expandedProduct.setIsBestSeller(product.getIsBestSeller());
        expandedProduct.setCategory(product.getCategory());

        List<VariantResponseDTO> variantsOfProduct = getAllVariantsByProductId(product.getId());



        expandedProduct.setVariants(variantsOfProduct);

        Pageable pageable = PageRequest.of(0, 10);
        List<VariantResponseDTO> variantsOfCategory = getVariantsByCategory(pageable, product.getCategory().getId());
        expandedProduct.setRelatedVariants(variantsOfCategory);

        return expandedProduct;
    }
}
