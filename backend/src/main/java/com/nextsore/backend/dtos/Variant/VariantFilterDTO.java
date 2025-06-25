package com.nextsore.backend.dtos.Variant;

import com.nextsore.backend.enums.SortEnum;
import lombok.*;

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
