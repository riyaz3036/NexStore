package nexstore.be.dtos.Product;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductDTO {
    private String name;
    private String description;
    private String categoryId;
    private Boolean isBestSeller;
}
