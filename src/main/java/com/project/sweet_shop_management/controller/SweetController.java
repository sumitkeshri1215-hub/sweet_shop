package com.project.sweet_shop_management.controller;

import com.project.sweet_shop_management.model.Sweet;
import com.project.sweet_shop_management.service.SweetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetService sweetService;

    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }

    // Add new sweet
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> addSweet(@RequestBody Sweet sweet) {
        return ResponseEntity.ok(sweetService.addSweet(sweet));
    }

    // Get all sweets
    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }

    // Search sweets
    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        if (name != null) return ResponseEntity.ok(sweetService.searchByName(name));
        if (category != null) return ResponseEntity.ok(sweetService.searchByCategory(category));
        if (minPrice != null && maxPrice != null) {
            return ResponseEntity.ok(sweetService.searchByPriceRange(minPrice, maxPrice));
        }
        return ResponseEntity.badRequest().build();
    }

    // Update sweet
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Long id, @RequestBody Sweet sweet) {
        return ResponseEntity.ok(sweetService.updateSweet(id, sweet));
    }

    // Delete sweet (Admin only → add security later)

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.noContent().build();
    }

    // Purchase sweet
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable Long id, @RequestParam int qty) {
        return ResponseEntity.ok(sweetService.purchaseSweet(id, qty));
    }

    // Restock sweet (Admin only)

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> restockSweet(@PathVariable Long id, @RequestParam int qty) {
        return ResponseEntity.ok(sweetService.restockSweet(id, qty));
    }
}