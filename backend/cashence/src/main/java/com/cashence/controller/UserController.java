package com.cashence.controller;

import com.cashence.model.User;
import com.cashence.repository.UserRepository;
import com.cashence.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil; // ✅ Inject JwtUtil as an instance

    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil; // ✅ Assign the injected instance
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractUsername(token.substring(7)); // ✅ Use instance method
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
}
