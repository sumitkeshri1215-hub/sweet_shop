package com.project.sweet_shop_management.repository;

import com.project.sweet_shop_management.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users,Integer> {
    Users findByName(String name);
}
