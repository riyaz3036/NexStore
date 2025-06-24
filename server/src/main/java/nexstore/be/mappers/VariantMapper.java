package nexstore.be.mappers;

import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Product;
import nexstore.be.entities.Variant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface VariantMapper {

    @Mappings({
            @Mapping(source = "variant.id", target = "id"),
            @Mapping(source = "product", target = "product"),
            @Mapping(source = "variant.name", target = "name"),
            @Mapping(source = "variant.description", target = "description"),
            @Mapping(source = "variant.price", target = "price"),
            @Mapping(source = "variant.offerPrice", target = "offerPrice"),
    })
    VariantResponseDTO variantToVariantDto(Variant variant, ProductResponseDTO product);

    Variant variantDtoToVariant(VariantResponseDTO variantDTO);
}
