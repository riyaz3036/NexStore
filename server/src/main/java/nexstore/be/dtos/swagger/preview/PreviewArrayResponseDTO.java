package nexstore.be.dtos.swagger.preview;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Variant.SampleVariantResponseDTO;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Preview objects")
public class PreviewArrayResponseDTO {
    @Schema(description = "The Preview data array")
    private List<SampleVariantResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
} 