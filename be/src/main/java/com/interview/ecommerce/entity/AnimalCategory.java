package com.interview.ecommerce.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
public class AnimalCategory {
    @Id
    private String name;

    @ManyToMany(mappedBy = "animalCategories")
    private List<Product> products;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
