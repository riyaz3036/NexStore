package com.nextsore.backend.dtos.swagger.variant;


import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Paginated success response for Variant")
public class VariantPaginationResponseDTO {
    @Schema(description = "List of Variant data items")
    private List<VariantResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
