package nexstore.be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import nexstore.be.constants.DbConstants;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = DbConstants.VARIANT)
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
