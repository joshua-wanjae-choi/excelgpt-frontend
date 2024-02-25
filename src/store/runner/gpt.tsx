import { StateCreator } from "zustand";

export const createGptSlice: StateCreator<IGptState, [], [], IGptState> = (
  set
) => ({
  onGptProgress: "end",
  latestGptQuery: "",
  searchTextareaHeight: 0,
  latestGptQueryHeight: 0,
  defaultSearchTextareaHeight: 0,
  gptAnswer: "",
  currentSheetName: "sheet1",
  setOnGptProgress: (onGptProgress: TOnGptProgress) =>
    set((state) => ({ ...state, onGptProgress: onGptProgress })),
  setLatestGptQuery: (latestGptQuery: string) =>
    set((state) => ({ ...state, latestGptQuery: latestGptQuery })),
  setSearchTextareaHeight: (searchTextareaHeight: number) =>
    set((state) => ({ ...state, searchTextareaHeight: searchTextareaHeight })),
  setLatestGptQueryHeight: (latestGptQueryHeight: number) =>
    set((state) => ({ ...state, latestGptQueryHeight: latestGptQueryHeight })),
  setDefaultSearchTextareaHeight: (defaultSearchTextareaHeight: number) =>
    set((state) => ({
      ...state,
      defaultSearchTextareaHeight: defaultSearchTextareaHeight,
    })),
  setGptAnswer: (gptAnswer: string) =>
    set((state) => ({
      ...state,
      gptAnswer: gptAnswer,
    })),
  setCurrentSheetName: (currentSheetName: string) =>
    set((state) => ({
      ...state,
      currentSheetName: currentSheetName,
    })),
});
