import React from "react";
import AdComponent from "./ad.tsx";
import {useAds} from "../../store/storage.ts";

import ErrorComponent from "../errorComponent.tsx";


export default function AdsPlaceholder() {
  const [ads] = useAds();
  return (
    <div>
      {ads.length > 0 ? (
        ads.map(ad => ad ? <AdComponent key={ad.id} {...ad} /> : <></>)
      ) : <ErrorComponent />}
    </div>
  );
}
