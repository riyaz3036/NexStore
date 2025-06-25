package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = DbConstants.FAVORAITE)
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Favorite extends BaseEntity{
    @Field("user_id")
    private String userId;

    @Field("variant_id")
    private String variantId;
}
