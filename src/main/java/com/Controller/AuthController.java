package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.User;
import com.Repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	

    @Autowired
    private UserRepository repo;
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = repo.findByUsernameAndPassword(
            user.getUsername(),
            user.getPassword()
        );

        if (dbUser == null) {
            return ResponseEntity.badRequest().body("Invalid login");
        }

        return ResponseEntity.ok(dbUser); // MUST include id
    }
    
    
    //For Register Page
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }
    
    @GetMapping("/test")
    public String test() {
        return "API working";
    }
}
