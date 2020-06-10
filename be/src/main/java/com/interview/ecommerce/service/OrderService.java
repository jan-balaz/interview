package com.interview.ecommerce.service;

import com.interview.ecommerce.entity.Order;

public interface OrderService {

    Order createOrder(long productId, int quantity);
}
