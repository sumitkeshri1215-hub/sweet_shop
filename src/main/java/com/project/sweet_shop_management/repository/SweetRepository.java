package com.project.sweet_shop_management.repository;

import com.project.sweet_shop_management.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SweetRepository extends JpaRepository<Sweet, Long> {
    // Custom query methods
    List<Sweet> findByNameContainingIgnoreCase(String name);

    List<Sweet> findByCategoryContainingIgnoreCase(String category);

    List<Sweet> findByPriceBetween(double minPrice, double maxPrice);
}
