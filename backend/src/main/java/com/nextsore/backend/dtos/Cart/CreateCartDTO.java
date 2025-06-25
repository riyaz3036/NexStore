package com.nextsore.backend.dtos.Cart;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateCartDTO {
    private String userId;
    private String variantId;
    private Integer quantity;
}