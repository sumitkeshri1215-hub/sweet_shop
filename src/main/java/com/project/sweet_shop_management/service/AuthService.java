package com.project.sweet_shop_management.service;

import com.project.sweet_shop_management.model.Users;
import com.project.sweet_shop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AuthService handles user registration and login logic.
 *
 * Responsibilities:
 *  - Register new users (saving them with an encrypted password)
 *  - Authenticate users during login
 *  - Generate JWT tokens for authenticated users
 *
 * Why needed:
 *  - Keeps authentication logic separate from controllers for better maintainability.
 *  - Works with AuthenticationManager to verify credentials and with JWTService to generate tokens.
 */
@Service
public class AuthService {

    // Repository to perform database operations for Users
    @Autowired
    public UserRepository userRepository;

    // Service to generate and validate JWT tokens
    @Autowired
    public JWTService jwtService;

    // Used to authenticate credentials
    @Autowired
    public AuthenticationManager authenticationManager;

    // BCrypt password encoder (strength 12) for secure password hashing
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    /**
     * Saves a new user into the database after encrypting their password.
     *
     * @param user User object containing username, password, and role
     * @return saved user object from the database
     */
    public Users saveUser(Users user) {
        // Encrypt password before saving to DB
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Authenticates a user and returns a JWT token if successful.
     *
     * @param user User object containing username and password
     * @return JWT token string if authentication is successful, otherwise "failure"
     */
    public String loginUser(Users user) {
        // Create authentication token from username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword())
        );

        // If authentication is successful, generate and return JWT
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getName()); // Probably meant "generateToken"
        } else {
            return "failure";
        }
    }
}

