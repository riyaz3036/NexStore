package com.nextsore.backend.dtos.Favorite;

import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FavoriteResponseDTO {
    private String id;
    private UserResponseDTO user;
    private VariantResponseDTO variant;
}