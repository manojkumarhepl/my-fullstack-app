import { useState, useEffect } from "react";
import { Container, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import axios from "../services/api";
import ExpenseChart from "../components/ExpenseChart"; // ✅ Pie Chart
import Sidebar from "../components/Sidebar"; // ✅ Sidebar

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const totalRes = await axios.get("/expenses/user");
      const categoryRes = await axios.get("/expenses/category-summary");
      const monthlyRes = await axios.get("/expenses/monthly");

      // ✅ Calculate total expenses
      const total = totalRes.data.reduce((sum: number, expense: any) => sum + expense.amount, 0);
      setTotalExpenses(total);

      setCategoryData(categoryRes.data);

      setMonthlyData(
        monthlyRes.data.map((item: any) => ({
          month: item._id,
          total: item.total,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Total Expenses",
        data: monthlyData.map((item) => item.total),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* ✅ Sidebar added */}

      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {/* ✅ Total Expenses Card */}
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4">${totalExpenses}</Typography>
            </Paper>

            {/* ✅ Pie Chart (Category Breakdown) */}
            <ExpenseChart categoryData={categoryData} monthlyData={monthlyData} />

            {/* ✅ Line Chart (Monthly Expense Trends) */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Monthly Expense Overview</Typography>
              <Line data={chartData} />
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
