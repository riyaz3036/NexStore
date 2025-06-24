package nexstore.be.dtos.swagger.product;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Product.ProductResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Product object")
public class ProductObjectResponseDTO {
    @Schema(description = "The Product data object")
    private ProductResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
} 