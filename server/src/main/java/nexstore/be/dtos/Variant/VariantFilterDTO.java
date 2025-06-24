package nexstore.be.dtos.Variant;

import lombok.*;
import nexstore.be.enums.SortEnum;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VariantFilterDTO {
    private List<String> variantIds;
    private List<String> categoryIds;
    private boolean bestSeller;
    private SortEnum sort;
}
