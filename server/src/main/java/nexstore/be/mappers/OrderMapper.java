package nexstore.be.mappers;

import nexstore.be.dtos.Order.OrderResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mappings({
            @Mapping(source = "user", target = "user"),
            @Mapping(source = "order.id", target = "id"),
            @Mapping(source = "variants", target = "variants"),
            @Mapping(source = "order.createdAt", target = "createdAt"),
    })
    OrderResponseDTO orderToOrderDto(Order order, UserResponseDTO user, List<OrderResponseDTO.OrderVariantDTO> variants);

    Order orderDtoToOrder(OrderResponseDTO orderDTO);

    @Mappings({
            @Mapping(source = "variant", target = "variant")
    })
    OrderResponseDTO.OrderVariantDTO orderVariantToOrderVariantDto(Order.OrderVariant orderVariant, VariantResponseDTO variant);
}
