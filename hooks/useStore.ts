import { create } from 'zustand'
 
interface Mode {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const useStore = create<Mode>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state: any) => ({ darkMode: !state.darkMode })),
}))

export default useStore; 