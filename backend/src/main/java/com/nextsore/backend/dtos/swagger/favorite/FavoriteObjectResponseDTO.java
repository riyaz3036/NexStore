package com.nextsore.backend.dtos.swagger.favorite;

import com.nextsore.backend.dtos.Favorite.FavoriteResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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
