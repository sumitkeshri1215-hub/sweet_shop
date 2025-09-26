package com.project.sweet_shop_management.service;
 
import com.project.sweet_shop_management.model.UserPrincipal;
import com.project.sweet_shop_management.model.Users;
import com.project.sweet_shop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * MyUserDetailService is a custom implementation of Spring Security's UserDetailsService.
 *
 * Purpose:
 *  - Fetch user details from the database based on the username.
 *  - Convert the fetched user entity into a UserDetails object that Spring Security understands.
 *
 * Why needed:
 *  - Spring Security requires a UserDetailsService bean to load user data during authentication.
 *  - This helps in validating user credentials and assigning roles.
 */
@Service
public class MyUserDetailService implements UserDetailsService {

    // Repository to interact with the database for fetching user information
    @Autowired
    private UserRepository userRepository;

    /**
     * Loads a user by username from the database.
     *
     * @param username the username entered during login
     * @return a UserDetails object containing user data and authorities
     * @throws UsernameNotFoundException if no user is found with the given username
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch user from DB using username
        Users user = userRepository.findByName(username);

        // If user is not found, throw exception
        if (user == null) {
            throw new UsernameNotFoundException("User not Found");
        }

        // Wrap the Users entity into a UserPrincipal (which implements UserDetails)
        return new UserPrincipal(user);
    }
}
