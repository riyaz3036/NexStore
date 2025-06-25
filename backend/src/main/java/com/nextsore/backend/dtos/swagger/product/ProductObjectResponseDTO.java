package com.nextsore.backend.dtos.swagger.product;


import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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
