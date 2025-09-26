package com.project.sweet_shop_management.service;

import com.project.sweet_shop_management.model.Sweet;
import com.project.sweet_shop_management.repository.SweetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SweetServiceImpl implements SweetService {

    private final SweetRepository sweetRepository;

    public SweetServiceImpl(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    @Override
    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    @Override
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    @Override
    public List<Sweet> searchByName(String name) {
        return sweetRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Sweet> searchByCategory(String category) {
        return sweetRepository.findByCategoryContainingIgnoreCase(category);
    }

    @Override
    public List<Sweet> searchByPriceRange(double minPrice, double maxPrice) {
        return sweetRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public Optional<Sweet> getSweetById(Long id) {
        return sweetRepository.findById(id);
    }

    @Override
    public Sweet updateSweet(Long id, Sweet updatedSweet) {
        return sweetRepository.findById(id)
                .map(sweet -> {
                    sweet.setName(updatedSweet.getName());
                    sweet.setCategory(updatedSweet.getCategory());
                    sweet.setPrice(updatedSweet.getPrice());
                    sweet.setQuantity(updatedSweet.getQuantity());
                    return sweetRepository.save(sweet);
                })
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
    }

    @Override
    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    @Override
    public Sweet purchaseSweet(Long id, int qty) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (sweet.getQuantity() < qty) {
            throw new RuntimeException("Not enough stock available");
        }
        sweet.setQuantity(sweet.getQuantity() - qty);
        return sweetRepository.save(sweet);
    }

    @Override
    public Sweet restockSweet(Long id, int qty) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
        sweet.setQuantity(sweet.getQuantity() + qty);
        return sweetRepository.save(sweet);
    }
}

