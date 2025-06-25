package com.nextsore.backend.controllers;

import com.nextsore.backend.constants.RouteConstants;
import com.nextsore.backend.dtos.Auth.LoginRequestDTO;
import com.nextsore.backend.dtos.Auth.LoginResponseDTO;
import com.nextsore.backend.dtos.Auth.RegisterRequestDTO;
import com.nextsore.backend.dtos.Response.SuccessMessageResponseDTO;
import com.nextsore.backend.dtos.swagger.auth.AuthObjectResponseDTO;
import com.nextsore.backend.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(RouteConstants.AUTH_MODULE)
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Operation(summary = "Register a new user", description = "Registers a new user.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User registered successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.REGISTER)
    public ResponseEntity<SuccessMessageResponseDTO> register(
            @RequestBody RegisterRequestDTO dto
    ) {
        logger.info("Recieved request to register a user");
        String message = authService.register(dto);
        return ResponseEntity.ok(new SuccessMessageResponseDTO(message));
    }

    @Operation(summary = "Login user", description = "Logs in a user and returns a JWT token.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User logged in successfully", content = @Content(schema = @Schema(implementation = AuthObjectResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content)
    })
    @PostMapping(RouteConstants.LOGIN)
    public ResponseEntity<AuthObjectResponseDTO> login(
            @RequestBody LoginRequestDTO dto,
            HttpServletResponse response
    ){
        LoginResponseDTO result = authService.login(dto);

        Cookie cookie = new Cookie("accessToken", result.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // set false in dev if needed
        cookie.setPath("/");
        cookie.setMaxAge(15 * 24 * 60 * 60); // 15 days
        cookie.setDomain("localhost"); // change for production domain
        response.addCookie(cookie);

        AuthObjectResponseDTO responseDto = AuthObjectResponseDTO.builder().data(result).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

}
