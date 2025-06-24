package nexstore.be.repositories;

import nexstore.be.entities.Variant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface VariantRepository extends MongoRepository<Variant, String> {
    @Query("SELECT v FROM Variant v WHERE " +
            "(:#{#variantIds.isEmpty()} = true OR v.id IN :variantIds) ")
    List<Variant> searchByVariantIds(
            @Param("description") List<String> variantIds
    );

    List<Variant> findByProductId(String productId);

    Page<Variant> findByProductIdIn(List<String> productIds, Pageable pageable);


    @Query("SELECT v FROM Variant v " +
            "JOIN v.product p " +
            "WHERE p.categoryId = :categoryId")
    Page<Variant> findAllByCategoryId(
            @Param("categoryId") String categoryId,
            Pageable pageable
    );

    Page<Variant> findAllByProductId(String productId, Pageable pageable); // ✅ correct
}