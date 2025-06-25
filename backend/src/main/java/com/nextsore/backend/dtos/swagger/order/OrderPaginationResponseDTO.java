package com.nextsore.backend.dtos.swagger.order;

import com.nextsore.backend.dtos.Order.OrderResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Paginated success response for Order")
public class OrderPaginationResponseDTO {
    @Schema(description = "List of Order data items")
    private List<OrderResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
