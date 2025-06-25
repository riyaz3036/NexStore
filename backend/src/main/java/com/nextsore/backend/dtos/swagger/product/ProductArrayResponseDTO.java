package com.nextsore.backend.dtos.swagger.product;

import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
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
