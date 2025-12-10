package com.example.Collex.repository;

import com.example.Collex.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findBySellerId(Long sellerId);

    List<Order> findByProductId(Long productId);

    List<Order> findByBuyerIdAndStatus(Long buyerId, Order.OrderStatus status);

    List<Order> findBySellerIdAndStatus(Long sellerId, Order.OrderStatus status);
}

