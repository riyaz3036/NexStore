package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection = DbConstants.CATEGORY)
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Category extends BaseEntity {
    @Field("description")
    private String description;

    @Field("image")
    private String image;
}
