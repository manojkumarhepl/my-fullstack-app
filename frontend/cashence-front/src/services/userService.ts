import axios from "./api";

export const getUserProfile = () => axios.get("/user/profile");

export const updateUserProfile = (data: { name: string }) => axios.put("/user/profile", data);
