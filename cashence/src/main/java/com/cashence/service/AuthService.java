package com.cashence.service;

import com.cashence.model.User;
import com.cashence.repository.UserRepository;
import com.cashence.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email is already in use!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");  // ✅ Default role is USER
        }

        userRepository.save(user);
        return "User registered successfully!";
    }

    public Map<String, String> loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get(); // ✅ Extract user
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole()); // ✅ Pass role in token

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());

            return response; // ✅ Return both token & role
        }

        throw new RuntimeException("Invalid credentials");
    }

}
