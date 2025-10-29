import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMainStore } from "./main-store";

type TaskStore = {
  startTime: Date | null;
  start: () => void;

  totalSeconds: number | null;
  finish: () => void;

  pauseMillis: number;
  isPaused: boolean;

  pauseStart: Date | null;
  pause: () => void;
  resume: () => void;
};

const calcPauseTime = (pauseStart: Date) => {
  const pauseStartMillis = new Date(pauseStart).valueOf();
  const nowMillis = new Date().valueOf();
  return nowMillis - pauseStartMillis;
};

const TaskStoreConfig = (storeName: string) =>
  persist<TaskStore>(
    (set, get) => ({
      startTime: null,
      pauseMillis: 0,
      isPaused: false,
      pauseStart: null,
      totalSeconds: null,

      start: () => {
        if (get().startTime !== null) {
          throw new Error("Task has already been started");
        }
        set({ startTime: new Date() });
      },

      finish: () => {
        const startTime = get().startTime;
        const pauseStart = get().pauseStart;

        if (startTime === null) {
          throw new Error("Cannot finish a task that hasn't been started");
        }
        if (get().totalSeconds !== null) {
          throw new Error("Already finished");
        }

        let pauseMillis = isNaN(get().pauseMillis) ? 0 : get().pauseMillis || 0;

        if (get().isPaused && pauseStart !== null) {
          pauseMillis += calcPauseTime(pauseStart);
        }

        const nowMillis = new Date(Date.now()).valueOf();
        const startMillis = new Date(startTime).valueOf();

        set({
          totalSeconds: Math.floor(
            (new Date(nowMillis - startMillis).valueOf() - pauseMillis) / 1000
          ),
        });

        const mainStore = useMainStore.getState();
        const progress = mainStore.progress === "task1" ? "task2" : "uploading";
        mainStore.setProgress(progress);
      },

      pause: () => {
        if (get().isPaused || get().startTime === null) {
          throw new Error("Cannot pause when not started or already paused");
        }
        set({ isPaused: true, pauseStart: new Date() });
      },

      resume: () => {
        const pauseStart = get().pauseStart;

        if (
          !get().isPaused ||
          pauseStart === null ||
          get().startTime === null
        ) {
          throw new Error("Cannot resume when not started or already resumed");
        }

        const pauseMillis = isNaN(get().pauseMillis)
          ? 0
          : get().pauseMillis || 0;

        set({
          isPaused: false,
          pauseMillis: calcPauseTime(pauseStart) + pauseMillis,
          pauseStart: null,
        });
      },
      toString: () => {
        return JSON.stringify({
          startTime: get().startTime,
          totalSeconds: get().totalSeconds,
          isPaused: get().isPaused,
          pauseMillis: get().pauseMillis,
          pauseStart: get().pauseStart,
        });
      },
    }),
    {
      name: storeName,
    }
  );

// partialize: (state) =>
//       Object.fromEntries(
//         Object.entries(state).filter(([key]) => !['foo'].includes(key)),
//       ),

export const useTaskStore1 = create<TaskStore>()(
  TaskStoreConfig("task-store-1")
);
export const useTaskStore2 = create<TaskStore>()(
  TaskStoreConfig("task-store-2")
);
