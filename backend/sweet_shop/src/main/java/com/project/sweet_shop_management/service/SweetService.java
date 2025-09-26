package com.project.sweet_shop_management.service;

import com.project.sweet_shop_management.model.Sweet;

import java.util.List;
import java.util.Optional;

public interface SweetService {
    Sweet addSweet(Sweet sweet);
    List<Sweet> getAllSweets();
    List<Sweet> searchByName(String name);
    List<Sweet> searchByCategory(String category);
    List<Sweet> searchByPriceRange(double minPrice, double maxPrice);
    Optional<Sweet> getSweetById(Long id);
    Sweet updateSweet(Long id, Sweet sweet);
    void deleteSweet(Long id);
    Sweet purchaseSweet(Long id, int quantity);
    Sweet restockSweet(Long id, int quantity);
}
