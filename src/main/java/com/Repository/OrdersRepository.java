package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Entity.OrderItem;
import com.Entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByUserId(Long userId);
	List<Orders> findAllByOrderByIdDesc();
}