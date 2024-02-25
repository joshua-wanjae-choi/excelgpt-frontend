import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createGptSlice } from "./runner/gpt";

export const useBoundStore = create<IGptState>()(
  devtools((...args) => ({
    ...createGptSlice(...args),
  }))
);
