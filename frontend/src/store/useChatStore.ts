import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "./useAuthStore";

export const useChatStore: any = create((set: any, get: any) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId: any) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData: any) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    }
  },

  subcribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore?.getState()?.socket;
    if (!socket) return;
    socket.on("newMessage", (newMessage: any) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubcribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser: any) => {
    set({ selectedUser });
  },
}));
