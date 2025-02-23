package com.cashence.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public String getUserProfile(@AuthenticationPrincipal String email) {
        return "Welcome, " + email + "!";
    }
}
