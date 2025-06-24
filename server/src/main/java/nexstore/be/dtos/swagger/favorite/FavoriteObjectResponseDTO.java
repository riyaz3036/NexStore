package nexstore.be.dtos.swagger.favorite;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import nexstore.be.dtos.Favorite.FavoriteResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single Favorite object")
public class FavoriteObjectResponseDTO {
    @Schema(description = "The Favorite data object")
    private FavoriteResponseDTO data;
    @Schema(description = "Status of the response")
    private String status;
} 