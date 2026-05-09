package com.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {
	
	@GetMapping("/")
	public String Home(){
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";	
	}

    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }
	
	@GetMapping("/register")
	public String register() {
		return "register";
	}
	
	@GetMapping("/my-orders")
	public String myOrdersPage() {
	    return "MyOrder";
	}
	
	@GetMapping("/products")
	public String products() {
		return "products";
	}

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }
    
    @GetMapping("/Order-Details")
    public String orderDetailsPage() {
        return "Order-Details";
    }
    
    @GetMapping("/checkout")
    public String checkoutPage() {
        return "checkout";
    }
    
    @GetMapping("/admin-orders")
    public String adminOrdersPage() {
        return "admin-orders";
    }

}
