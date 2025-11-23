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
import adsSlice, {replaceAds} from "./adsSlice.ts";
import type {Ad} from "../serverCalls/ads.ts";

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

/**
 * Returns isDarkmode and toggle func
 */
export const useDarkmode = (): [boolean, () => void] => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.darkmode.isDarkMode);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return [isDarkMode, toggle];
};

/**
 * Returns pagination state and action dispatchers
 */
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
/**
 * Returns ads state and replaceAds dispatcher
 */
export const useAds = (): [Ad[], (ads: Ad[]) => void] => {
  const dispatch = useDispatch();
  const ads = useSelector((state: RootState) => state.ads.ads);

  const replace = (newAds: Ad[]) => {
    dispatch(replaceAds(newAds));
  };

  return [ads, replace];
};