package nexstore.be.mappers;

import javax.annotation.processing.Generated;
import nexstore.be.dtos.Cart.CartResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Cart;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class CartMapperImpl implements CartMapper {

    @Override
    public CartResponseDTO cartToCartDto(Cart cart, UserResponseDTO user, VariantResponseDTO variant) {
        if ( cart == null && user == null && variant == null ) {
            return null;
        }

        CartResponseDTO.CartResponseDTOBuilder cartResponseDTO = CartResponseDTO.builder();

        if ( cart != null ) {
            cartResponseDTO.id( cart.getId() );
            cartResponseDTO.quantity( cart.getQuantity() );
        }
        cartResponseDTO.user( user );
        cartResponseDTO.variant( variant );

        return cartResponseDTO.build();
    }

    @Override
    public Cart cartDtoToCart(CartResponseDTO cartDTO) {
        if ( cartDTO == null ) {
            return null;
        }

        Cart.CartBuilder<?, ?> cart = Cart.builder();

        cart.id( cartDTO.getId() );
        cart.quantity( cartDTO.getQuantity() );

        return cart.build();
    }
}
