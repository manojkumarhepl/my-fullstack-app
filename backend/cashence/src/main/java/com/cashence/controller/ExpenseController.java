package com.cashence.controller;

import com.cashence.model.Expense;
import com.cashence.repository.ExpenseRepository;
import com.cashence.security.JwtUtil;
import com.cashence.service.ExpenseService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ExpenseRepository expenseRepository;
    private final MongoTemplate mongoTemplate;
    private final JwtUtil jwtUtil;

    @Autowired
    public ExpenseController(ExpenseService expenseService,
                             ExpenseRepository expenseRepository,
                             MongoTemplate mongoTemplate,
                             JwtUtil jwtUtil) {
        this.expenseService = expenseService;
        this.expenseRepository = expenseRepository;
        this.mongoTemplate = mongoTemplate;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, @RequestHeader("Authorization") String token) {
        String userEmail = jwtUtil.extractUsername(token.substring(7));
        expense.setUserEmail(userEmail);
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Expense>> getUserExpenses(@RequestHeader("Authorization") String token) {
        String userEmail = jwtUtil.extractUsername(token.substring(7));
        return ResponseEntity.ok(expenseService.getUserExpenses(userEmail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable String id, @RequestBody Expense updatedExpense) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());

        // ✅ Ensure description exists in Expense model
        if (updatedExpense.getDescription() != null) {
            expense.setDescription(updatedExpense.getDescription());
        }

        // ✅ Ensure date exists in Expense model
        if (updatedExpense.getDate() != null) {
            expense.setDate(updatedExpense.getDate());
        }

        Expense savedExpense = expenseRepository.save(expense);
        return ResponseEntity.ok(savedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable String id) {
        if (!expenseRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Expense not found");
        }
        expenseRepository.deleteById(id);
        return ResponseEntity.ok("Expense deleted successfully");
    }

    // ✅ FIXED: Corrected monthly aggregation query
    @GetMapping("/monthly")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyExpenses() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.project("amount", "date")
                        .andExpression("concat(substr(date, 0, 4), '-', substr(date, 5, 2))").as("month"),
                Aggregation.group("month").sum("amount").as("total")
        );

        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "expense", Document.class);
        List<Map<String, Object>> expenses = result.getMappedResults().stream()
                .map(doc -> doc.entrySet().stream()
                        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)))
                .collect(Collectors.toList());

        return ResponseEntity.ok(expenses);
    }
}
