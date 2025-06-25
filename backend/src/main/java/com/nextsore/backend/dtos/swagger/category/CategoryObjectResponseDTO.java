package com.nextsore.backend.dtos.swagger.category;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Category object")
public class CategoryObjectResponseDTO {
    @Schema(description = "The Category data object")
    private CategoryResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
}
