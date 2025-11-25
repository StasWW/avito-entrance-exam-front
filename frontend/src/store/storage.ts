import { configureStore } from '@reduxjs/toolkit';
import isDarkmodeSlice, { toggleDarkMode } from "./isDarkmodeSlice.ts";
import paginationSlice, {
  setPagination,
  setCurrentPage,
  setTotalPages,
  setTotalItems,
  setItemsPerPage,
  resetPagination, type PaginationState
} from "./paginationSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import adsSlice, { replaceAds, replaceIds } from "./adsSlice.ts";
import type { Ad } from "../serverCalls/ads.ts";

export const store = configureStore({
  reducer: {
    darkmode: isDarkmodeSlice,
    pagination: paginationSlice,
    ads: adsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// STORAGE ACTIONS ABSTRACTIONS

export const useDarkmode = (): [boolean, () => void] => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.darkmode.isDarkMode);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return [isDarkMode, toggle];
};

export const usePagination = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.pagination);

  return {
    pagination,
    setPagination: (payload: PaginationState) => dispatch(setPagination(payload)),
    setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    setTotalPages: (pages: number) => dispatch(setTotalPages(pages)),
    setTotalItems: (items: number) => dispatch(setTotalItems(items)),
    setItemsPerPage: (count: number) => dispatch(setItemsPerPage(count)),
    resetPagination: () => dispatch(resetPagination()),
  };
};

export const useAds = (): [Ad[], (ads: Ad[]) => void] => {
  const dispatch = useDispatch();
  const ads = useSelector((state: RootState) => state.ads.ads);

  const replace = (newAds: Ad[]) => {
    dispatch(replaceAds(newAds));
    const ids = newAds.map(ad => ad.id);
    dispatch(replaceIds(ids));
    localStorage.setItem("adIds", JSON.stringify(ids));
  };

  return [ads, replace];
};

export const useAdIds = (): number[] => {
  let ids = useSelector((state: RootState) => state.ads.ids);

  //retrieve from localStorage if redux is empty
  if (!ids || ids.length === 0) {
    const stored = localStorage.getItem("adIds");
    if (stored) {
      try {
        ids = JSON.parse(stored);
      } catch {}
    }
  }

  return ids;
};
