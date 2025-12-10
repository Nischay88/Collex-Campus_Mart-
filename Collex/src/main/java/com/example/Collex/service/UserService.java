package com.example.Collex.service;

import com.example.Collex.dto.SignupRequest;
import com.example.Collex.model.User;
import com.example.Collex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User register(SignupRequest req) {
        try {
            System.out.println("UserService: Starting registration for email: " + req.getEmail());
            
            // Check if email already exists
            if (userRepository.existsByEmail(req.getEmail())) {
                System.out.println("UserService: Email already exists: " + req.getEmail());
                throw new RuntimeException("Email already exists");
            }
            
            // Create new User
            User user = new User();
            user.setFullName(req.getName());
            user.setEmail(req.getEmail());
            user.setPassword(passwordEncoder.encode(req.getPassword())); // Hash password
            user.setRole(req.getRole());
            user.setCollegeName(req.getCollegeName()); // Will be null for BUYER
            user.setIsActive(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            
            System.out.println("UserService: User object created: " + user.getEmail());
            
            // Save to database
            User savedUser = userRepository.save(user);
            System.out.println("UserService: User saved successfully with ID: " + savedUser.getId());
            
            return savedUser;
        } catch (Exception e) {
            System.err.println("UserService: Error during registration: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
  
}

