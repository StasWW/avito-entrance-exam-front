import {type Ad, approveById, rejectById, requestChangesById} from "../../serverCalls/ads.ts";
import {store} from "../../store/storage.ts";
import {replaceAds} from "../../store/adsSlice.ts";

const saveNewAd = (ad: Ad)=> {
  const currentAds = store.getState().ads.ads;
  store.dispatch(replaceAds([
    ...currentAds.filter((a) => a.id !== ad.id),
    ad
  ]));
}
export async function approveAd(id: string): Promise<boolean> {
  try {
    const ad = await approveById(id);
    saveNewAd(ad.ad);
    return true;
  } catch (e: any) {
    throw e;
  }
}

export async function rejectAd(id: string, reason: string, comment?: string): Promise<boolean> {
  try {
    const ad = await rejectById(id, reason, comment);
    saveNewAd(ad.ad);
    return true;
  } catch (e: any) {
    throw e;
  }
}

export async function requestChangesAd(id: string, reason: string, comment?: string): Promise<boolean> {
  try {
    const ad = await requestChangesById(id, reason, comment);
    saveNewAd(ad.ad);
    return true;
  } catch (e: any) {
    throw e;
  }
}
