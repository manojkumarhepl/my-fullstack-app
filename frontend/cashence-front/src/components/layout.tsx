import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
