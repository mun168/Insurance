package com.dejong.insuranceApi.model;


import com.dejong.insuranceApi.model.enums.ERole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

//    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
//    private List<User> users;

//    @OneToMany(mappedBy = "role")
//    private List<User> users = new ArrayList<>();


}
