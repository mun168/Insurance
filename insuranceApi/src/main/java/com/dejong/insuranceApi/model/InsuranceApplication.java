package com.dejong.insuranceApi.model;


import com.dejong.insuranceApi.model.enums.Coverage;
import com.dejong.insuranceApi.model.enums.Gender;
import com.dejong.insuranceApi.model.enums.MaritalStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="applications")
public class InsuranceApplication {

    //applications entity
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String phone;
    private String fullName;
    private LocalDate dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Coverage coverage;
    private int dependants;
    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;
    private String status = "pending";

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Adress adress;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;



}
