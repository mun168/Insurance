package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.dto.ApplicationDto;

import java.util.List;

public interface CustomRepo {
    List<ApplicationDto> findApplicationsDataByUserId(Long userId);

    long countApplications();
}
