import { create } from "zustand";

const CAP_BASE = 20;
const CAP_STEP = 5;
const RECOVER_MIN = 20;

const useEnergyStore = create((set, get) => ({
  level: 1,
  energy: CAP_BASE,
  lastSpendAt: null,
  recoverTick: () => {
    const { level, energy, lastSpendAt } = get();
    const cap = CAP_BASE + (level - 1) * CAP_STEP;
    if (!lastSpendAt) return;
    const mins = Math.floor((Date.now() - lastSpendAt) / 60000);
    const recovered = Math.floor(mins / RECOVER_MIN);
    if (recovered > 0) set({ energy: Math.min(cap, energy + recovered) });
  },
  spend: (n = 1) =>
    set((s) => ({
      energy: Math.max(0, s.energy - n),
      lastSpendAt: Date.now(),
    })),
  setLevel: (lvl) =>
    set((s) => ({
      level: lvl,
      energy: Math.min(s.energy, CAP_BASE + (lvl - 1) * CAP_STEP),
    })),
}));
export default useEnergyStore;
