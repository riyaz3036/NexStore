package nexstore.be.dtos.swagger.variant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Variant.VariantResponseDTO;

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