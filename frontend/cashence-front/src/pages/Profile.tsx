import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { Typography, Box, Paper, TextField, Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string }>({ name: "", email: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ name: user.name });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!user.email) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">Profile</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <TextField fullWidth margin="normal" label="Email" value={user.email} disabled />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
