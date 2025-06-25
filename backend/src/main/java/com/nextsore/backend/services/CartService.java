package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Cart.CartResponseDTO;
import com.nextsore.backend.dtos.Cart.CreateCartDTO;
import com.nextsore.backend.dtos.Cart.UpdateCartDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Cart;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.CartMapper;
import com.nextsore.backend.mappers.UserMapper;
import com.nextsore.backend.repositories.CartRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private static final Logger logger = LoggerFactory.getLogger(CartService.class);

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantService variantService;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private UserMapper userMapper;

    /* Service function to add a new a cart */
    public CartResponseDTO createCart(CreateCartDTO dto ){
        logger.info("Creating Cart");

        Cart cart = new Cart();

        cart.setUserId(dto.getUserId());
        cart.setVariantId(dto.getVariantId());
        cart.setQuantity(dto.getQuantity());

        Cart savedCart = cartRepository.save(cart);
        UserResponseDTO user = userService.getUserById(dto.getUserId());
        VariantResponseDTO variant = variantService.getVariantById(dto.getVariantId());
        return cartMapper.cartToCartDto(savedCart, user, variant);
    }


    /* Service function to add a new a cart */
    public String createMutipleCarts(CreateCartDTO[] dtos ){
        logger.info("Creating Multiple Carts");

        Arrays.stream(dtos).forEach(dto -> {
            createCart(dto);
        });

        return "Created carts successfully";
    }


    /* Service function to retrieve a cart */
    public CartResponseDTO getCartById(String id ){
        logger.info("Finding Cart with id: {}", id);

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Cart not found with Id: {}", id);
                    return new DataNotFoundException("Cart Not found with the given Id");
                });

        UserResponseDTO user = userService.getUserById(cart.getUserId());
        VariantResponseDTO variant = variantService.getVariantById(cart.getVariantId());
        return cartMapper.cartToCartDto(cart, user, variant);
    }


    /* Service function to retrieve all carts */
    public Page<Cart> getAllCarts(Pageable pageable){
        logger.info("Finding all Carts");
        Page<Cart> cartPage = cartRepository.findAll(pageable);
        logger.info("GHHH, {}", cartPage.getContent());
        return cartPage;
    }


    /* Service function to retrieve a favorite by user id */
    public Page<Cart> getCartByUserId(String userId, Pageable pageable ){
        logger.info("Finding Cart with user id: {}", userId);

        Page<Cart> cartPage = cartRepository.findByUserId(userId, pageable);
        return cartPage;
    }


    /* Service function to retrieve a favorite by user id without pagination*/
    public List<Cart> getCartByUserIdWithoutPagination(String userId ){
        logger.info("Finding Cart with user id: {}", userId);
        return cartRepository.findAllByUserId(userId);
    }


    /* Service function to delete a cart by id */
    public String deleteCartById(String id){
        logger.info("Deleting Cart with Id: {}", id);
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Cart not found with Id: {}", id);
                    return new DataNotFoundException("Cart Not found with the given Id");
                });

        cartRepository.delete(cart);
        return "Cart deleted successfully.";
    }


    /* Updates quantity of a cart by id */
    public void updateCartById(UpdateCartDTO dto){
        logger.info("Updating Product with Id: {}", dto.getId());

        Cart cart = cartRepository.findById(dto.getId())
                .orElseThrow(() -> {
                    logger.error("Cart not found with Id: {}", dto.getId());
                    return new DataNotFoundException("Cart Not found with the given Id");
                });

        if(dto.getQuantity() != null) cart.setQuantity(dto.getQuantity());

        cartRepository.save(cart);
    }


    /* Updates quantities of a carts */
    public String updateCartsById(UpdateCartDTO[] dtos){
        logger.info("Updating multiple carts");

        Arrays.stream(dtos).forEach(dto -> {
            if(dto.getQuantity() == 0) deleteCartById(dto.getId());
            updateCartById(dto);
        });

        return "Carts updated successfully.";
    }


    /* Service function to delete a cart by user id */
    public String emptyCartByUserId(String userId) {
        logger.info("Emptying Cart for User with id: {}", userId);

        List<Cart> carts = cartRepository.findByUserId(userId);

        if (carts.isEmpty()) {
            logger.warn("No cart found for user with id: {}", userId);
            return "No cart to empty.";
        }

        cartRepository.deleteAll(carts);
        return "Cart emptied successfully.";
    }
}
