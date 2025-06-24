package nexstore.be.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import nexstore.be.constants.RouteConstants;
import nexstore.be.dtos.Order.CreateOrderDTO;
import nexstore.be.dtos.Order.OrderResponseDTO;
import nexstore.be.dtos.Response.SuccessMessageResponseDTO;
import nexstore.be.dtos.User.UserResponseDTO;
import nexstore.be.dtos.Variant.VariantResponseDTO;
import nexstore.be.dtos.swagger.order.OrderObjectResponseDTO;
import nexstore.be.dtos.swagger.order.OrderArrayResponseDTO;
import nexstore.be.dtos.swagger.order.OrderPaginationResponseDTO;
import nexstore.be.entities.Order;
import nexstore.be.mappers.OrderMapper;
import nexstore.be.services.OrderService;
import nexstore.be.services.UserService;
import nexstore.be.services.VariantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(RouteConstants.ORDER_MODULE)
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantService variantService;

    @Autowired
    private OrderMapper orderMapper;

    @Operation(summary = "Create a new order", description = "Creates a new order.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order created successfully", content = @Content(schema = @Schema(implementation = OrderObjectResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping(RouteConstants.CREATE_ORDER)
    public ResponseEntity<OrderObjectResponseDTO> createOrder(
            @Valid @RequestBody CreateOrderDTO dto
    ) {
        OrderResponseDTO orderResponse = orderService.createOrder(dto);
        OrderObjectResponseDTO responseDto = OrderObjectResponseDTO.builder()
                .data(orderResponse)
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all orders (paginated)", description = "Returns a paginated list of all orders.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully", content = @Content(schema = @Schema(implementation = OrderPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_ORDERS)
    public ResponseEntity<OrderPaginationResponseDTO> getAllOrders(
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orderPage = orderService.getAllOrders(pageable);
        List<OrderResponseDTO> orderDTOs = orderPage.getContent().stream().map(order-> {
            UserResponseDTO user = userService.getUserById(order.getUserId());

            List<OrderResponseDTO.OrderVariantDTO> orderVariantDTOs = order.getVariants().stream().map(ov -> {
                VariantResponseDTO variant = variantService.getVariantById(ov.getVariantId());
                return orderMapper.orderVariantToOrderVariantDto(ov, variant);
            }).collect(Collectors.toList());

            return orderMapper.orderToOrderDto(order, user, orderVariantDTOs);
        }).collect(Collectors.toList());
        
        OrderPaginationResponseDTO responseDto = OrderPaginationResponseDTO.builder()
                .data(orderDTOs)
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get all orders for a user (paginated)", description = "Returns a paginated list of all orders for a specific user.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully", content = @Content(schema = @Schema(implementation = OrderPaginationResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_ALL_ORDERS_BY_USER)
    public ResponseEntity<OrderPaginationResponseDTO> getAllOrdersForUser(
            @Parameter(description = "User ID") @PathVariable() String userId,
            @Valid @RequestParam(defaultValue = "0") int page,
            @Valid @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orderPage = orderService.getAllOrdersByUser(pageable, userId);
        List<OrderResponseDTO> orderDTOs = orderPage.getContent().stream().map(order-> {
            UserResponseDTO user = userService.getUserById(order.getUserId());
            List<OrderResponseDTO.OrderVariantDTO> orderVariantDTOs = order.getVariants().stream().map(ov -> {
                VariantResponseDTO variant = variantService.getVariantById(ov.getVariantId());
                return orderMapper.orderVariantToOrderVariantDto(ov, variant);
            }).collect(Collectors.toList());

            return orderMapper.orderToOrderDto(order, user, orderVariantDTOs);
        }).collect(Collectors.toList());
        
        OrderPaginationResponseDTO responseDto = OrderPaginationResponseDTO.builder()
                .data(orderDTOs)
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Get order by ID", description = "Returns an order by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order retrieved successfully", content = @Content(schema = @Schema(implementation = OrderObjectResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Order not found", content = @Content)
    })
    @GetMapping(RouteConstants.GET_ORDER_BY_ID)
    public ResponseEntity<OrderObjectResponseDTO> getOrder(
            @Parameter(description = "Order ID") @PathVariable("id") String id
    ) {
        OrderResponseDTO orderResponse = orderService.getOrderById(id);
        OrderObjectResponseDTO responseDto = OrderObjectResponseDTO.builder()
                .data(orderResponse)
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "Delete order by ID", description = "Deletes an order by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order deleted successfully", content = @Content(schema = @Schema(implementation = SuccessMessageResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Order not found", content = @Content)
    })
    @DeleteMapping(RouteConstants.DELETE_ORDER_BY_ID)
    public ResponseEntity<SuccessMessageResponseDTO> deleteOrder(
            @Parameter(description = "Order ID") @PathVariable("id") String id
    ) {
        String response = orderService.deleteOrderById(id);
        SuccessMessageResponseDTO resp = new SuccessMessageResponseDTO(response);
        return ResponseEntity.ok(resp);
    }
}
