package com.nextsore.backend.mappers;


import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO userToUserDto(User user);

    User userDtoToUser(UserResponseDTO userDTO);
}