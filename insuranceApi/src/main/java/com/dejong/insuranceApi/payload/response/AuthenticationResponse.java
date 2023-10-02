package com.dejong.insuranceApi.payload.response;


import com.dejong.insuranceApi.model.Role;
import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String role;
    private Long id;
}
