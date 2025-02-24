import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "../services/api";

// ✅ Define the Expense type
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
}

// ✅ Define props for EditExpense component
interface EditExpenseProps {
  open: boolean;
  onClose: () => void;
  expense: Expense;
  onSave: () => void;
}

const EditExpense: React.FC<EditExpenseProps> = ({ open, onClose, expense, onSave }) => {
  const [formData, setFormData] = useState<Expense>({ ...expense });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/expenses/${formData.id}`, formData);
      onSave(); // Refresh expense list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpense;
