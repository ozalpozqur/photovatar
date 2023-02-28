import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LocaleStore = {
  color?: string;
  borderColor: string;
  isBorder: boolean;
  loading: boolean;
  percent: number;
  thickness: number;
  pattern: string | null;
  round: string;
  setColor: (color?: string) => void;
  setBorderColor: (color: string) => void;
  setIsBorder: (isBorder: boolean) => void;
  setPercent: (percent: number) => void;
  setThickness: (thickness: number) => void;
  setPattern: (pattern: string | null) => void;
  setRound: (round: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
};

const useLocaleStore = create<LocaleStore>()(
  devtools(
    (set) => ({
      color: undefined,
      borderColor: "rgb(229,231,235)",
      loading: false,
      isBorder: false,
      percent: 100,
      thickness: 1,
      pattern: null,
      round: "2",
      setColor: (color) => set({ color }),
      setBorderColor: (color) => set({ borderColor: color }),
      setLoading: (loading) => set({ loading }),
      setIsBorder: (isBorder) => set({ isBorder }),
      setPercent: (percent) => set({ percent }),
      setThickness: (thickness) => set({ thickness }),
      setPattern: (pattern) => set({ pattern }),
      setRound: (round) => set({ round }),
      reset: () => {
        set({
          color: undefined,
          borderColor: "rgb(229,231,235)",
          loading: false,
          isBorder: false,
          percent: 100,
          thickness: 1,
          pattern: null,
          round: "2",
        });
      },
    }),
    {
      name: "local-storage",
    }
  )
);
export default useLocaleStore;
