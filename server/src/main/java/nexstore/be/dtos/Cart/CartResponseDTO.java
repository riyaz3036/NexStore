package nexstore.be.dtos.Cart;

import lombok.*;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;

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


