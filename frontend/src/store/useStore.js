import { create } from "zustand"

export const useStore = create((set) => ({
  locale: "en",
  theme: "light",
  cartCount: 0,
  setLocale: (locale) => set({ locale }),
  setTheme: (theme) => set({ theme }),
}))
