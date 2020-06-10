package com.interview.ecommerce.entity;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

public class OrderRequestBody {
    @NotEmpty
    private long productId;
    @Min(value = 1)
    private int quantity;

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
