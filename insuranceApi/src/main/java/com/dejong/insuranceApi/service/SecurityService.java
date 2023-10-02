package com.dejong.insuranceApi.service;

import com.dejong.insuranceApi.model.enums.ERole;
import com.dejong.insuranceApi.model.Role;
import com.dejong.insuranceApi.payload.request.AuthenticationRequest;
import com.dejong.insuranceApi.payload.request.RegisterRequest;
import com.dejong.insuranceApi.payload.response.AuthenticationResponse;
import com.dejong.insuranceApi.repository.RoleRepository;
import com.dejong.insuranceApi.repository.UserRepository;
import com.dejong.insuranceApi.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.dejong.insuranceApi.model.User;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    //create new applicant account
    public AuthenticationResponse register(RegisterRequest request){

        Role role = roleRepository.findByName(ERole.ROLE_APPLICANT);
        System.out.println(role);

        if (role == null) {
            role = new Role();
            role.setName(ERole.ROLE_APPLICANT);
            roleRepository.save(role);
        }


        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(role)
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();


    }
    //authenticate user

    public AuthenticationResponse authenticate(AuthenticationRequest request)throws Exception{
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var token  = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .id(user.getId())
                .token(token)
                .role(user.getRole().getName().name())
                .build();

    }

    public long getNumberOfUsers(){
        return repository.countByRole_Name(ERole.ROLE_APPLICANT);
    }






}
