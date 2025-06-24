package nexstore.be.dtos.swagger.order;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Order.OrderResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Order object")
public class OrderObjectResponseDTO {
    @Schema(description = "The Order data object")
    private OrderResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
} 