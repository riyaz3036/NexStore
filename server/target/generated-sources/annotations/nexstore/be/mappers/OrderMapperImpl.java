package nexstore.be.mappers;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import nexstore.be.dtos.Order.OrderResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.entities.Order;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T07:06:26+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Amazon.com Inc.)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderResponseDTO orderToOrderDto(Order order, UserResponseDTO user, List<OrderResponseDTO.OrderVariantDTO> variants) {
        if ( order == null && user == null && variants == null ) {
            return null;
        }

        OrderResponseDTO.OrderResponseDTOBuilder orderResponseDTO = OrderResponseDTO.builder();

        if ( order != null ) {
            orderResponseDTO.id( order.getId() );
            orderResponseDTO.createdAt( order.getCreatedAt() );
            orderResponseDTO.paymentMode( order.getPaymentMode() );
            orderResponseDTO.total( order.getTotal() );
            orderResponseDTO.address( order.getAddress() );
        }
        orderResponseDTO.user( user );
        List<OrderResponseDTO.OrderVariantDTO> list = variants;
        if ( list != null ) {
            orderResponseDTO.variants( new ArrayList<OrderResponseDTO.OrderVariantDTO>( list ) );
        }

        return orderResponseDTO.build();
    }

    @Override
    public Order orderDtoToOrder(OrderResponseDTO orderDTO) {
        if ( orderDTO == null ) {
            return null;
        }

        Order.OrderBuilder<?, ?> order = Order.builder();

        order.id( orderDTO.getId() );
        order.createdAt( orderDTO.getCreatedAt() );
        order.variants( orderVariantDTOListToOrderVariantList( orderDTO.getVariants() ) );
        order.paymentMode( orderDTO.getPaymentMode() );
        order.total( orderDTO.getTotal() );
        order.address( orderDTO.getAddress() );

        return order.build();
    }

    @Override
    public OrderResponseDTO.OrderVariantDTO orderVariantToOrderVariantDto(Order.OrderVariant orderVariant, VariantResponseDTO variant) {
        if ( orderVariant == null && variant == null ) {
            return null;
        }

        OrderResponseDTO.OrderVariantDTO orderVariantDTO = new OrderResponseDTO.OrderVariantDTO();

        if ( orderVariant != null ) {
            if ( orderVariant.getQuantity() != null ) {
                orderVariantDTO.setQuantity( orderVariant.getQuantity() );
            }
        }
        if ( variant != null ) {
            orderVariantDTO.setVariant( variant );
            orderVariantDTO.setId( variant.getId() );
        }

        return orderVariantDTO;
    }

    protected Order.OrderVariant orderVariantDTOToOrderVariant(OrderResponseDTO.OrderVariantDTO orderVariantDTO) {
        if ( orderVariantDTO == null ) {
            return null;
        }

        Order.OrderVariant orderVariant = new Order.OrderVariant();

        orderVariant.setQuantity( orderVariantDTO.getQuantity() );

        return orderVariant;
    }

    protected List<Order.OrderVariant> orderVariantDTOListToOrderVariantList(List<OrderResponseDTO.OrderVariantDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Order.OrderVariant> list1 = new ArrayList<Order.OrderVariant>( list.size() );
        for ( OrderResponseDTO.OrderVariantDTO orderVariantDTO : list ) {
            list1.add( orderVariantDTOToOrderVariant( orderVariantDTO ) );
        }

        return list1;
    }
}
