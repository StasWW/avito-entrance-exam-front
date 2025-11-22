import { configureStore } from '@reduxjs/toolkit';
import isDarkmodeSlice from "./isDarkmodeSlice.ts";
import {useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    darkmode: isDarkmodeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDarkmode = () =>
  useSelector((state: RootState) => state.darkmode.isDarkMode);