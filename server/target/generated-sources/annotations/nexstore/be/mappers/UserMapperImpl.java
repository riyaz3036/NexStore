package nexstore.be.mappers;

import javax.annotation.processing.Generated;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.entities.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponseDTO userToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDTO.UserResponseDTOBuilder userResponseDTO = UserResponseDTO.builder();

        userResponseDTO.id( user.getId() );
        userResponseDTO.createdAt( user.getCreatedAt() );
        userResponseDTO.updatedAt( user.getUpdatedAt() );
        userResponseDTO.username( user.getUsername() );
        userResponseDTO.email( user.getEmail() );
        userResponseDTO.membership( user.getMembership() );
        userResponseDTO.role( user.getRole() );
        userResponseDTO.phone( user.getPhone() );
        userResponseDTO.image( user.getImage() );

        return userResponseDTO.build();
    }

    @Override
    public User userDtoToUser(UserResponseDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User.UserBuilder<?, ?> user = User.builder();

        user.id( userDTO.getId() );
        user.createdAt( userDTO.getCreatedAt() );
        user.updatedAt( userDTO.getUpdatedAt() );
        user.username( userDTO.getUsername() );
        user.email( userDTO.getEmail() );
        user.phone( userDTO.getPhone() );
        user.image( userDTO.getImage() );
        user.membership( userDTO.getMembership() );
        user.role( userDTO.getRole() );

        return user.build();
    }
}
