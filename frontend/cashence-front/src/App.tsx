import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ExpenseList from "./components/ExpenseList";
import Layout from "./components/layout";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}></Route>
        {/* ✅ USER Dashboard & Expense List (Protected) */}
        <Route path="/user/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="USER" />} />
        <Route path="/user/expenses" element={<ProtectedRoute element={<ExpenseList />} requiredRole="USER" />} />
        <Route path="/user/profile" element={<ProtectedRoute element={<Profile />} requiredRole="USER" />} />

        {/* ✅ ADMIN Dashboard (Protected) */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="ADMIN" />} />
      </Routes>
    </Router>
  );
};

export default App;
