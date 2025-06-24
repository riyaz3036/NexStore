package nexstore.be.mappers;

import nexstore.be.dtos.Favorite.FavoriteResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {
    @Mappings({
            @Mapping( source = "fav.id", target = "id" ),
            @Mapping( source = "user", target = "user" ),
            @Mapping( source = "variant", target = "variant" )
    })
    FavoriteResponseDTO favToFavDto(Favorite fav, UserResponseDTO user, VariantResponseDTO variant);
    Favorite favDtoToFav(FavoriteResponseDTO favDTO);
}
