package nexstore.be.dtos.Variant;

import lombok.*;
import nexstore.be.dtos.Category.CategoryResponseDTO;

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
