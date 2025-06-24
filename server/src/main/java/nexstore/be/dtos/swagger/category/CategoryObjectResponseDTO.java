package nexstore.be.dtos.swagger.category;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Category.CategoryResponseDTO;

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