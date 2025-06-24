package nexstore.be.mappers;

import javax.annotation.processing.Generated;
import nexstore.be.dtos.Category.CategoryResponseDTO;
import nexstore.be.entities.Category;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResponseDTO categoryToCategoryDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponseDTO.CategoryResponseDTOBuilder categoryResponseDTO = CategoryResponseDTO.builder();

        categoryResponseDTO.id( category.getId() );
        categoryResponseDTO.description( category.getDescription() );
        categoryResponseDTO.image( category.getImage() );

        return categoryResponseDTO.build();
    }

    @Override
    public Category categoryDtoToCategory(CategoryResponseDTO categoryDTO) {
        if ( categoryDTO == null ) {
            return null;
        }

        Category.CategoryBuilder<?, ?> category = Category.builder();

        category.id( categoryDTO.getId() );
        category.description( categoryDTO.getDescription() );
        category.image( categoryDTO.getImage() );

        return category.build();
    }
}
