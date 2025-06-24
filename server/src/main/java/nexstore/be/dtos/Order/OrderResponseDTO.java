package nexstore.be.dtos.Order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderResponseDTO {
    @NotBlank
    private String id;

    @NotBlank
    private UserResponseDTO user;

    @NotBlank
    private List<OrderVariantDTO> variants;

    @NotBlank
    private String paymentMode;

    @NotNull
    private Double total;

    @NotBlank
    private String address;

    @NotNull
    private Instant createdAt;

    @Data
    public static class OrderVariantDTO{
        private String id;
        private VariantResponseDTO variant;
        private int quantity;
    }
}
