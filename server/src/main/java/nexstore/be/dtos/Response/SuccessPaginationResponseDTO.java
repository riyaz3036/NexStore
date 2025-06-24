package nexstore.be.dtos.Response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.constants.TextConstants;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Paginated success response")
public class SuccessPaginationResponseDTO<T> {
    @Schema(description = "List of data items")
    private List<T> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    private String status;

    public SuccessPaginationResponseDTO(List<T> data, long totalElements, int totalPages) {
        this.status = TextConstants.SUCCESS;
        this.data = data;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }
}
