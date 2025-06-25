package com.nextsore.backend.dtos.Category;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateCategoryDTO {
    private String description;

    private String image; // Can contain existing image path or be empty for new uploads
}