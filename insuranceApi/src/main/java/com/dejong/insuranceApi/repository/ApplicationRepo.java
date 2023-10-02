package com.dejong.insuranceApi.repository;


import com.dejong.insuranceApi.dto.ApplicationAddressDto;
import com.dejong.insuranceApi.dto.ApplicationDto;
import com.dejong.insuranceApi.model.InsuranceApplication;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface ApplicationRepo extends JpaRepository<InsuranceApplication,Long> ,CustomRepo{


}
