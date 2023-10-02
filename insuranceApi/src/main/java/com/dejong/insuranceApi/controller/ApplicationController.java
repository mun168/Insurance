package com.dejong.insuranceApi.controller;


import com.dejong.insuranceApi.dto.ApplicationAddressDto;
import com.dejong.insuranceApi.dto.ApplicationDto;
import com.dejong.insuranceApi.model.InsuranceApplication;
import com.dejong.insuranceApi.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/applicant")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }


    @PostMapping("/{user_id}/apply")
    @PreAuthorize("hasRole('APPLICANT')")
    public InsuranceApplication applyInsurance(@RequestBody ApplicationAddressDto applicationAddressDto, @PathVariable long user_id) {
        InsuranceApplication insuranceApplication = applicationService.applicationAddressDto(applicationAddressDto,user_id);

        return insuranceApplication;
    }

    @GetMapping("/{user_id}/applications")
    @PreAuthorize("hasRole('APPLICANT')")
    public List<ApplicationDto> viewApplications(@PathVariable long user_id) {
        return applicationService.getAllByUserId(user_id);
    }

}
