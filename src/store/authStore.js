import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  login: async (payload) => {
    // TODO: call API
    const fake = {
      id: "1",
      role: payload.role || "parent",
      username: payload.username,
    };
    localStorage.setItem("token", "fake");
    set({ user: fake });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
export default useAuthStore;
