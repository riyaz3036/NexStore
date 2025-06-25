package com.nextsore.backend.dtos.swagger.category;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Paginated success response for Category")
public class CategoryPaginationResponseDTO {
    @Schema(description = "List of Category data items")
    private List<CategoryResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
