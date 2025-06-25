package com.nextsore.backend.mappers;

import com.nextsore.backend.dtos.Cart.CartResponseDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mappings({
            @Mapping(source = "variant" , target = "variant"),
            @Mapping(source = "cart.id" , target = "id"),
            @Mapping(source = "user" , target = "user"),
            @Mapping(source = "cart.quantity" , target = "quantity")
    })
    CartResponseDTO cartToCartDto(Cart cart, UserResponseDTO user, VariantResponseDTO variant);
    Cart cartDtoToCart(CartResponseDTO cartDTO);
}
