package com.example.demo.Services;



import java.util.List;

import com.example.demo.Model.Order;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getOrdersByEmail(String email);
}
