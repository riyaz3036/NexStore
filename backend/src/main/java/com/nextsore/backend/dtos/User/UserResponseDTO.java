package com.nextsore.backend.dtos.User;

import com.nextsore.backend.enums.MembershipEnum;
import com.nextsore.backend.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponseDTO {
    @NotNull
    private String id;

    @NotNull
    private java.time.Instant createdAt;

    @NotNull
    private java.time.Instant updatedAt;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private MembershipEnum membership;

    @NotBlank
    private UserRole role;

    private String phone;
    private String image;
}
