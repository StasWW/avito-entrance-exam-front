import React from "react";
import ImageCarousel from "./imagesCarousel.tsx";
import ModerationHistory from "./moderationHistory.tsx";
import type { Ad } from "../../serverCalls/ads.ts";

interface Props {
  ad: Ad;
  styles: any;
}

export default function ItemHistory({ ad, styles }: Props) {
  return (
    <section style={styles.history.section}>
      <ImageCarousel images={ad.images} />
      <div style={{ width: "100%" }}>
        <h3 style={{ margin: 0 }}>История модерации</h3>
        <ModerationHistory history={ad.moderationHistory} />
      </div>
    </section>
  );
}
