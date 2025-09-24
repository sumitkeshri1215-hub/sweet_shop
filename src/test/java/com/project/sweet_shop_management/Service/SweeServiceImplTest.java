package com.project.sweet_shop_management.Service;

import com.project.sweet_shop_management.model.Sweet;
import com.project.sweet_shop_management.repository.SweetRepository;
import com.project.sweet_shop_management.service.SweetServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SweetServiceImplTest {

    @Mock
    private SweetRepository sweetRepository;

    @InjectMocks
    private SweetServiceImpl sweetService;

    private Sweet sweet1;
    private Sweet sweet2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        sweet1 = new Sweet();
        sweet1.setId(1L);
        sweet1.setName("Gulab Jamun");
        sweet1.setCategory("Indian");
        sweet1.setPrice(50);
        sweet1.setQuantity(100);

        sweet2 = new Sweet();
        sweet2.setId(2L);
        sweet2.setName("Rasgulla");
        sweet2.setCategory("Indian");
        sweet2.setPrice(40);
        sweet2.setQuantity(80);
    }

    @Test
    void testAddSweet() {
        when(sweetRepository.save(sweet1)).thenReturn(sweet1);
        Sweet result = sweetService.addSweet(sweet1);
        assertEquals(sweet1, result);
        verify(sweetRepository, times(1)).save(sweet1);
    }

    @Test
    void testGetAllSweets() {
        when(sweetRepository.findAll()).thenReturn(Arrays.asList(sweet1, sweet2));
        List<Sweet> sweets = sweetService.getAllSweets();
        assertEquals(2, sweets.size());
        verify(sweetRepository, times(1)).findAll();
    }

    @Test
    void testSearchByName() {
        when(sweetRepository.findByNameContainingIgnoreCase("Gulab")).thenReturn(List.of(sweet1));
        List<Sweet> result = sweetService.searchByName("Gulab");
        assertEquals(1, result.size());
        assertEquals("Gulab Jamun", result.get(0).getName());
    }

    @Test
    void testSearchByCategory() {
        when(sweetRepository.findByCategoryContainingIgnoreCase("Indian")).thenReturn(Arrays.asList(sweet1, sweet2));
        List<Sweet> result = sweetService.searchByCategory("Indian");
        assertEquals(2, result.size());
    }

    @Test
    void testSearchByPriceRange() {
        when(sweetRepository.findByPriceBetween(30, 50)).thenReturn(Arrays.asList(sweet1, sweet2));
        List<Sweet> result = sweetService.searchByPriceRange(30, 50);
        assertEquals(2, result.size());
    }

    @Test
    void testGetSweetById() {
        when(sweetRepository.findById(1L)).thenReturn(Optional.of(sweet1));
        Optional<Sweet> result = sweetService.getSweetById(1L);
        assertTrue(result.isPresent());
        assertEquals(sweet1, result.get());
    }

    @Test
    void testUpdateSweet() {
        Sweet updatedSweet = new Sweet();
        updatedSweet.setName("Kaju Katli");
        updatedSweet.setCategory("Indian");
        updatedSweet.setPrice(60);
        updatedSweet.setQuantity(50);

        when(sweetRepository.findById(1L)).thenReturn(Optional.of(sweet1));
        when(sweetRepository.save(any(Sweet.class))).thenReturn(updatedSweet);

        Sweet result = sweetService.updateSweet(1L, updatedSweet);
        assertEquals("Kaju Katli", result.getName());
        assertEquals(60, result.getPrice());
        assertEquals(50, result.getQuantity());
    }

    @Test
    void testDeleteSweet() {
        doNothing().when(sweetRepository).deleteById(1L);
        sweetService.deleteSweet(1L);
        verify(sweetRepository, times(1)).deleteById(1L);
    }

    @Test
    void testPurchaseSweet_Success() {
        when(sweetRepository.findById(1L)).thenReturn(Optional.of(sweet1));
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet1);

        Sweet result = sweetService.purchaseSweet(1L, 20);
        assertEquals(80, result.getQuantity());
    }

    @Test
    void testPurchaseSweet_NotEnoughStock() {
        when(sweetRepository.findById(1L)).thenReturn(Optional.of(sweet1));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            sweetService.purchaseSweet(1L, 200);
        });
        assertEquals("Not enough stock available", exception.getMessage());
    }

    @Test
    void testRestockSweet() {
        when(sweetRepository.findById(1L)).thenReturn(Optional.of(sweet1));
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet1);

        Sweet result = sweetService.restockSweet(1L, 50);
        assertEquals(150, result.getQuantity());
    }
}


