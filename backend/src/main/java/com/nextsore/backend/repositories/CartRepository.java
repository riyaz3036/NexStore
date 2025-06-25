package com.nextsore.backend.repositories;


import com.nextsore.backend.entities.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CartRepository extends MongoRepository<Cart, String> {
    Page<Cart> findByUserId(String userId, Pageable pageable);
    List<Cart> findAllByUserId(String userId);
    List<Cart> findByUserId(String userId);
}
