import { Pie, Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

interface ExpenseChartProps {
  categoryData: { category: string; total: number }[];
  monthlyData: { month: string; total: number }[];
}

const ExpenseChart = ({ categoryData, monthlyData }: ExpenseChartProps) => {
  const categoryChartData = {
    labels: categoryData.map((data) => data.category),
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryData.map((data) => data.total),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
      },
    ],
  };

  const monthlyChartData = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyData.map((data) => data.total),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" align="center">
        Expense Summary
      </Typography>
      <Pie data={categoryChartData} />
      <Bar data={monthlyChartData} />
    </Paper>
  );
};

export default ExpenseChart;
