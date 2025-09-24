package com.project.sweet_shop_management.config;

import com.project.sweet_shop_management.service.JWTService;
import com.project.sweet_shop_management.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JwtFilter:
 *  - Runs once per HTTP request.
 *  - Checks if the request has a valid JWT in the "Authorization" header.
 *  - If valid, sets the authentication in Spring Security's context.
 *
 * Flow:
 *  1. Extract JWT token from "Authorization" header.
 *  2. Extract username from token.
 *  3. Load user details from DB.
 *  4. Validate token against user details.
 *  5. If valid → mark user as authenticated.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ApplicationContext context; // Used to get MyUserDetailService bean

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Example: "Authorization" header = "Bearer <JWT-TOKEN>"
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // 1️⃣ Check if Authorization header exists and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Remove "Bearer " prefix to get token
            token = authHeader.substring(7);

            // Extract username (subject) from token
            username = jwtService.extractUserName(token);
        }

        // 2️⃣ Validate only if username is found and no authentication is set yet
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Load user details from DB (through our custom service)
            UserDetails userDetails = context
                    .getBean(MyUserDetailService.class)
                    .loadUserByUsername(username);

            // 3️⃣ Validate token with user details
            if (jwtService.validateToken(token, userDetails)) {

                // Create authentication object for Spring Security
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );

                // Attach request details (like IP, session info)
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Set authentication into the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 4️⃣ Continue request flow
        filterChain.doFilter(request, response);
    }
}


