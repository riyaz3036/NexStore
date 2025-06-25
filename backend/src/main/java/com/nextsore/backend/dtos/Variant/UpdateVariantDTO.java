package com.nextsore.backend.dtos.Variant;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateVariantDTO {
    private String name;
    private String description;
    private Double price;
    private Double offerPrice;
    private List<String> images; // Can contain existing image paths or be empty for new uploads
}