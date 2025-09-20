import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: [],
  push: (m) => set((s) => ({ messages: [...s.messages, m] })),
  clear: () => set({ messages: [] }),
}));
export default useChatStore;
