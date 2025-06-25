package com.nextsore.backend.repositories;

import com.nextsore.backend.entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
