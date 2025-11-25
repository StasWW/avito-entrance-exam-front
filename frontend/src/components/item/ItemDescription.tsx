import React from "react";
import Table from "./table.tsx";
import { timeToText } from "../../pages/actions/adStringsFormatters.ts";
import type { Ad } from "../../serverCalls/ads.ts";

interface Props {
  ad: Ad;
  styles: any;
}

export default function ItemDescription({ ad, styles }: Props) {
  return (
    <section style={styles.description}>
      <h3>Полное описание</h3>
      <Table table={ad.characteristics} />
      <div style={styles.seller.info}>
        <p>{ad.description}</p>
        <h3>О продавце</h3>
        <p>
          Продавец: {ad.seller.name} | {ad.seller.rating}{" "}
          <span style={{ color: "yellow" }}>&#9733;</span>
        </p>
        <p>
          {ad.seller.totalAds} объявлений | На сайте: {timeToText(ad.seller.registeredAt)}
        </p>
      </div>
    </section>
  );
}
