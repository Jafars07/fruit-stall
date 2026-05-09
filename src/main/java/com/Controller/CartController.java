package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.Entity.Cart;
import com.Entity.Products;
import com.Repository.CartRepository;
import com.Repository.ProductsRepository;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository repo;
    
    @Autowired
    private ProductsRepository productRepo;

    // ADD TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {

        // 🔍 Check if product already exists in cart
        Cart existing = repo.findByUserIdAndProductId(
                cart.getUserId(),
                cart.getProductId()
        );

        // 🔥 IF EXISTS → increase quantity
        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + 1);
            return repo.save(existing);
        }

        // 🔥 IF NEW → fetch product details
        Products product = productRepo.findById(cart.getProductId())
                .orElse(null);

        if (product != null) {
            cart.setName(product.getName());
            cart.setPrice(product.getPrice());
        }

        cart.setQuantity(1);

        return repo.save(cart);
    }
    
    
    // GET CART ITEMS BY USER
    @GetMapping("/user/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    // REMOVE ITEM
    @DeleteMapping("/delete/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        repo.deleteById(id);
    }
    
 // ➕ INCREASE QUANTITY
    @PutMapping("/increase/{id}")
    public Cart increaseQuantity(@PathVariable Long id) {
        Cart cart = repo.findById(id).orElse(null);

        if (cart != null) {
            cart.setQuantity(cart.getQuantity() + 1);
            return repo.save(cart);
        }

        return null;
    }

    // ➖ DECREASE QUANTITY
    @PutMapping("/decrease/{id}")
    public void decreaseQuantity(@PathVariable Long id) {
        Cart cart = repo.findById(id).orElse(null);

        if (cart != null) {
            if (cart.getQuantity() > 1) {
                cart.setQuantity(cart.getQuantity() - 1);
                repo.save(cart);
            } else {
                repo.deleteById(id); // remove if 1
            }
        }
    }
}