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
@Schema(description = "Success response with an array of Variant objects")
public class VariantArrayResponseDTO {
    @Schema(description = "The Variant data array")
    private List<VariantResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
}
