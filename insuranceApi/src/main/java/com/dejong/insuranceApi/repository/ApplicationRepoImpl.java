package com.dejong.insuranceApi.repository;

import com.dejong.insuranceApi.dto.ApplicationDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.stream.Collectors;

public class ApplicationRepoImpl implements CustomRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ApplicationDto> findApplicationsDataByUserId(Long userId) {
        String nativeQuery = "SELECT a.id, a.phone, a.full_name, a.gender,a.coverage ,a.dependants,a.marital_status,a.status FROM applications a JOIN  users u ON a.user_id=u.id  WHERE u.id = :userId";

        List<Object[]> resultList = entityManager.createNativeQuery(nativeQuery)
                .setParameter("userId", userId)
                .getResultList();

        return mapToDTO(resultList);
    }

    private List<ApplicationDto> mapToDTO(List<Object[]> resultList) {
        return resultList.stream()
                .map(objects -> new ApplicationDto(
                        Long.valueOf(objects[0].toString()),
                        objects[1].toString(),
                        objects[2].toString(),
                        objects[3].toString(),
                        objects[4].toString(),
                        Integer.parseInt(objects[5].toString()),
                        objects[6].toString(),
                        objects[7].toString()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public long countApplications() {
        return entityManager.createQuery("SELECT COUNT(u) FROM InsuranceApplication u", Long.class).getSingleResult();
    }


}

