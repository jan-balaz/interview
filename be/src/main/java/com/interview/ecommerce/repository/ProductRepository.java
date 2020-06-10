package com.interview.ecommerce.repository;

import com.interview.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select new com.interview.ecommerce.entity.Product(p.id, p.name, p.price)" +
            "from Product p")
    public List<Product> findAllProducts();
}
