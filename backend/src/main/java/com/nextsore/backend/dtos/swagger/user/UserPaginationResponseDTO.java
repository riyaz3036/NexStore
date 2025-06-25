package com.nextsore.backend.dtos.swagger.user;

import com.nextsore.backend.dtos.User.UserResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Paginated success response for User")
public class UserPaginationResponseDTO {
    @Schema(description = "List of User data items")
    private List<UserResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}