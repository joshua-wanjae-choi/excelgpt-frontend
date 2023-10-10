import { StateCreator } from "zustand";

export const createGptSlice: StateCreator<IGptState, [], [], IGptState> = (
  set
) => ({
  isGptSubmitted: false,
  latestGptQuery: "",
  searchTextareaHeight: 0,
  latestGptQueryHeight: 0,
  defaultSearchTextareaHeight: 0,
  setIsGptSubmitted: (isGptSubmitted: boolean) =>
    set((state) => ({ ...state, isGptSubmitted: isGptSubmitted })),
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
});
