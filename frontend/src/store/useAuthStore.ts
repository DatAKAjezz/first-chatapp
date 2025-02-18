import { toaster } from "@/components/ui/toaster";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === 'developement' ? "http://localhost:5001" : "/";

export const useAuthStore: any = create((set: any, get: any) => ({
  authUser: null,
  isSigningUp: false,
  isLogginging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checkAuth: ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toaster.success({ title: "Account create successfully" });
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toaster.success({ title: "Logged out successfully" });

      get().disconnectSocket();
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    }
  },

  login: async (data: any) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toaster.success({ title: "Logged in successfully!" });

      get().connectSocket();
    } catch (error: any) {
      toaster.error({ title: error.response.data.message });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data: any) => {
    set({ isUpdatingProfile: true });

    try {
      const updatePromise = axiosInstance.put("/auth/update-profile", data);

      toaster.promise(updatePromise, {
        success: {
          title: "Successfully uploaded!",
          description: "Looks great",
        },
        error: {
          title: "Upload failed",
          description: "Something wrong with the upload",
        },
        loading: { title: "Uploading...", description: "Please wait" },
      });

      const res = await updatePromise;
      set({ authUser: res.data });
    } catch (error: any) {
      console.log("Error in update profile: ", error);
      toaster.error({ title: error.response.data.message });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) {
      console.log("User not authenticated");
      return;
    }
    if (socket || get().socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
