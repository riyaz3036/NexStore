package nexstore.be.dtos.swagger.category;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Category objects")
public class CategoryArrayResponseDTO {
    @Schema(description = "The Category data array")
    private List<CategoryResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
} 