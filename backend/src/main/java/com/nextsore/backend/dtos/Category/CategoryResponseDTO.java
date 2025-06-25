package com.nextsore.backend.dtos.Category;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CategoryResponseDTO {
    @NotBlank
    private String id;

    private String description;

    private String image;
}