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
export function rejectAd (id: string, reason: string, comment?: string): Promise<boolean> {
  return rejectById(id, reason, comment)
    .then(
      (ad) => {
        saveNewAd(ad);
        return true;
      }
    )
    .catch(() => {
      return false;
    })

}
export async function approveAd (id: string): Promise<boolean> {
  return approveById(id)
    .then(
      (ad) => {
        saveNewAd(ad);
        return true;
      }
    )
    .catch(() => {
      return false;
    })
}
export async function requestChangesAd (id: string, reason: string, comment?: string): Promise<boolean> {
  return requestChangesById(id, reason, comment)
    .then(
      (ad) => {
        saveNewAd(ad);
        return true;
      }
    )
    .catch(() => {
      return false;
    })
}
