import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUploadingProfileImage: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      // normalize to always store the user object directly
      set({ authUser: res.data.user });
    } catch (error) {
      console.error("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.user });
      toast.success("Account created successfully ✅");
    } catch (error) {
      const msg = error?.response?.data?.message || "Signup failed. Try again.";
      toast.error(msg);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully ✅");
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed. Try again.";
      toast.error(msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully ✅");
    } catch (error) {
      const msg = error?.response?.data?.message || "Logout failed. Try again.";
      toast.error(msg);
    }
  },

  updateProfile: async (data) => {
    set({ isUploadingProfileImage: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully ✅");
      return res.data.user;
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Profile update failed. Try again.";
      toast.error(msg);
    } finally {
      set({ isUploadingProfileImage: false });
    }
  },
}));
