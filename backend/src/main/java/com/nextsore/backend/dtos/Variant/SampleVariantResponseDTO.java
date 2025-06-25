package com.nextsore.backend.dtos.Variant;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SampleVariantResponseDTO {
    private CategoryResponseDTO category;
    private List<VariantResponseDTO> variants;
}
