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



    //get list of applications
    @GetMapping("/applicants")
    @PreAuthorize("hasRole('ADMIN')")
    public List<InsuranceApplication> viewApplicants() {
        return applicationService.getApplications() ;
    }


    //get list of users
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> viewUsers() {
        return applicationService.getUsers();
    }


    //reject or accept application
    @PutMapping("/{id}/process")
    public InsuranceApplication updateApplication(@PathVariable Long id,@RequestBody ApplicationAddressDto addressDto ){
         InsuranceApplication insuranceApplication = applicationService.processApplication(id,addressDto);
         return insuranceApplication;
    }
    //admin controller to apply for user
    @PostMapping("/{user_id}/apply")
    @PreAuthorize("hasRole('ADMIN')")
    public InsuranceApplication applyInsurance(@RequestBody ApplicationAddressDto applicationAddressDto, @PathVariable long user_id) {
        InsuranceApplication insuranceApplication = applicationService.applicationAddressDto(applicationAddressDto,user_id);

        return insuranceApplication;
    }


    //delete user application
    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteApp(@PathVariable Long id){
        try {
            applicationService.deleteApplications(id);
        }
        catch (Exception e){
            throw new RuntimeException("User not Found");
        }
    }


}
