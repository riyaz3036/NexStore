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
@Schema(description = "Paginated success response for Preview")
public class PreviewPaginationResponseDTO {
    @Schema(description = "List of Preview data items")
    private List<SampleVariantResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
} 