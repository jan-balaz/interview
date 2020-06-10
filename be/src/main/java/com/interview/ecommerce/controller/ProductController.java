package com.interview.ecommerce.controller;

import com.interview.ecommerce.entity.Product;
import com.interview.ecommerce.exception.ResourceNotFoundException;
import com.interview.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> products() {
        return productRepository.findAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product product(@PathVariable("id") long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    @PostMapping("/product")
    public Product product(@Valid @RequestBody Product product) {
        productRepository.save(product);
        return product;
    }
}
