package nexstore.be.dtos.Variant;

import lombok.*;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.entities.Product;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VariantResponseDTO {
    private String id;
    private ProductResponseDTO product;
    private String name;
    private String description;
    private Double price;
    private Double offerPrice;
    private List<String> images;
}
