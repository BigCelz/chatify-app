import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  activeTab: "chats", // 'chats' or 'contacts'
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === "true",
  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("messages/chats");
      set({ chats: res.data });
    } catch (error) {
      console.error("Error fetching chat partners:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  }
}));
