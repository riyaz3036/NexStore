package com.nextsore.backend.controllers;

import com.nextsore.backend.constants.RouteConstants;
import com.nextsore.backend.dtos.Cart.CartResponseDTO;
import com.nextsore.backend.dtos.Cart.CreateCartDTO;
import com.nextsore.backend.dtos.Cart.UpdateCartDTO;
import com.nextsore.backend.dtos.Response.SuccessMessageResponseDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.dtos.swagger.cart.CartArrayResponseDTO;
import com.nextsore.backend.dtos.swagger.cart.CartObjectResponseDTO;
import com.nextsore.backend.dtos.swagger.cart.CartPaginationResponseDTO;
import com.nextsore.backend.entities.Cart;
import com.nextsore.backend.mappers.CartMapper;
import com.nextsore.backend.services.CartService;
import com.nextsore.backend.services.UserService;
import com.nextsore.backend.services.VariantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.CART_MODULE)
public class CartController {
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantService variantService;

    @Autowired
    private CartMapper cartMapper;

    @Operation(summary = "Create multiple carts", description = "Creates multiple carts in bulk.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carts created successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_MULTIPLE_CARTS)
    public ResponseEntity<SuccessMessageResponseDTO> createCarts(
            @Valid @RequestBody CreateCartDTO[] dtos
    ) {
        String response = cartService.createMutipleCarts(dtos);
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all carts (paginated)", description = "Returns a paginated list of all carts.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carts retrieved successfully", content = @Content(schema = @Schema(implementation = CartPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_CARTS)
    public ResponseEntity<CartPaginationResponseDTO> getAllCarts(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cart> cartPage = cartService.getAllCarts(pageable);

        List<CartResponseDTO> cartDTOs = cartPage.getContent().stream().map(cart -> {
            logger.info("THISSS, {}", cart);
            UserResponseDTO user = userService.getUserById(cart.getUserId());
            VariantResponseDTO variant = variantService.getVariantById(cart.getVariantId());
            return cartMapper.cartToCartDto(cart, user, variant);
        }).collect(Collectors.toList());

        CartPaginationResponseDTO responseDto = CartPaginationResponseDTO.builder()
                .data(cartDTOs)
                .totalElements(cartPage.getTotalElements())
                .totalPages(cartPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all carts by user (paginated)", description = "Returns a paginated list of all carts for a user.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carts retrieved successfully", content = @Content(schema = @Schema(implementation = CartPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_CARTS_BY_USER)
    public ResponseEntity<CartPaginationResponseDTO> getAllCartsByUser(
            @Parameter(description = "User ID") @PathVariable("id") String id,
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cart> cartPage = cartService.getCartByUserId(id, pageable);

        List<CartResponseDTO> cartDTOs = cartPage.getContent().stream().map(cart -> {
            UserResponseDTO user = userService.getUserById(cart.getUserId());
            VariantResponseDTO variant = variantService.getVariantById(cart.getVariantId());
            return cartMapper.cartToCartDto(cart, user, variant);
        }).collect(Collectors.toList());

        CartPaginationResponseDTO responseDto = CartPaginationResponseDTO.builder()
                .data(cartDTOs)
                .totalElements(cartPage.getTotalElements())
                .totalPages(cartPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all carts by user (no pagination)", description = "Returns all carts for a user without pagination.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carts retrieved successfully", content = @Content(schema = @Schema(implementation = CartArrayResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_CARTS_BY_USER_WITHOUT_PAGINATION)
    public ResponseEntity<CartArrayResponseDTO> getAllCartsByUserWithoutPagination(
            @Parameter(description = "User ID") @PathVariable("id") String id
    ) {
        List<Cart> carts = cartService.getCartByUserIdWithoutPagination(id);

        List<CartResponseDTO> cartDTOs = carts.stream().map(cart -> {
            UserResponseDTO user = userService.getUserById(cart.getUserId());
            VariantResponseDTO variant = variantService.getVariantById(cart.getVariantId());
            return cartMapper.cartToCartDto(cart, user, variant);
        }).collect(Collectors.toList());

        CartArrayResponseDTO responseDto = CartArrayResponseDTO.builder()
                .data(cartDTOs)
                .count(cartDTOs.size())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get cart by ID", description = "Returns a cart by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cart retrieved successfully", content = @Content(schema = @Schema(implementation = CartObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Cart not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_CART_BY_ID)
    public ResponseEntity<CartObjectResponseDTO> getCart(
            @Parameter(description = "Cart ID") @PathVariable("id") String id
    ) {
        CartResponseDTO cartResponse = cartService.getCartById(id);
        CartObjectResponseDTO responseDto = CartObjectResponseDTO.builder().data(cartResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update carts by ID", description = "Updates multiple carts by their IDs.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carts updated successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Cart not found", content = @Content)
    })
    @PatchMapping(RouteConstants.UPDATE_CARTS_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> updateCart(
            @Valid @RequestBody UpdateCartDTO[] dtos
    ) {
        String cartResponse = cartService.updateCartsById(dtos);
        SuccessMessageResponseDTO responseDto = new SuccessMessageResponseDTO(cartResponse);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete cart by ID", description = "Deletes a cart by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cart deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Cart not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_CART_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteCart(
            @Parameter(description = "Cart ID") @PathVariable("id") String id
    ) {
        String response = cartService.deleteCartById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }

    @Operation(summary = "Empty cart for user", description = "Empties the cart for a specific user.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cart emptied successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.EMPTY_CART_FOR_USER)
    public ResponseEntity<SuccessMessageResponseDTO> emptyCart(
            @Parameter(description = "User ID") @PathVariable("userId") String userId
    ) {
        String response = cartService.emptyCartByUserId(userId);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}