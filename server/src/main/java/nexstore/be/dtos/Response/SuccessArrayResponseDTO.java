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
@Schema(description = "Success response with an array of objects")
public class SuccessArrayResponseDTO<T> {
    @Schema(description = "The data array")
    private List<T> data;
    private int count;
    private String status;

    public SuccessArrayResponseDTO(List<T> data) {
        this.status = TextConstants.SUCCESS;
        this.count = (data != null) ? data.size() : 0;
        this.data = data;
    }
}
