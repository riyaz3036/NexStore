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
@Schema(description = "Paginated success response for Favorite")
public class FavoritePaginationResponseDTO {
    @Schema(description = "List of Favorite data items")
    private List<FavoriteResponseDTO> data;

    @Schema(description = "Total number of elements")
    private long totalElements;

    @Schema(description = "Total number of pages")
    private int totalPages;

    @Schema(description = "Status of the response")
    private String status;
}
