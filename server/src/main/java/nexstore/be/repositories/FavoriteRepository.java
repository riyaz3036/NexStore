package nexstore.be.repositories;

import nexstore.be.entities.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {
    Page<Favorite> findByUserId(String userId, Pageable pageable);

    Optional<Favorite> findByUserIdAndVariantId(String userId, String variantId);
}
