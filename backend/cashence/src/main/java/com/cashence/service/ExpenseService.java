package com.cashence.service;

import com.cashence.model.Expense;
import com.cashence.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getUserExpenses(String userEmail) {
        return expenseRepository.findByUserEmail(userEmail);
    }
}
