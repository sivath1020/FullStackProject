package com.example.demo.Repossitory;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserEmail(String userEmail);
}
