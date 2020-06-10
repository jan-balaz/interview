package com.interview.ecommerce.controller;

import com.interview.ecommerce.entity.OrderRequestBody;
import com.interview.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public void order(@RequestBody OrderRequestBody order) {
        orderService.createOrder(order.getProductId(), order.getQuantity());
    }
}
