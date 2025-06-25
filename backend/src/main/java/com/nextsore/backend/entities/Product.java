package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = DbConstants.PRODUCT)
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Product extends BaseEntity {
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("category_id")
    private String categoryId;

    @Field("is_best_seller")
    private Boolean isBestSeller;
}
