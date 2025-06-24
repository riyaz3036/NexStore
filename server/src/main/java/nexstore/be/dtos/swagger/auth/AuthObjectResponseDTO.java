package nexstore.be.dtos.swagger.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Auth.LoginResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Auth/Login object")
public class AuthObjectResponseDTO {
    @Schema(description = "The Auth/Login data object")
    private LoginResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
} 