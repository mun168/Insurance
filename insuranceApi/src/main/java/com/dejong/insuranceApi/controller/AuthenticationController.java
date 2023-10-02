package com.dejong.insuranceApi.controller;


import com.dejong.insuranceApi.payload.request.AuthenticationRequest;
import com.dejong.insuranceApi.payload.request.RegisterRequest;
import com.dejong.insuranceApi.payload.response.AuthenticationResponse;
import com.dejong.insuranceApi.service.ApplicationService;
import com.dejong.insuranceApi.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {

    private final SecurityService securityService;
    private final ApplicationService applicationService;
   //register user

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse>signUp(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(securityService.register(request));
    }

    //login user
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse>signIn(@RequestBody AuthenticationRequest request) throws Exception{
        return ResponseEntity.ok(securityService.authenticate(request));
    }


    //count number of users
    @GetMapping("/count")
    public long getNumber(){
        return securityService.getNumberOfUsers();
    }

    //count number of applications
    @GetMapping("/numApps")
    public long numberOfApplications(){
        return applicationService.countApplications();
    }
}
