package com.nextsore.backend.dtos.swagger.preview;

import com.nextsore.backend.dtos.Variant.SampleVariantResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Preview object")
public class PreviewObjectResponseDTO {
    @Schema(description = "The Preview data object")
    private SampleVariantResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
}
