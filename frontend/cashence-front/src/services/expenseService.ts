import api from "./api";

export const addExpense = async (expense: { title: string; amount: number; category: string; date: string }) => {
  return api.post("/expenses/add", expense);
};

export const getUserExpenses = async () => {
  return api.get("/expenses/user");
};
