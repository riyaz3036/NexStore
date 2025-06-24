package nexstore.be.mappers;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import nexstore.be.dtos.Product.ProductResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Variant;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class VariantMapperImpl implements VariantMapper {

    @Override
    public VariantResponseDTO variantToVariantDto(Variant variant, ProductResponseDTO product) {
        if ( variant == null && product == null ) {
            return null;
        }

        VariantResponseDTO.VariantResponseDTOBuilder variantResponseDTO = VariantResponseDTO.builder();

        if ( variant != null ) {
            variantResponseDTO.id( variant.getId() );
            variantResponseDTO.name( variant.getName() );
            variantResponseDTO.description( variant.getDescription() );
            variantResponseDTO.price( variant.getPrice() );
            variantResponseDTO.offerPrice( variant.getOfferPrice() );
            List<String> list = variant.getImages();
            if ( list != null ) {
                variantResponseDTO.images( new ArrayList<String>( list ) );
            }
        }
        variantResponseDTO.product( product );

        return variantResponseDTO.build();
    }

    @Override
    public Variant variantDtoToVariant(VariantResponseDTO variantDTO) {
        if ( variantDTO == null ) {
            return null;
        }

        Variant.VariantBuilder<?, ?> variant = Variant.builder();

        variant.id( variantDTO.getId() );
        variant.name( variantDTO.getName() );
        variant.description( variantDTO.getDescription() );
        variant.price( variantDTO.getPrice() );
        variant.offerPrice( variantDTO.getOfferPrice() );
        List<String> list = variantDTO.getImages();
        if ( list != null ) {
            variant.images( new ArrayList<String>( list ) );
        }

        return variant.build();
    }
}
