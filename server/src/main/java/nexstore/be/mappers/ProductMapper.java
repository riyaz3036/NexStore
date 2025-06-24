package nexstore.be.mappers;

import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mappings({
            @Mapping(source = "product.id", target = "id"),
            @Mapping(source = "product.name", target = "name"),
            @Mapping(source = "product.description", target = "description"),
            @Mapping(source = "category.id", target = "category.id"), // Optional: if you handle this manually
            @Mapping(source = "product.isBestSeller", target = "isBestSeller"),
            @Mapping(source = "category.description", target = "category.description")
    })
    ProductResponseDTO productToProductDto(Product product, CategoryResponseDTO category);

    Product productDtoToProduct(ProductResponseDTO productDTO);
}