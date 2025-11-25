import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Ad } from "../serverCalls/ads.ts";

interface AdsState {
  ads: Ad[];
  ids: number[];
}

const initialState: AdsState = {
  ads: [],
  ids: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    replaceAds: (state, action: PayloadAction<Ad[]>) => {
      state.ads = action.payload;
      state.ids = action.payload.map(ad => ad.id);
      localStorage.setItem("ads", JSON.stringify(state.ads));
      localStorage.setItem("adIds", JSON.stringify(state.ids));
    },
    replaceIds: (state, action: PayloadAction<number[]>) => {
      state.ids = action.payload;
      localStorage.setItem("adIds", JSON.stringify(state.ids));
    },
    hydrateAds: (state) => {
      //retrieve from localStorage if redux is empty
      if (state.ads.length === 0) {
        const storedAds = localStorage.getItem("ads");
        if (storedAds) {
          try {
            state.ads = JSON.parse(storedAds);
            state.ids = state.ads.map(ad => ad.id);
          } catch {}
        }
      }
      if (state.ids.length === 0) {
        const storedIds = localStorage.getItem("adIds");
        if (storedIds) {
          try {
            state.ids = JSON.parse(storedIds);
          } catch {}
        }
      }
    },
  },
});

export const { replaceAds, replaceIds, hydrateAds } = adsSlice.actions;
export default adsSlice.reducer;
