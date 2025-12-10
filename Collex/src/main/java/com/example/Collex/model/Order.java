package com.example.Collex.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId; // Reference to Product

    @Column(nullable = false)
    private Long buyerId; // Reference to User (BUYER)

    @Column(nullable = false)
    private Long sellerId; // Reference to User (SELLER)

    @Column(nullable = false)
    private Double price; // Final transaction price

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    private String paymentMethod; // e.g., "CASH", "ONLINE", "UPI"

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String deliveryAddress;

    private String contactNumber;

    private String notes; // Additional notes from buyer

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime completedAt;

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED
    }

    public enum PaymentStatus {
        PENDING,
        PAID,
        REFUNDED
    }
}

