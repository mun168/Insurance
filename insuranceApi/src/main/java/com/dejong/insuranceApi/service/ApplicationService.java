package com.dejong.insuranceApi.service;

import com.dejong.insuranceApi.dto.ApplicationAddressDto;
import com.dejong.insuranceApi.dto.ApplicationDto;
import com.dejong.insuranceApi.model.Adress;
import com.dejong.insuranceApi.model.InsuranceApplication;
import com.dejong.insuranceApi.model.Role;
import com.dejong.insuranceApi.model.User;
import com.dejong.insuranceApi.model.enums.ERole;
import com.dejong.insuranceApi.repository.ApplicationRepo;
import com.dejong.insuranceApi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepo applicationRepo;
    private final UserRepository repository;


    public InsuranceApplication applicationAddressDto(ApplicationAddressDto addressDto,long id){


        User user = repository.findById(id).orElseThrow(
                ()-> new UsernameNotFoundException("User not Found")
        );

        Adress adress = new Adress();
        adress.setCity(addressDto.getCity());
        adress.setCountry(addressDto.getCountry());
        adress.setPostal(addressDto.getPostal());
        adress.setStreet(addressDto.getStreet());

        InsuranceApplication application = new InsuranceApplication();
        application.setAdress(adress);
        application.setCoverage(addressDto.getCoverage());
        application.setDependants(addressDto.getDependants());
        application.setGender(addressDto.getGender());
        application.setFullName(addressDto.getFullName());
        application.setDateOfBirth(addressDto.getDateOfBirth());
        application.setPhone(addressDto.getPhone());
        application.setStatus(application.getStatus());
        application.setMaritalStatus(addressDto.getMaritalStatus());

        application.setUser(user);

        applicationRepo.save(application);

        return application;


    }

    public List<InsuranceApplication> getApplications(){
        return applicationRepo.findAll();
    }

    public List<ApplicationDto>getAllByUserId(Long user_id){
        List<ApplicationDto> applicationDtos = applicationRepo.findApplicationsDataByUserId(user_id);
        return applicationDtos;
    }

    public InsuranceApplication processApplication(Long id,ApplicationAddressDto addressDto){
        InsuranceApplication insuranceApplication = applicationRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Application not Found"));

        insuranceApplication.setStatus(addressDto.getStatus());

        applicationRepo.save(insuranceApplication);

        return  insuranceApplication;
    }

    public List<User> getUsers(){

        List<User> users = repository.findByRoleName(ERole.ROLE_APPLICANT)
                .stream().toList();
        return users;
    }

    public long countApplications(){
        return applicationRepo.countApplications();
    }



}
