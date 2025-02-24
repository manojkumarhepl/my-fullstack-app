import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";

const Sidebar: React.FC = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/expenses">
            <ListItemText primary="Expenses" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
    <ListItemButton component={Link} to="/user/profile">
      <ListItemText primary="Profile" />
    </ListItemButton>
  </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
