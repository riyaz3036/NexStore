package com.nextsore.backend.dtos.swagger.cart;

import com.nextsore.backend.dtos.Cart.CartResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Cart objects")
public class CartArrayResponseDTO {
    @Schema(description = "The Cart data array")
    private List<CartResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
}
