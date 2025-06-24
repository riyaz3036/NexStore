package nexstore.be.dtos.Product;

import lombok.*;
import nexstore.be.dtos.Category.CategoryResponseDTO;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductResponseDTO {
    private String id;
    private String name;
    private String description;
    private CategoryResponseDTO category;
    private Boolean isBestSeller;
}
