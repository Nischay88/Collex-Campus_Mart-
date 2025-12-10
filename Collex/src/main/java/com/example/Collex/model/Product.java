package com.example.Collex.model;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Condition condition;

    private Double mrp; // Original Maximum Retail Price

    @Column(nullable = false)
    private Double price; // Selling price

    private Integer ageInMonths; // Age of product in months

    @ElementCollection
    private List<String> images; // URLs or base64 encoded images

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private String rejectionReason; // Only if status is REJECTED

    @Column(nullable = false)
    private Long sellerId; // Reference to User ID (SELLER)

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime approvedAt; // When admin approved

    private LocalDateTime rejectedAt; // When admin rejected

    public enum Category {
        BOOKS,
        ELECTRONICS,
        NOTES_STUDY_MATERIAL,
        ACCESSORIES,
        CALCULATORS,
        OTHERS
    }

    public enum Condition {
        NEW,
        LIKE_NEW,
        USED,
        OLD
    }

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}

