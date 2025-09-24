package com.project.sweet_shop_management.Service;


import com.project.sweet_shop_management.model.Users;
import com.project.sweet_shop_management.repository.UserRepository;
import com.project.sweet_shop_management.service.AuthService;
import com.project.sweet_shop_management.service.JWTService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    private UserRepository userRepository;
    private JWTService jwtService;
    private AuthenticationManager authenticationManager;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        jwtService = Mockito.mock(JWTService.class);
        authenticationManager = Mockito.mock(AuthenticationManager.class);
        authService = new AuthService();
        authService.userRepository = userRepository;
        authService.jwtService = jwtService;
        authService.authenticationManager = authenticationManager;
    }

    @Test
    void testSaveUserEncryptsPassword() {
        Users user = new Users();
        user.setName("john");
        user.setPassword("plain123");

        when(userRepository.save(any(Users.class))).thenAnswer(i -> i.getArguments()[0]);

        Users saved = authService.saveUser(user);

        assertNotEquals("plain123", saved.getPassword()); // Password should be encrypted
        verify(userRepository, times(1)).save(any(Users.class));
    }

    @Test
    void testLoginUserReturnsToken() {
        Users user = new Users();
        user.setName("john");
        user.setPassword("plain123");

        Authentication auth = Mockito.mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(auth);
        when(auth.isAuthenticated()).thenReturn(true);
        when(jwtService.generateToken("john")).thenReturn("fake-jwt-token");

        String token = authService.loginUser(user);

        assertEquals("fake-jwt-token", token);
    }
}