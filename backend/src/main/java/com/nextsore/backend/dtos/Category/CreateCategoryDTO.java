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
public class CreateCategoryDTO {
    @NotBlank
    private String description;

    private String image; // Can contain existing image path or be empty for new uploads
}
