package com.nextsore.backend.repositories;


import com.nextsore.backend.entities.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {
    Page<Favorite> findByUserId(String userId, Pageable pageable);

    Optional<Favorite> findByUserIdAndVariantId(String userId, String variantId);
}
