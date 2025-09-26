package com.project.sweet_shop_management.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/**
 * UserPrincipal is a wrapper class for the Users entity.
 *
 * Purpose:
 *  - Converts your custom Users object into a format that Spring Security understands.
 *  - Implements the UserDetails interface, which Spring Security uses for authentication and authorization.
 *
 * Why needed:
 *  - Spring Security works with UserDetails, not directly with your entity class.
 *  - This class acts as an adapter between your database model and Spring Security.
 */
public class UserPrincipal implements UserDetails {

    // Holds the user information from the database
    private Users user;

    /**
     * Constructor to set the user object.
     * @param user the Users entity from the database
     */
    public UserPrincipal(Users user) {
        this.user = user;
    }

    /**
     * Returns the authorities (roles/permissions) assigned to the user.
     *
     * @return a collection containing the user's role in "ROLE_<ROLE_NAME>" format
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Prefixing role with "ROLE_" because Spring Security expects this naming convention
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    /**
     * Returns the hashed password of the user.
     * @return password string from the database
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * Returns the username of the user.
     * @return username string from the database
     */
    @Override
    public String getUsername() {
        return user.getName();
    }

    /*
     * The following methods are not overridden here, so default values from UserDetails will apply:
     * - isAccountNonExpired()
     * - isAccountNonLocked()
     * - isCredentialsNonExpired()
     * - isEnabled()
     *
     * If needed, you can override them to implement custom account status logic.
     */
}


