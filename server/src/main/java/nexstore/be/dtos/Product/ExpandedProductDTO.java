package nexstore.be.dtos.Product;

import lombok.*;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExpandedProductDTO {
    private String id;
    private String name;
    private String description;
    private CategoryResponseDTO category;
    private Boolean isBestSeller;
    private List<VariantResponseDTO> variants;
    private List<VariantResponseDTO> relatedVariants;
}
