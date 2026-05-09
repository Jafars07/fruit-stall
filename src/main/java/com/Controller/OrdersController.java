package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import com.dto.CheckoutRequest;
import com.Entity.Orders;
import com.Entity.Cart;
import com.Entity.OrderItem;

import com.Repository.OrdersRepository;
import com.Repository.CartRepository;
import com.Repository.OrderItemRepository;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    @Autowired
    private OrdersRepository orderRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;
    
    @PostMapping("/place/{userId}")
    public Orders placeOrder(

            @PathVariable Long userId,

            @RequestBody CheckoutRequest request
    ) {

        List<Cart> cartItems = cartRepo.findByUserId(userId);

        double total = 0;

        Orders order = new Orders();

        order.setUserId(userId);

        order.setStatus("PLACED");

        order.setCustomerName(request.getCustomerName());

        order.setPhone(request.getPhone());

        order.setAddress(request.getAddress());

        order.setOrderDate(LocalDate.now().toString());

        order.setOrderTime(LocalTime.now().withNano(0).toString());

        Orders savedOrder = orderRepo.save(order);

        for (Cart c : cartItems) {

            OrderItem item = new OrderItem();

            item.setOrderId(savedOrder.getId());

            item.setProductId(c.getProductId());

            item.setName(c.getName());

            item.setPrice(c.getPrice());

            item.setQuantity(c.getQuantity());

            total += c.getPrice() * c.getQuantity();

            orderItemRepo.save(item);
        }

        savedOrder.setTotalAmount(total);

        orderRepo.save(savedOrder);

        cartRepo.deleteByUserId(userId);

        return savedOrder;
    }
    
 // GET ALL ORDERS FOR ADMIN
    @GetMapping
    public List<Orders> getAllOrders() {

        return orderRepo.findAllByOrderByIdDesc();
    }
    
    //find the user by using id
    @GetMapping("/user/{userId}")
    public List<Orders> getOrdersByUser(@PathVariable Long userId) {
        return orderRepo.findByUserId(userId);
    }
    //Fetch items one by one
    @GetMapping("/items/{orderId}")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {
        return orderItemRepo.findByOrderId(orderId);
    }
    
 // MARK ORDER AS DELIVERED
    @PutMapping("/delivered/{orderId}")
    public Orders markDelivered(@PathVariable Long orderId) {

        Orders order = orderRepo.findById(orderId).orElse(null);

        if (order != null) {
            order.setStatus("DELIVERED");
            return orderRepo.save(order);
        }

        return null;
    }
}