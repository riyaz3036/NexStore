package com.nextsore.backend.dtos.Product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateProductDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String categoryId;

    @NotNull
    private Boolean isBestSeller;
}
