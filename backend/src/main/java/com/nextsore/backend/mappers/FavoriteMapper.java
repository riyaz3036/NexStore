package com.nextsore.backend.mappers;

import com.nextsore.backend.dtos.Favorite.FavoriteResponseDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Favorite;
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
