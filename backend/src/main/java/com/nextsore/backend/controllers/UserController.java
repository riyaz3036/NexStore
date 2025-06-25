package com.nextsore.backend.controllers;

import com.nextsore.backend.constants.RouteConstants;
import com.nextsore.backend.dtos.Response.SuccessMessageResponseDTO;
import com.nextsore.backend.dtos.User.UpdateUserDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.swagger.user.UserObjectResponseDTO;
import com.nextsore.backend.dtos.swagger.user.UserPaginationResponseDTO;
import com.nextsore.backend.entities.User;
import com.nextsore.backend.mappers.UserMapper;
import com.nextsore.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.USER_MODULE)
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Operation(summary = "Get all users (paginated)", description = "Returns a paginated list of all users.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully", content = @Content(schema = @Schema(implementation = UserPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_USERS)
    public ResponseEntity<UserPaginationResponseDTO> getAllUsers(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userService.getAllUsers(pageable);
        List<UserResponseDTO> userDTOs = userPage.getContent().stream().map(userMapper:: userToUserDto).collect(Collectors.toList());
        UserPaginationResponseDTO responseDto = UserPaginationResponseDTO.builder()
                .data(userDTOs)
                .totalElements(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get user by ID", description = "Returns a user by their ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User retrieved successfully", content = @Content(schema = @Schema(implementation = UserObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_USER_BY_ID)
    public ResponseEntity<UserObjectResponseDTO> getUser(
            @Parameter(description = "User ID") @PathVariable("id") String id
    ) {
        UserResponseDTO userResponse = userService.getUserById(id);
        UserObjectResponseDTO responseDto = UserObjectResponseDTO.builder().data(userResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Update user by ID", description = "Updates a user by their ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully", content = @Content(schema = @Schema(implementation = UserObjectResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @PatchMapping(RouteConstants.UPDATE_USER_BY_ID)
    public ResponseEntity<UserObjectResponseDTO> updateUser(
            @Parameter(description = "User ID") @PathVariable("id") String id,
            @Valid @RequestBody UpdateUserDTO dto
    ) {
        UserResponseDTO userResponse = userService.updateUserById(id, dto);
        UserObjectResponseDTO responseDto = UserObjectResponseDTO.builder().data(userResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete user by ID", description = "Deletes a user by their ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_USER_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteUser(
            @Parameter(description = "User ID") @PathVariable("id") String id
    ) {
        String response = userService.deleteUserById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}
