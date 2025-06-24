 package nexstore.be.dtos.swagger.cart;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Cart.CartResponseDTO;

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
