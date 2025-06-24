package nexstore.be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import nexstore.be.constants.DbConstants;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = DbConstants.PRODUCT)
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
