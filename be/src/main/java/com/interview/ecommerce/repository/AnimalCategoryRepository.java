package com.interview.ecommerce.repository;

import com.interview.ecommerce.entity.AnimalCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, String> {
}
