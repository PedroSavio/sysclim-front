import { create } from "zustand";

interface GlobalStore {
    error: string;
    setError: (e: string) => void;
    loading: boolean;
    setLoading: (s: boolean) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
    error: "",
    setError: (e: string) => set({ error: e }),
    loading: false,
    setLoading: (s: boolean) => set({ loading: s }),
  }));

export default useGlobalStore;