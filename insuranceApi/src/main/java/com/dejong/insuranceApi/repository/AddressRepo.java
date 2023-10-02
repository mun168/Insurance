package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.model.Adress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends JpaRepository<Adress,Long> {
}
