package nexstore.be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import nexstore.be.constants.DbConstants;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = DbConstants.CART)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Cart extends BaseEntity{

    @Field("user_id")
    private String userId;

    @Field("variant_id")
    private String variantId;

    @Field("quantity")
    private Integer quantity;
}
