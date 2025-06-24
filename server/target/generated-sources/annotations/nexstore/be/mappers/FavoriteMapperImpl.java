package nexstore.be.mappers;

import javax.annotation.processing.Generated;
import nexstore.be.dtos.Favorite.FavoriteResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Favorite;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class FavoriteMapperImpl implements FavoriteMapper {

    @Override
    public FavoriteResponseDTO favToFavDto(Favorite fav, UserResponseDTO user, VariantResponseDTO variant) {
        if ( fav == null && user == null && variant == null ) {
            return null;
        }

        FavoriteResponseDTO.FavoriteResponseDTOBuilder favoriteResponseDTO = FavoriteResponseDTO.builder();

        if ( fav != null ) {
            favoriteResponseDTO.id( fav.getId() );
        }
        favoriteResponseDTO.user( user );
        favoriteResponseDTO.variant( variant );

        return favoriteResponseDTO.build();
    }

    @Override
    public Favorite favDtoToFav(FavoriteResponseDTO favDTO) {
        if ( favDTO == null ) {
            return null;
        }

        Favorite.FavoriteBuilder<?, ?> favorite = Favorite.builder();

        favorite.id( favDTO.getId() );

        return favorite.build();
    }
}
