package com.nextsore.backend.dtos.Product;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import lombok.*;

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