package com.nextsore.backend.dtos.swagger.variant;

import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Variant object")
public class VariantObjectResponseDTO {
    @Schema(description = "The Variant data object")
    private VariantResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
}
