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
@Schema(description = "Paginated success response for Cart")
public class CartPaginationResponseDTO {
    @Schema(description = "List of Cart data items")
    private List<CartResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
