package nexstore.be.dtos.swagger.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.User.UserResponseDTO;

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