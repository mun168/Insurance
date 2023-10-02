package com.dejong.insuranceApi.dto;


import com.dejong.insuranceApi.model.enums.Coverage;
import com.dejong.insuranceApi.model.enums.Gender;
import com.dejong.insuranceApi.model.enums.MaritalStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationAddressDto {
//dto to handle applications
    private String phone;
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private Coverage coverage;
    private int dependants;
    private MaritalStatus maritalStatus;
    private String status;
    private String street;
    private String city;
    private String country;
    private String postal;
}
