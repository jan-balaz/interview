package com.interview.ecommerce.service;

import com.interview.ecommerce.entity.Order;
import com.interview.ecommerce.entity.Product;
import com.interview.ecommerce.exception.ResourceNotFoundException;
import com.interview.ecommerce.repository.OrderRepository;
import com.interview.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(long productId, int quantity) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Order order = new Order(product.get(), quantity);
            orderRepository.save(order);
            return order;
        } else {
            throw new ResourceNotFoundException();
        }
    }
}
