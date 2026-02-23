package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Order;
import com.example.demo.Repossitory.OrderRepository;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order placeOrder(Order order) {

        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        return orderRepository.save(order);
    }

    @Override
    public List getOrdersByEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }
}
