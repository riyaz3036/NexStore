package nexstore.be.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import nexstore.be.constants.RouteConstants;
import nexstore.be.dtos.Favorite.CreateFavoriteDTO;
import nexstore.be.dtos.Favorite.FavoriteResponseDTO;
import nexstore.be.dtos.Response.SuccessMessageResponseDTO;
import nexstore.be.dtos.Response.SuccessObjectResponseDTO;
import nexstore.be.dtos.Response.SuccessPaginationResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.dtos.swagger.favorite.FavoriteObjectResponseDTO;
import nexstore.be.dtos.swagger.favorite.FavoriteArrayResponseDTO;
import nexstore.be.dtos.swagger.favorite.FavoritePaginationResponseDTO;
import nexstore.be.entities.Favorite;
import nexstore.be.mappers.FavoriteMapper;
import nexstore.be.services.FavoriteService;
import nexstore.be.services.UserService;
import nexstore.be.services.VariantService;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.FAVORITE_MODULE)
public class FavoriteController {
    private static final Logger logger = LoggerFactory.getLogger(FavoriteController.class);

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantService variantService;

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Operation(summary = "Create a favorite", description = "Creates a new favorite entry.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorite created successfully", content = @Content(schema = @Schema(implementation = FavoriteObjectResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_FAV)
    public ResponseEntity<FavoriteObjectResponseDTO> createFav(
            @Valid @RequestBody CreateFavoriteDTO dto
    ) throws BadRequestException {
        FavoriteResponseDTO favResponse = favoriteService.createFav(dto);
        FavoriteObjectResponseDTO responseDto = FavoriteObjectResponseDTO.builder().data(favResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all favorites (paginated)", description = "Returns a paginated list of all favorites.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorites retrieved successfully", content = @Content(schema = @Schema(implementation = FavoritePaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_FAVS)
    public ResponseEntity<FavoritePaginationResponseDTO> getAllFavs(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Favorite> favPage = favoriteService.getAllFavs(pageable);

        List<FavoriteResponseDTO> favDTOs = favPage.getContent().stream().map(fav -> {
            UserResponseDTO user = userService.getUserById(fav.getUserId());
            VariantResponseDTO variant = variantService.getVariantById(fav.getVariantId());
            return favoriteMapper.favToFavDto(fav, user, variant);
        }).collect(Collectors.toList());

        FavoritePaginationResponseDTO responseDto = FavoritePaginationResponseDTO.builder()
                .data(favDTOs)
                .totalElements(favPage.getTotalElements())
                .totalPages(favPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get favorite by ID", description = "Returns a favorite by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorite retrieved successfully", content = @Content(schema = @Schema(implementation = FavoriteObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Favorite not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_FAV_BY_ID)
    public ResponseEntity<FavoriteObjectResponseDTO> getFav(
            @Parameter(description = "Favorite ID") @PathVariable("id") String id
    ) {
        FavoriteResponseDTO favResponse = favoriteService.getFavById(id);
        FavoriteObjectResponseDTO responseDto = FavoriteObjectResponseDTO.builder().data(favResponse).status("success").build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get favorites by user (paginated)", description = "Returns a paginated list of favorites for a user.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorites retrieved successfully", content = @Content(schema = @Schema(implementation = SuccessPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_FAV_BY_USER_ID)
    public ResponseEntity<SuccessPaginationResponseDTO> getFavByUserId(
            @Parameter(description = "User ID") @PathVariable("id") String id,
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Favorite> favPage = favoriteService.getFavByUserId(id, pageable);

        List<FavoriteResponseDTO> favDTOs = favPage.getContent().stream().map(fav -> {
            UserResponseDTO user = userService.getUserById(fav.getUserId());
            VariantResponseDTO variant = variantService.getVariantById(fav.getVariantId());
            return favoriteMapper.favToFavDto(fav, user, variant);
        }).collect(Collectors.toList());

        SuccessPaginationResponseDTO<FavoriteResponseDTO> responseDto = new SuccessPaginationResponseDTO<>(favDTOs, favPage.getTotalElements(), favPage.getTotalPages());
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get favorite by user and variant", description = "Returns a favorite for a user and variant.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorite retrieved successfully", content = @Content(schema = @Schema(implementation = SuccessObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Favorite not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_FAV_BY_USER_ID_AND_VARIANT_ID)
    public ResponseEntity<SuccessObjectResponseDTO> getFavByUserIdAndVariantId(
            @Parameter(description = "User ID") @Valid @RequestParam() String userId,
            @Parameter(description = "Variant ID") @Valid @RequestParam() String variantId
    ) {
        Optional<Favorite> fav = favoriteService.getFavByUserIdAndVariantId(userId, variantId);

        SuccessObjectResponseDTO<FavoriteResponseDTO> responseDto = new SuccessObjectResponseDTO(fav);
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete favorite by ID", description = "Deletes a favorite by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorite deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Favorite not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_FAV_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteFav(
            @Parameter(description = "Favorite ID") @PathVariable("id") String id
    ) {
        String response = favoriteService.deleteFavById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}
