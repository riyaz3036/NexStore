package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = DbConstants.VARIANT)
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Variant extends BaseEntity{
    @Field("product_id")
    private String productId;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("price")
    private Double price;

    @Field("offer_price")
    private Double offerPrice;

    @Field("images")
    private List<String> images;
}
