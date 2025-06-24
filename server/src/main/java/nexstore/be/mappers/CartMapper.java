package nexstore.be.mappers;

import nexstore.be.dtos.Cart.CartResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Cart;
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
