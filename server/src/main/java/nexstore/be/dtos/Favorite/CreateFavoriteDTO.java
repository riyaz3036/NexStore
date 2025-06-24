package nexstore.be.dtos.Favorite;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateFavoriteDTO {
    private String userId;
    private String variantId;
}
