package com.nextsore.backend.services;

import com.nextsore.backend.dtos.Order.CreateOrderDTO;
import com.nextsore.backend.dtos.Order.OrderResponseDTO;
import com.nextsore.backend.dtos.User.UserResponseDTO;
import com.nextsore.backend.dtos.Variant.VariantFilterDTO;
import com.nextsore.backend.dtos.Variant.VariantResponseDTO;
import com.nextsore.backend.entities.Order;
import com.nextsore.backend.entities.Variant;
import com.nextsore.backend.exceptions.DataNotFoundException;
import com.nextsore.backend.mappers.OrderMapper;
import com.nextsore.backend.mappers.UserMapper;
import com.nextsore.backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private VariantService variantService;


    /* Service function to add a new an order */
    public OrderResponseDTO createOrder(CreateOrderDTO dto ){
        logger.info("Creating Order");

        Order order = new Order();

        order.setUserId(dto.getUserId());
        order.setPaymentMode(dto.getPaymentMode());
        order.setAddress(dto.getAddress());
        order.setTotal(dto.getTotal());

        // Collect all variant IDs from DTO
        List<String> variantIds = dto.getVariants().stream()
                .map(CreateOrderDTO.CreateOrderVariantDTO::getVariantId)
                .toList();

        // Fetch all Variant entities at once (better than 1-by-1)
        VariantFilterDTO filterDTO = new VariantFilterDTO();
        filterDTO.setVariantIds(variantIds);
        List<Variant> variants = variantService.getAllVariantsWithoutPagination(filterDTO);

        // Map variantId to Variant for fast lookup
        Map<String, Variant> variantMap = variants.stream()
                .collect(Collectors.toMap(Variant::getId, Function.identity()));

        // Create list of Order.OrderVariant
        List<Order.OrderVariant> orderVariants = dto.getVariants().stream()
                .map(orderVariantDTO -> {
                    Variant variant = variantMap.get(orderVariantDTO.getVariantId());
                    if (variant == null) {
                        throw new IllegalArgumentException("Variant with ID " + orderVariantDTO.getVariantId() + " not found");
                    }
                    Order.OrderVariant ov = new Order.OrderVariant();
                    ov.setVariantId(orderVariantDTO.getVariantId());
                    ov.setQuantity(orderVariantDTO.getQuantity());
                    return ov;
                })
                .toList();

        order.setVariants(orderVariants);

        Order savedOrder = orderRepository.save(order);

        UserResponseDTO user = userService.getUserById(dto.getUserId());

        // clear out the user cart
        cartService.emptyCartByUserId(user.getId());

        List<OrderResponseDTO.OrderVariantDTO> orderVariantDTOs = savedOrder.getVariants().stream().map(ov -> {
            VariantResponseDTO variant = variantService.getVariantById(ov.getVariantId());
            return orderMapper.orderVariantToOrderVariantDto(ov, variant);
        }).collect(Collectors.toList());

        return orderMapper.orderToOrderDto(savedOrder, user, orderVariantDTOs);
    }


    /* Service function to retrieve a cart */
    public OrderResponseDTO getOrderById(String id ){
        logger.info("Finding Order with id: {}", id);

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Order not found with Id: {}", id);
                    return new DataNotFoundException("Order Not found with the given Id");
                });

        UserResponseDTO user = userService.getUserById(order.getUserId());

        List<OrderResponseDTO.OrderVariantDTO> orderVariantDTOs = order.getVariants().stream().map(ov -> {
            VariantResponseDTO variant = variantService.getVariantById(ov.getVariantId());
            return orderMapper.orderVariantToOrderVariantDto(ov, variant);
        }).collect(Collectors.toList());

        return orderMapper.orderToOrderDto(order, user, orderVariantDTOs);
    }


    public Page<Order> getAllOrders(Pageable pageable){
        logger.info("Finding all Orders");
        Page<Order> orderPage = orderRepository.findAll(pageable);
        return orderPage;
    }

    public Page<Order> getAllOrdersByUser(Pageable pageable, String userId){
        logger.info("Finding all Orders for user with id: {}", userId);
        Page<Order> orderPage = orderRepository.findAllByUserId(pageable, userId);
        return orderPage;
    }


    /* Service function to delete an order by id */
    public String deleteOrderById(String id){
        logger.info("Deleting Order with Id: {}", id);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Order not found with Id: {}", id);
                    return new DataNotFoundException("Order Not found with the given Id");
                });

        orderRepository.delete(order);
        return "Order deleted successfully.";
    }
}
