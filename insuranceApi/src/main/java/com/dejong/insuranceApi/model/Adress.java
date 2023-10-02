package com.dejong.insuranceApi.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="address")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adress {

    @Id
    @GeneratedValue
    private Long id;
    private String street;
    private String city;
    private String country;
    private String postal;
//    @OneToOne(mappedBy = "address")
//    private InsuranceApplication application;



}
