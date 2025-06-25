package com.nextsore.backend.dtos.Variant;

import com.nextsore.backend.dtos.Product.ProductResponseDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VariantResponseDTO {
    private String id;
    private ProductResponseDTO product;
    private String name;
    private String description;
    private Double price;
    private Double offerPrice;
    private List<String> images;
}
