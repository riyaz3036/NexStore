package com.nextsore.backend.dtos.Auth;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginRequestDTO {
    private String email;
    private String password;
}
