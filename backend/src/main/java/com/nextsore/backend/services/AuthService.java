package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Auth.LoginRequestDTO;
import com.nextsore.backend.dtos.Auth.LoginResponseDTO;
import com.nextsore.backend.dtos.Auth.RegisterRequestDTO;
import com.nextsore.backend.entities.User;
import com.nextsore.backend.enums.UserRole;
import com.nextsore.backend.exceptions.AlreadyExistsException;
import com.nextsore.backend.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    /* Service function to register a new user */
    public String register(
            RegisterRequestDTO dto
    ) {
        logger.info("Registering the new user");
        // search if the user exists
        if(userService.getUserByEmail(dto.getEmail()) != null)
            throw new AlreadyExistsException("Email already exists");

        // Hash the password
        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        // Create new user
        User newUser = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(hashedPassword)
                .phone(dto.getPhone() != null ? dto.getPhone() : null)
                .role(UserRole.USER)
                .build();

        userService.addUser(newUser);
        return "Successfully Registered";
    }


    /* Service function to log in a user */
    public LoginResponseDTO login(
            LoginRequestDTO dto
    ) {
        logger.info("logging in the user");

        User user = userService.getUserByEmail(dto.getEmail());

        if(user == null) throw new DataNotFoundException("User not found");

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect email or password");

        String token = jwtService.generateToken(user);

        LoginResponseDTO loggedUser = new LoginResponseDTO();
        loggedUser.setId(user.getId());
        loggedUser.setUsername(user.getUsername());
        loggedUser.setEmail(user.getEmail());
        loggedUser.setPhone(user.getPhone());
        loggedUser.setImage(user.getImage());
        loggedUser.setToken(token);

        return loggedUser;
    }

}
