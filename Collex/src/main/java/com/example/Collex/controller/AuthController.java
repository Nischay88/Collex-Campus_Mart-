package com.example.Collex.controller;

import com.example.Collex.dto.SignupRequest;
import com.example.Collex.model.User;
import com.example.Collex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            System.out.println("AuthController: Received signup request for: " + request.getEmail());
            System.out.println("AuthController: Request data - Name: " + request.getName() + ", Role: " + request.getRole());
            
            // Validate request
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                System.out.println("AuthController: Validation failed - Email is required");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Email is required"));
            }
            
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                System.out.println("AuthController: Validation failed - Password is required");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Password is required"));
            }
            
            if (request.getName() == null || request.getName().isEmpty()) {
                System.out.println("AuthController: Validation failed - Name is required");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Name is required"));
            }
            
            if (request.getRole() == null) {
                System.out.println("AuthController: Validation failed - Role is required");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Role is required"));
            }
            
            // For SELLER, collegeName is required
            if (request.getRole() == User.Role.SELLER && 
                (request.getCollegeName() == null || request.getCollegeName().isEmpty())) {
                System.out.println("AuthController: Validation failed - College name required for seller");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("College name is required for sellers"));
            }
            
            // Register user
            System.out.println("AuthController: Calling userService.register()");
            User savedUser = userService.register(request);
            System.out.println("AuthController: User registered successfully with ID: " + savedUser.getId());
            
            // Return success response (without password)
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", createUserResponse(savedUser));
            
            System.out.println("AuthController: Returning success response");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (RuntimeException e) {
            System.err.println("AuthController: RuntimeException - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            System.err.println("AuthController: Exception - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Registration failed: " + e.getMessage()));
        }
    }
    
    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("email", user.getEmail());
        userResponse.put("fullName", user.getFullName());
        userResponse.put("role", user.getRole());
        userResponse.put("collegeName", user.getCollegeName());
        userResponse.put("isActive", user.getIsActive());
        userResponse.put("createdAt", user.getCreatedAt());
        return userResponse;
    }
    
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}

