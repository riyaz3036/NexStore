package nexstore.be.dtos.swagger.preview;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Variant.SampleVariantResponseDTO;

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