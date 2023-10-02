package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.model.enums.ERole;
import com.dejong.insuranceApi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findByName(ERole name);
}
