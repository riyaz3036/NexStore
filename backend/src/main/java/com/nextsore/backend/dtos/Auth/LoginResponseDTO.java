package com.nextsore.backend.dtos.Auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginResponseDTO {
    @NotBlank
    private String id;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String token;

    private String phone;
    private String image;
}