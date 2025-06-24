package nexstore.be.dtos.Cart;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateCartDTO {
    private String id;
    private Integer quantity;
}
