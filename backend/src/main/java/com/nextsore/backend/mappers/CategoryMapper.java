package com.nextsore.backend.mappers;

import com.nextsore.backend.dtos.Category.CategoryResponseDTO;
import com.nextsore.backend.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "category.id", target = "id")
    @Mapping(source = "category.description", target = "description")
    @Mapping(source = "category.image", target = "image")
    CategoryResponseDTO categoryToCategoryDto(Category category);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "image", target = "image")
    Category categoryDtoToCategory(CategoryResponseDTO categoryDTO);
}
