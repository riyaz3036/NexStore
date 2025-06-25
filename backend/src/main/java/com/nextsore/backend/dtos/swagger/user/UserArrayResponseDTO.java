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
@Schema(description = "Success response with an array of User objects")
public class UserArrayResponseDTO {
    @Schema(description = "The User data array")
    private List<UserResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
}
