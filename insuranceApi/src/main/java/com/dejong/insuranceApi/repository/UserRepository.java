package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.model.InsuranceApplication;
import com.dejong.insuranceApi.model.Role;
import com.dejong.insuranceApi.model.User;
import com.dejong.insuranceApi.model.enums.ERole;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {



    Optional<User> findByEmail(String email);
    User findByUsername(String username);
    List<User> findByRoleName(ERole name);

    long countByRole_Name(ERole name);
}
