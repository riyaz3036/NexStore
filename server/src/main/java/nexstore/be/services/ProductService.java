package nexstore.be.services;

import lombok.RequiredArgsConstructor;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Product.CreateProductDTO;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.dtos.Product.UpdateProductDTO;
import nexstore.be.entities.Product;
import nexstore.be.exceptions.DataNotFoundException;
import nexstore.be.mappers.ProductMapper;
import nexstore.be.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductMapper productMapper;


    /* Service function to add a new a product */
    public ProductResponseDTO createProduct( CreateProductDTO dto ){
        logger.info("Creating Product");

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setIsBestSeller(dto.getIsBestSeller());
        product.setCategoryId(dto.getCategoryId());

        productRepository.save(product);

        CategoryResponseDTO category = categoryService.getCategoryById(dto.getCategoryId());
        return productMapper.productToProductDto(product, category);
    }

    /* Service function to add new multiple products */
    public String createMultipleProduct( CreateProductDTO[] dtos ){
        logger.info("Creating Multiple Product");
        Arrays.stream(dtos).forEach(dto -> {
            createProduct(dto);
        });

        return "Successfully created all the products";
    }


    /* Service function to retrieve a product */
    public ProductResponseDTO getProductById(String id ){
        logger.info("Finding Product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Product not found with Id: {}", id);
                    return new DataNotFoundException("Product Not found with the given Id");
                });

        CategoryResponseDTO category = categoryService.getCategoryById(product.getCategoryId());
        return productMapper.productToProductDto(product, category);
    }


    /* Service function to retrieve all products */
    public Page<Product> getAllProducts(Pageable pageable){
        logger.info("Finding all Products");
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage;
    }


    /* Service function to retrieve all products by category */
    public List<Product> getAllProductsByCategoriesAndBestSeller(List<String> categoryIds, boolean bestSeller){
        logger.info("Finding all Products");
        if(!bestSeller){
            return productRepository.findByCategoryIdIn(categoryIds);
        }
        return productRepository.findByCategoryIdInAndIsBestSeller(categoryIds, bestSeller);
    }


    /* Service function to retrieve paginated products by category */
    public Page<Product> getPaginatedProductsByCategory(String categoryId, Pageable Pageable){
        logger.info("Finding paginated Products by category id: {}", categoryId);
        return productRepository.findAllByCategoryId(categoryId, Pageable);
    }


    /* Service function to retrieve all products without pagination */
    public List<ProductResponseDTO> getAllProductsWithoutPagination(){
        logger.info("Finding all Products without pagination");
        List<Product> products = productRepository.findAll();

        List<ProductResponseDTO> productDTOs = products.stream().map(product -> {
            CategoryResponseDTO catDto = categoryService.getCategoryById(product.getCategoryId());
            return productMapper.productToProductDto(product, catDto);
        }).collect(Collectors.toList());

        return productDTOs;
    }


    /* Updates details of a product by id */
    public ProductResponseDTO updateProductById(String id, UpdateProductDTO dto){
        logger.info("Updating Product with Id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Product not found with Id: {}", id);
                    return new DataNotFoundException("Product Not found with the given Id");
                });

        CategoryResponseDTO category = categoryService.getCategoryById(dto.getCategoryId());

        if(dto.getName() != null) product.setName(dto.getName());
        if(dto.getDescription() != null) product.setDescription(dto.getDescription());
        if(dto.getIsBestSeller() != null) product.setIsBestSeller(dto.getIsBestSeller());
        if(dto.getCategoryId() != null) product.setCategoryId(category.getId());

        Product updatedProduct = productRepository.save(product);

        return productMapper.productToProductDto(updatedProduct, category);
    }


    /* Service function to delete a product by id */
    public String deleteProductById(String id){
        logger.info("Deleting Product with Id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Product not found with Id: {}", id);
                    return new DataNotFoundException("Product Not found with the given Id");
                });

        productRepository.delete(product);
        return "Product deleted successfully.";
    }
}
