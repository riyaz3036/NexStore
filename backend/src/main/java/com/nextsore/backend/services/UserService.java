package com.nextsore.backend.services;

import com.nextsore.backend.dtos.User.UpdateUserDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.entities.User;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.UserMapper;
import com.nextsore.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;


    /* Service function to add a new user */
    public User addUser (User user ) {
        logger.info("Adding User");
        return userRepository.save(user);
    }


    /* Service function to retrieve a user */
    public UserResponseDTO getUserById (String id ) {
        logger.info("Finding User with Id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with Id: {}", id);
                    return new DataNotFoundException("User Not found with the given Id");
                });

        return userMapper.userToUserDto(user);
    }


    /* Service function to retrieve a user by email */
    public User getUserByEmail ( String email ) {
        logger.info("Finding User with email: {}", email);
        return userRepository.findByEmail(email).orElse(null);
    }


    /* Service function to retrieve all users */
    public Page<User> getAllUsers(Pageable pageable){
        logger.info("Finding all Users");
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage;
    }


    /* Updates details of a user by id */
    public UserResponseDTO updateUserById(String id, UpdateUserDTO dto){
        logger.info("Updating User with Id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with Id: {}", id);
                    return new DataNotFoundException("User Not found with the given Id");
                });

        if(dto.getUsername() != null) user.setUsername(dto.getUsername());
        if(dto.getPhone() != null) user.setPhone(dto.getPhone());

        User updatedUser = userRepository.save(user);
        return userMapper.userToUserDto(updatedUser);
    }


    /* Service function to delete a user by id */
    public String deleteUserById(String id){
        logger.info("Deleting User with Id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with Id: {}", id);
                    return new DataNotFoundException("User Not found with the given Id");
                });

        userRepository.delete(user);
        return "User deleted successfully.";
    }


    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
