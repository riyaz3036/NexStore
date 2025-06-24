package nexstore.be.services;

import lombok.RequiredArgsConstructor;
import nexstore.be.dtos.Auth.LoginRequestDTO;
import nexstore.be.dtos.Auth.LoginResponseDTO;
import nexstore.be.dtos.Auth.RegisterRequestDTO;
import nexstore.be.entities.User;
import nexstore.be.enums.UserRole;
import nexstore.be.exceptions.AlreadyExistsException;
import nexstore.be.exceptions.DataNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
