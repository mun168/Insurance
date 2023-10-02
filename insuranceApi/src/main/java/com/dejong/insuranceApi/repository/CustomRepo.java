package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.dto.ApplicationDto;

import java.util.List;


///custom repository to get applications and count them
public interface CustomRepo {
    List<ApplicationDto> findApplicationsDataByUserId(Long userId);

    long countApplications();
}
