package nexstore.be.repositories;

import nexstore.be.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategoryIdIn(List<String> categoryId);

    Page<Product> findAllByCategoryId(String categoryId, Pageable pageable);

    List<Product> findByCategoryIdInAndIsBestSeller(List<String> categoryIds, boolean isBestSeller);
}