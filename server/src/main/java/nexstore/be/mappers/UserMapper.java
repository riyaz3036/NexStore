package nexstore.be.mappers;

import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO userToUserDto(User user);

    User userDtoToUser(UserResponseDTO userDTO);
}
