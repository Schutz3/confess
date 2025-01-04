import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("cfs-theme") || "synthwave",
  setTheme: (theme) => {
    localStorage.setItem("cfs-theme", theme);
    set({ theme });
  },
}));
