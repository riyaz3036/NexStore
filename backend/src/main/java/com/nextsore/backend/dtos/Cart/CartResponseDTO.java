package com.nextsore.backend.dtos.Cart;


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
public class CartResponseDTO {
    private String id;
    private UserResponseDTO user;
    private VariantResponseDTO variant;
    private Integer quantity;
}
