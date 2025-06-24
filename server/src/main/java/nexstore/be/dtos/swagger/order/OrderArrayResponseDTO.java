package nexstore.be.dtos.swagger.order;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Order.OrderResponseDTO;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Order objects")
public class OrderArrayResponseDTO {
    @Schema(description = "The Order data array")
    private List<OrderResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
} 