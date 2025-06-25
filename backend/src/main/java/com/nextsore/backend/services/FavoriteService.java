package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Favorite.CreateFavoriteDTO;
import com.nextsore.backend.dtos.Favorite.FavoriteResponseDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Favorite;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.FavoriteMapper;
import com.nextsore.backend.mappers.UserMapper;
import com.nextsore.backend.mappers.VariantMapper;
import com.nextsore.backend.repositories.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private static final Logger logger = LoggerFactory.getLogger(FavoriteService.class);

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Autowired
    private VariantService variantService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private VariantMapper variantMapper;


    /* Service function to add a new a favoraite */
    public FavoriteResponseDTO createFav(CreateFavoriteDTO dto ) throws BadRequestException {
        logger.info("Creating Favorite");
        Optional<Favorite> existingFav = favoriteRepository.findByUserIdAndVariantId(dto.getUserId(), dto.getVariantId());
        if(existingFav.isPresent()) throw new BadRequestException("Already a favorite");
        Favorite fav = new Favorite();

        UserResponseDTO user = userService.getUserById(dto.getUserId());
        VariantResponseDTO variant = variantService.getVariantById(dto.getVariantId());
        fav.setUserId(user.getId());
        fav.setVariantId(dto.getVariantId());

        Favorite savedFav = favoriteRepository.save(fav);
        return favoriteMapper.favToFavDto(savedFav, user, variant);
    }



    /* Service function to retrieve a favorite */
    public FavoriteResponseDTO getFavById(String id ){
        logger.info("Finding Favorite with id: {}", id);

        Favorite fav = favoriteRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Favorite not found with Id: {}", id);
                    return new DataNotFoundException("Favorite Not found with the given Id");
                });

        UserResponseDTO user = userService.getUserById(fav.getUserId());
        VariantResponseDTO variant = variantService.getVariantById(fav.getVariantId());
        return favoriteMapper.favToFavDto(fav, user, variant);
    }


    /* Service function to retrieve a favorite by user id */
    public Page<Favorite> getFavByUserId(String userId, Pageable pageable ){
        logger.info("Finding Favorite with user id: {}", userId);

        Page<Favorite> favsPage = favoriteRepository.findByUserId(userId, pageable);

        return favsPage;
    }


    /* Service function to retrieve a favorite by user id and variant id */
    public Optional<Favorite> getFavByUserIdAndVariantId(String userId, String variantId ){
        logger.info("Finding Favorite with user id {} and variant id: {}", userId, variantId);
        return favoriteRepository.findByUserIdAndVariantId(userId, variantId);
    }


    /* Service function to retrieve all favs */
    public Page<Favorite> getAllFavs(Pageable pageable){
        logger.info("Finding all Favorites");
        Page<Favorite> favPage = favoriteRepository.findAll(pageable);
        return favPage;
    }


    /* Service function to delete a fav by id */
    public String deleteFavById(String id){
        logger.info("Deleting Favorite with Id: {}", id);
        Favorite fav = favoriteRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Favorite not found with Id: {}", id);
                    return new DataNotFoundException("Favorite Not found with the given Id");
                });

        favoriteRepository.delete(fav);
        return "Favorite deleted successfully.";
    }
}
