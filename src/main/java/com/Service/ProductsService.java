package com.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Entity.Products;
import com.Repository.ProductsRepository;
import com.cloudinary.Cloudinary;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository repo;

    @Autowired
    private Cloudinary cloudinary;


    // GET ALL PRODUCTS
    public List<Products> getAllProducts() {
        return repo.findAll();
    }


    // GET ONLY AVAILABLE PRODUCTS
    public List<Products> getAllAvailable() {
        return repo.findByAvailableTrue();
    }


    // SAVE PRODUCT WITH IMAGE
 // SAVE PRODUCT WITH OPTIONAL IMAGE
    public Products saveProduct(
            String name,
            Double price,
            String unit,
            Boolean available,
            MultipartFile imageFile
    ) throws IOException {

        if(repo.existsByName(name)) {
            throw new RuntimeException("Product already exists!");
        }

        String imageUrl =
                "https://res.cloudinary.com/demo/image/upload/sample.jpg";

        // UPLOAD ONLY IF IMAGE EXISTS
        if(imageFile != null && !imageFile.isEmpty()) {

            Map uploadResult = cloudinary.uploader().upload(
                    imageFile.getBytes(),
                    Map.of()
            );

            imageUrl =
                    uploadResult.get("secure_url").toString();
        }

        Products product = new Products();

        product.setName(name);
        product.setPrice(price);
        product.setUnit(unit);
        product.setAvailable(available);
        product.setImageUrl(imageUrl);

        return repo.save(product);
    }


    // UPDATE PRODUCT
    public Products updateProduct(
            Long id,
            String name,
            Double price,
            String unit,
            Boolean available,
            MultipartFile imageFile
    ) throws IOException {

        Products existing = repo.findById(id).orElse(null);

        if(existing != null) {

            existing.setName(name);
            existing.setPrice(price);
            existing.setUnit(unit);
            existing.setAvailable(available);

            // IF NEW IMAGE UPLOADED
            if(imageFile != null && !imageFile.isEmpty()) {

                Map uploadResult = cloudinary.uploader().upload(
                        imageFile.getBytes(),
                        Map.of()
                );

                String imageUrl =
                        uploadResult.get("secure_url").toString();

                existing.setImageUrl(imageUrl);
            }

            return repo.save(existing);
        }

        return null;
    }


    // DELETE PRODUCT
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }


    // GET PRODUCT BY ID
    public Products getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }
}