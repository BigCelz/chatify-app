import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],

  activeTab: "chats",
  selectedUser: null,

  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("messages/contacts");
      set({ allContacts: res.data.users });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("messages/chats");
      set({ chats: res.data.chatPartners });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isChatsLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    if (!userId) return;

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));

