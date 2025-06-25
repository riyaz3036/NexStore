package com.nextsore.backend.dtos.swagger.order;

import com.nextsore.backend.dtos.Order.OrderResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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
