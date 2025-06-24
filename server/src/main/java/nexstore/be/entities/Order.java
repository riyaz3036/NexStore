package nexstore.be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import nexstore.be.constants.DbConstants;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = DbConstants.ORDER)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Order extends BaseEntity {

    @Field("user_id")
    private String userId;

    @Field("variants")
    private List<OrderVariant> variants;

    @Field("paymentMode")
    private String paymentMode;

    @Field("total")
    private Double total;

    @Field("address")
    private String address;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderVariant {
        private String variantId;
        private Integer quantity;
    }
}
