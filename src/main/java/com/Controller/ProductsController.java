package com.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.Entity.Products;
import com.Service.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService service;


    // GET ONLY AVAILABLE PRODUCTS
    @GetMapping
    public List<Products> getAvailableProducts() {
        return service.getAllAvailable();
    }


    // GET ALL PRODUCTS
    @GetMapping("/all")
    public List<Products> getAllProducts() {
        return service.getAllProducts();
    }


    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Products getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }


    // ADD PRODUCT
    @PostMapping
    public ResponseEntity<?> addProduct(

            @RequestParam String name,

            @RequestParam Double price,

            @RequestParam String unit,

            @RequestParam Boolean available,

            @RequestParam(required = false)
            MultipartFile imageFile
    ) {

        try {

            Products savedProduct = service.saveProduct(
                    name,
                    price,
                    unit,
                    available,
                    imageFile
            );

            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {

            return ResponseEntity
                    .badRequest()
                    .body("Image upload failed");
        }
    }


    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(

            @PathVariable Long id,

            @RequestParam String name,

            @RequestParam Double price,

            @RequestParam String unit,

            @RequestParam Boolean available,

            @RequestParam(required = false)
            MultipartFile imageFile
    ) {

        try {

            Products updatedProduct =
                    service.updateProduct(
                            id,
                            name,
                            price,
                            unit,
                            available,
                            imageFile
                    );

            return ResponseEntity.ok(updatedProduct);

        } catch (IOException e) {

            return ResponseEntity
                    .badRequest()
                    .body("Update failed");
        }
    }


    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        service.deleteProduct(id);

        return "Product deleted successfully";
    }
}