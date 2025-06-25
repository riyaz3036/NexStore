package com.nextsore.backend.dtos.Product;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import lombok.*;

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