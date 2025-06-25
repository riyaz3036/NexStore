package com.nextsore.backend.dtos.swagger.user;

import com.nextsore.backend.dtos.User.UserResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single User object")
public class UserObjectResponseDTO {
    @Schema(description = "The User data object")
    private UserResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
}
