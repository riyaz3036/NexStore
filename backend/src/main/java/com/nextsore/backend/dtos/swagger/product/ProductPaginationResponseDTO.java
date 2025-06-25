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
@Schema(description = "Paginated success response for Product")
public class ProductPaginationResponseDTO {
    @Schema(description = "List of Product data items")
    private List<ProductResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
