import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {type Ad} from "../serverCalls/ads.ts";

interface AdsState {
  ads: Ad[];
}

const initialState: AdsState = {
  ads: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    // Replace old ads with new ads
    replaceAds: (state, action: PayloadAction<Ad[]>) => {
      state.ads = action.payload;
    },
  },
});

export const { replaceAds } = adsSlice.actions;
export default adsSlice.reducer;
