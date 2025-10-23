import { Progress as Step } from "@/components/app-sidebar";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MainStore = {
  progress: Step;
  setProgress: (progress: Step) => void;
  activeStep: Step;
  setActiveStep: (step: Step) => void;
  setGroup: (group: "A" | "B") => void;
  setUUID: (uuid: string) => void;
  uuid: string | null;
  group: "A" | "B" | null;
  isReady: boolean;
  ready: () => void;
};

export const useMainStore = create<MainStore>()(
  persist(
    (set) => ({
      progress: "intro",
      activeStep: "intro",
      setProgress: (progress) => set({ progress }),
      setActiveStep: (step) => set({ activeStep: step }),
      setGroup: (group) => set({ group }),
      group: null,
      uuid: null,
      setUUID: (uuid) => set({ uuid }),
      isReady: false,
      ready: () => set({ isReady: true }),
    }),
    { name: "main-store" }
  )
);
