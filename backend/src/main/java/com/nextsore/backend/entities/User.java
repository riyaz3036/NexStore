package com.nextsore.backend.entities;

import com.nextsore.backend.constants.DbConstants;
import com.nextsore.backend.enums.MembershipEnum;
import com.nextsore.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = DbConstants.USER)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User extends BaseEntity{

    @Field("username")
    private String username;

    @Indexed(unique = true)
    @Field("email")
    private String email;

    @Field("phone")
    private String phone;

    @Field("password")
    private String password;

    @Field("image")
    private String image;

    @Field("membership")
    private MembershipEnum membership = MembershipEnum.GENERAL;

    @Field("role")
    private UserRole role = UserRole.USER;
}
