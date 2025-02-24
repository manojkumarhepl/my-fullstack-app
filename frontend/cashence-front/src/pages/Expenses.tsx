import { useState, useEffect } from "react";
import { addExpense, getUserExpenses } from "../services/expenseService";
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Expenses = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getUserExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleAddExpense = async () => {
    try {
      await addExpense({ title, amount: parseFloat(amount), category, date });
      fetchExpenses(); // Refresh list
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Expense Tracker
      </Typography>
      <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
      <TextField fullWidth label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} margin="normal" />
      <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} margin="normal" />
      <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleAddExpense}>
        Add Expense
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.title}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Expenses;
