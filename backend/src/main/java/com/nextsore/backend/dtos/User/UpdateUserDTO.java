package com.nextsore.backend.dtos.User;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateUserDTO {
    private String username;
    private String phone;
}
