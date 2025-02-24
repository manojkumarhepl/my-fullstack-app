import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "../services/api";
import EditExpense from "../components/EditExpense";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar Integration

// ✅ Define Expense Type
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
}

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/expenses/user"); // ✅ Fetch user-specific expenses
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditClick = (expense: Expense) => {
    setEditExpense(expense);
    setOpenEditModal(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* ✅ Add Sidebar */}

      <TableContainer component={Paper} sx={{ flexGrow: 1, margin: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(expense)}>Edit</Button>
                  <Button onClick={() => handleDelete(expense.id)} color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Expense Modal */}
      {editExpense && (
        <EditExpense
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          expense={editExpense}
          onSave={fetchExpenses}
        />
      )}
    </div>
  );
};

export default ExpenseList;
