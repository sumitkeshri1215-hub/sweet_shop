package com.project.sweet_shop_management.config;

import com.project.sweet_shop_management.service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * SecurityConfig is the main security configuration class for the application.
 * It defines how requests are authenticated and authorized.
 *
 * Key Responsibilities:
 *  - Configure HTTP security rules (which endpoints are public, which need authentication)
 *  - Define authentication provider (how user details and passwords are verified)
 *  - Add JWT filter for token-based authentication
 *  - Set up session policy (stateless because we use JWT)
 *
 * Annotations:
 *  @Configuration       → Marks this as a Spring configuration class
 *  @EnableWebSecurity   → Enables Spring Security’s web security support
 *  @EnableMethodSecurity → Allows using method-level security annotations like @PreAuthorize
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    // Service that loads user details from database
    @Autowired
    private MyUserDetailService userDetailService;

    // Custom JWT filter to validate tokens before authentication
    @Autowired
    private JwtFilter jwtFilter;

    /**
     * Configures the main security filter chain.
     * This defines how incoming HTTP requests are processed and secured.
     *
     * @param http The HttpSecurity object provided by Spring Security
     * @return Configured SecurityFilterChain
     * @throws Exception if configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Disable CSRF because we are using JWT for security, not sessions
                .csrf(csrf -> csrf.disable())

                // Configure public and protected endpoints
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(   "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml",
                                "/v3/api-docs.json",
                                "/v3/api-docs.pdf") // Allow authentication-related endpoints without login
                        .permitAll()
                        .anyRequest().authenticated() // All other requests must be authenticated
                )

                // Enable basic HTTP authentication (used only for testing, JWT is primary auth)
                .httpBasic(Customizer.withDefaults())

                // Ensure the application is stateless (no HTTP sessions stored on server)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Add JWT filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                // Build the security filter chain
                .build();
    }



    /**
     * Defines the authentication provider.
     * Uses DaoAuthenticationProvider to fetch user details from DB and verify password.
     *
     * @return AuthenticationProvider configured with custom UserDetailsService and BCrypt encoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        // Create authentication provider using our custom user details service
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailService);

        // Use BCrypt with strength 12 for secure password hashing
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));

        return provider;
    }

    /**
     * Provides the AuthenticationManager bean.
     * This is used by Spring Security to handle authentication requests.
     *
     * @param config AuthenticationConfiguration object from Spring
     * @return AuthenticationManager instance
     * @throws Exception if manager creation fails
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public FilterRegistrationBean coreFilter() {
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        CorsConfiguration cors=new CorsConfiguration();
        cors.setAllowCredentials(true);
        cors.addAllowedOriginPattern("*");
        cors.addAllowedHeader("*");
        cors.addAllowedMethod("*");
        cors.setMaxAge(3600L);
        source.registerCorsConfiguration("/**", cors);

        FilterRegistrationBean bean=new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(-110);
        return bean;


    }
}