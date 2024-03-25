import { create } from "zustand";
import { jobs } from "../compoanents/constants/constants";

export const useFilterData = create((set, get) => ({
  initialFilters: {
    industries: [],
    locations: "",
  },
  filters: {
    industries: [],
    locations: [],
  },
  setFilters: (appliedFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...appliedFilters },
    }));
  },
  clearFilters: () => {
    set({
      filters: {
        industries: [],
        locations: "",
      },
    });
  },
}));

export const usejobData = create((set, get) => ({
  jobs: jobs,
  filteredJobs: jobs,
}));
