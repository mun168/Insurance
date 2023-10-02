package com.dejong.insuranceApi.security;


import com.dejong.insuranceApi.model.enums.ERole;
import com.dejong.insuranceApi.model.Role;
import com.dejong.insuranceApi.model.User;
import com.dejong.insuranceApi.repository.RoleRepository;
import com.dejong.insuranceApi.repository.UserRepository;
import com.dejong.insuranceApi.security.jwt.JwtAuthFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity

public class WebSecurityConfig {


    //web security configurations
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    private final UserRepository repository;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception{
        httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/**").permitAll()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .requestMatchers("/api/applicant/**").hasRole("APPLICANT")
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .accessDeniedHandler((request, response, ex) -> {
                    System.out.println("Access Denied: " + ex.getMessage());
                    response.sendError(HttpServletResponse.SC_FORBIDDEN);
                });

        return httpSecurity.build();

    }


    //bean to register admin automatically
    @Bean
    public User userDetailsService(){

        Role role = roleRepository.findByName(ERole.ROLE_ADMIN);

        if (role == null) {
            role = new Role();
            role.setName(ERole.ROLE_ADMIN);
            roleRepository.save(role);
        }


        var admin = User.builder()
                .username("munashe")
                .password(passwordEncoder.encode("veliqo"))
                .email("veliqo@gmail.com")
                .role(role)
                .build();
        User user = repository.findByUsername("munashe");
        if(user==null){
            repository.save(admin);
        }


        return admin;
    }





}
