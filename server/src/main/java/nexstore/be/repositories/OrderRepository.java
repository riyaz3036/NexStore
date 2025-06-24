package nexstore.be.repositories;

import nexstore.be.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    Page<Order> findAllByUserId(Pageable pageable, String userId);
}
