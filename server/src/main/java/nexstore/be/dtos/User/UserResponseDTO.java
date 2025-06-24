package nexstore.be.dtos.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import nexstore.be.enums.MembershipEnum;
import nexstore.be.enums.UserRole;

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
