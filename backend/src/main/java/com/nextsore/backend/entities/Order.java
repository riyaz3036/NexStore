package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = DbConstants.ORDER)
@Getter
@Setter
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
