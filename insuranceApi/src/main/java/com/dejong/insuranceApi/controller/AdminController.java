package com.dejong.insuranceApi.controller;


import com.dejong.insuranceApi.dto.ApplicationAddressDto;
import com.dejong.insuranceApi.model.InsuranceApplication;
import com.dejong.insuranceApi.model.User;
import com.dejong.insuranceApi.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
public class AdminController {

    private final ApplicationService applicationService;


    @GetMapping("/applicants")
    @PreAuthorize("hasRole('ADMIN')")
    public List<InsuranceApplication> viewApplicants() {
        return applicationService.getApplications() ;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> viewUsers() {
        return applicationService.getUsers();
    }

    @PutMapping("/{id}/process")
    public InsuranceApplication updateApplication(@PathVariable Long id,@RequestBody ApplicationAddressDto addressDto ){
         InsuranceApplication insuranceApplication = applicationService.processApplication(id,addressDto);
         return insuranceApplication;
    }

    @PostMapping("/{user_id}/apply")
    @PreAuthorize("hasRole('ADMIN')")
    public InsuranceApplication applyInsurance(@RequestBody ApplicationAddressDto applicationAddressDto, @PathVariable long user_id) {
        InsuranceApplication insuranceApplication = applicationService.applicationAddressDto(applicationAddressDto,user_id);

        return insuranceApplication;
    }


}
