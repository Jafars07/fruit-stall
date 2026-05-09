package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
	
	 List<Products> findByAvailableTrue();
	 
	 //NO Dupicate Products
	 boolean existsByName(String name);
	 
	

}
