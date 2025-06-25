package com.nextsore.backend.dtos.swagger.favorite;

import com.nextsore.backend.dtos.Favorite.FavoriteResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with an array of Favorite objects")
public class FavoriteArrayResponseDTO {
    @Schema(description = "The Favorite data array")
    private List<FavoriteResponseDTO> data;
    @Schema(description = "Count of items in the array")
    private int count;
    @Schema(description = "Status of the response")
    private String status;
}
