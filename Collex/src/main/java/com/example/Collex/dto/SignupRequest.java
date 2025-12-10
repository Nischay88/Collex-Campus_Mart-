package com.example.Collex.dto;

import com.example.Collex.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    
    private String name;
    private String email;
    private String password;
    private User.Role role;
    private String collegeName; // Only for SELLER
}

