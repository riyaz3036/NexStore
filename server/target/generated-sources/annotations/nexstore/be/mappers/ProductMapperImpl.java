package nexstore.be.mappers;

import javax.annotation.processing.Generated;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.entities.Product;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductResponseDTO productToProductDto(Product product, CategoryResponseDTO category) {
        if ( product == null && category == null ) {
            return null;
        }

        ProductResponseDTO.ProductResponseDTOBuilder productResponseDTO = ProductResponseDTO.builder();

        if ( product != null ) {
            productResponseDTO.id( product.getId() );
            productResponseDTO.name( product.getName() );
            productResponseDTO.description( product.getDescription() );
            productResponseDTO.isBestSeller( product.getIsBestSeller() );
        }
        productResponseDTO.category( categoryResponseDTOToCategoryResponseDTO( category ) );

        return productResponseDTO.build();
    }

    @Override
    public Product productDtoToProduct(ProductResponseDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Product.ProductBuilder<?, ?> product = Product.builder();

        product.id( productDTO.getId() );
        product.name( productDTO.getName() );
        product.description( productDTO.getDescription() );
        product.isBestSeller( productDTO.getIsBestSeller() );

        return product.build();
    }

    protected CategoryResponseDTO categoryResponseDTOToCategoryResponseDTO(CategoryResponseDTO categoryResponseDTO) {
        if ( categoryResponseDTO == null ) {
            return null;
        }

        CategoryResponseDTO.CategoryResponseDTOBuilder categoryResponseDTO1 = CategoryResponseDTO.builder();

        categoryResponseDTO1.id( categoryResponseDTO.getId() );
        categoryResponseDTO1.description( categoryResponseDTO.getDescription() );

        return categoryResponseDTO1.build();
    }
}
