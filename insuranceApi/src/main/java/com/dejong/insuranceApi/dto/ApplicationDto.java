package com.dejong.insuranceApi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
public class ApplicationDto {

    //dto to handle applications
    private Long id;
    private String phone;
    private String fullName;
    private String gender;
    private String coverage;
    private int dependants;
    private String maritalStatus;
    private String status;

    public ApplicationDto(Long id, String phone, String fullName, String gender, String coverage, int dependants, String maritalStatus, String status) {
        this.id = id;
        this.phone = phone;
        this.fullName = fullName;
        this.gender = gender;
        this.coverage = coverage;
        this.dependants = dependants;
        this.maritalStatus = maritalStatus;
        this.status = status;
    }
}
