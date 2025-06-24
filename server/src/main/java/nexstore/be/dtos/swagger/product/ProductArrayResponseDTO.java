package nexstore.be.dtos.swagger.product;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Product.ProductResponseDTO;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Product objects")
public class ProductArrayResponseDTO {
    @Schema(description = "The Product data array")
    private List<ProductResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
} 