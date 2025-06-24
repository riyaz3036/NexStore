package nexstore.be.services;

import lombok.RequiredArgsConstructor;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Variant.SampleVariantResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Product;
import nexstore.be.entities.Variant;
import nexstore.be.mappers.CategoryMapper;
import nexstore.be.mappers.ProductMapper;
import nexstore.be.mappers.VariantMapper;
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
