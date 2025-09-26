package com.project.sweet_shop_management.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JWTService handles the generation and validation of JWT tokens.
 *
 * Responsibilities:
 *  - Generate a secure secret key for signing JWT tokens.
 *  - Create JWT tokens containing user information.
 *  - Extract and validate data (username, expiration) from tokens.
 *
 * Why needed:
 *  - JWT (JSON Web Token) is used for stateless authentication.
 *  - This service ensures tokens are securely generated and validated.
 */
@Service
public class JWTService {

    // Stores the generated secret key in Base64 encoded format
    private String secretKey = "";

    /**
     * Constructor:
     *  - Generates a random secret key for signing JWT tokens using HmacSHA256.
     *  - Encodes the key in Base64 for storage and reuse.
     */
    public JWTService() {
        try {
            // Generate secret key using HmacSHA256 algorithm
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();

            // Store encoded key as a string
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Generates a JWT token for the given username.
     *
     * @param username the username to store inside the token
     * @return a signed JWT token string
     */
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims) // Add any custom claims if needed
                .subject(username) // Store username in the token's subject
                .issuedAt(new Date(System.currentTimeMillis())) // Token creation time
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiry
                .and()
                .signWith(genKey()) // Sign token with secret key
                .compact();
    }

    /**
     * Decodes the Base64 secret key and returns a SecretKey object.
     *
     * @return SecretKey used for signing and verifying JWTs
     */
    private SecretKey genKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    // -------------------- TOKEN VALIDATION PART --------------------

    /**
     * Extracts the username (subject) from a token.
     *
     * @param token the JWT token
     * @return username stored in the token
     */
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generic method to extract a specific claim from the token.
     *
     * @param token         the JWT token
     * @param claimResolver a function to retrieve a specific claim from Claims
     * @param <T>           type of the claim
     * @return extracted claim value
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    /**
     * Extracts all claims from the token after verifying its signature.
     *
     * @param token the JWT token
     * @return Claims object containing token data
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(genKey()) // Verify using our secret key
                .build()
                .parseSignedClaims(token) // Parse and validate token
                .getPayload();
    }

    /**
     * Validates a token by checking:
     *  - If the username matches
     *  - If the token has not expired
     *
     * @param token       the JWT token
     * @param userDetails UserDetails object for comparison
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Checks if the token is expired.
     *
     * @param token the JWT token
     * @return true if token is expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the expiration date from the token.
     *
     * @param token the JWT token
     * @return expiration date
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}

