package com.nextsore.backend.dtos.swagger.cart;

import com.nextsore.backend.dtos.Cart.CartResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Cart object")
public class CartObjectResponseDTO {
    @Schema(description = "The Cart data object")
    private CartResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
}
