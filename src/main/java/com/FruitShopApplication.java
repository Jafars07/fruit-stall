package com;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.Entity.Products;
import com.Repository.ProductsRepository;

@SpringBootApplication(scanBasePackages = "com")
public class FruitShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(FruitShopApplication.class, args);
	}

	@Bean
	CommandLineRunner loadData() {
	    return args -> {
	        System.out.println("Application Started");
	    };
	}
	    private Products create(String name, double price, String unit, String image) {
	        Products p = new Products();
	        p.setName(name);
	        p.setPrice(price);
	        p.setUnit(unit);
	        p.setImageUrl(image);
	        p.setAvailable(true);
	        return p;
	    }

}
