package com.interview.ecommerce.controller;

import com.interview.ecommerce.repository.AnimalCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class AnimalCategoryController {

    @Autowired
    private AnimalCategoryRepository animalCategoryRepository;

    @GetMapping("/categories")
    public List<com.interview.ecommerce.entity.AnimalCategory> categories() {
        return animalCategoryRepository.findAll();
    }
}
