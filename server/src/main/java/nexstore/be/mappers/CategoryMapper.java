package nexstore.be.mappers;

import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "image", target = "image")
    CategoryResponseDTO categoryToCategoryDto(Category category);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "image", target = "image")
    Category categoryDtoToCategory(CategoryResponseDTO categoryDTO);
}
