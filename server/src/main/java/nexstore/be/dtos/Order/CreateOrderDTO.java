package nexstore.be.dtos.Order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateOrderDTO {
    @NotBlank
    private String userId;

    @NotNull
    private List<CreateOrderDTO.CreateOrderVariantDTO> variants;

    @NotBlank
    private String paymentMode;

    @NotNull
    private Double total;

    @NotBlank
    private String address;

    @Data
    public static class CreateOrderVariantDTO{
        private String variantId;
        private int quantity;
    }
}
