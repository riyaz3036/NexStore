package com.nextsore.backend.mappers;

import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Variant;
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
