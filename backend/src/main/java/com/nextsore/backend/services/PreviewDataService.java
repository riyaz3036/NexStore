package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import com.nextsore.backend.dtos.Variant.SampleVariantResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Product;
import com.nextsore.backend.entities.Variant;
import com.nextsore.backend.mappers.CategoryMapper;
import com.nextsore.backend.mappers.ProductMapper;
import com.nextsore.backend.mappers.VariantMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PreviewDataService {
    private static final Logger logger = LoggerFactory.getLogger(PreviewDataService.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private VariantService variantService;

    @Autowired
    private VariantMapper variantMapper;

    @Autowired
    private ProductMapper productMapper;


    /* Service function to retrieve sample variants */
    public List<SampleVariantResponseDTO> getPreviewVariants(){
        logger.info("Finding sample variants Variants");
        List<CategoryResponseDTO> categories = categoryService.getAllCategoriesWithoutPagination();

        List<SampleVariantResponseDTO> sampleData = new ArrayList<>();;
        categories.forEach(cat -> {
            // for each category fetch any 2 variants
            Pageable pageable = PageRequest.of(0, 2);
            Page<Product> productsPage= productService.getPaginatedProductsByCategory(cat.getId(), pageable);

            SampleVariantResponseDTO sampleCategoryData = new SampleVariantResponseDTO();
            sampleCategoryData.setCategory(cat);
            List<VariantResponseDTO> variants = new ArrayList<>();

            productsPage.getContent().forEach(prod -> {
                Pageable pageable2 = PageRequest.of(0, 1);

                Page<Variant> variantPage = variantService.getPaginatedVariantsByProductId(prod.getId(), pageable2);
                variantPage.getContent().forEach(var -> {
                    variants.add(variantMapper.variantToVariantDto(var, productMapper.productToProductDto(prod, cat)));
                });
            });

            sampleCategoryData.setVariants(variants);
            sampleData.add(sampleCategoryData);
        });

        return sampleData;
    }
}
