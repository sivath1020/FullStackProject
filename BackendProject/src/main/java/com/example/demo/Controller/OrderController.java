package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Order;
import com.example.demo.Services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // 🛒 place order
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    // 📦 get orders by user
    @GetMapping
    public List<Order> getOrders(@RequestParam String email) {
        return orderService.getOrdersByEmail(email);
    }
}
