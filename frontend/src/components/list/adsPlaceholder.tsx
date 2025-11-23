import React, {useMemo} from "react";
import AdComponent from "./ad.tsx";
import {useAds, useDarkmode} from "../../store/storage.ts";
import getAdsPlaceholderStyles from "./styles/adsPlaceholder.ts";
import OopsieCat from "../../../public/oopsieCat.jpg";


export default function AdsPlaceholder() {
  const [ads] = useAds();
  const [isDarkmode] =  useDarkmode();
  const styles = useMemo(() => getAdsPlaceholderStyles(isDarkmode), [isDarkmode]);

  return (
    <div>
      {ads.length > 0 ? (
        ads.map(ad => <AdComponent key={ad.id} {...ad} />)
      ) : (
        <div>
          <p style={styles.errorTitle}>Упси!</p>
          <p style={styles.errorSubTitle}>По вашему запросу ничего не нашли</p>
          <img src={OopsieCat} alt='Oopsie cat' style={styles.errorImg}/>
        </div>
      )}
    </div>
  );
}
