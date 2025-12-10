package com.example.Collex.repository;

import com.example.Collex.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStatus(Product.Status status);

    List<Product> findBySellerId(Long sellerId);

    List<Product> findBySellerIdAndStatus(Long sellerId, Product.Status status);

    List<Product> findByCategory(Product.Category category);

    List<Product> findByCategoryAndStatus(Product.Category category, Product.Status status);

    Optional<Product> findByIdAndSellerId(Long id, Long sellerId);
}

